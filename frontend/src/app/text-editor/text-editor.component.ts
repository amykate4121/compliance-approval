import * as Auth0 from 'auth0-web';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentEditorContainerComponent, Toolbar, ToolbarService } from '@syncfusion/ej2-angular-documenteditor';
import { RequestApprovalService } from '../request-approval/request-approval.service';

import { RequestDownloadService } from '../request-download/request-download.service';
import { TextEditorApi } from './text-editor.api';
import { AiReportComponent } from '../ai-report/ai-report.component';

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [ToolbarService],
})
// the apprentice text editor component
export class TextEditorComponent implements OnInit {
  authenticated = false;
  constructor(
    private requestApprovalService: RequestApprovalService,
    private requestDownloadService: RequestDownloadService,
    private textEditorApi: TextEditorApi,
    private router: Router
  ) {}
  signIn = Auth0.signIn;
  getProfile = Auth0.getProfile;

  @ViewChild('documenteditor_default')
  public container?: DocumentEditorContainerComponent;
  @ViewChild('drawer')
  public drawer?;
  public isLoading = false;
  @ViewChild(AiReportComponent) aiReportComponent: AiReportComponent;

  // load default document on creation
  // contains compliance information that MUST be included 
  onCreate(): any {
    let sfdt: string = `{"sections":[{"sectionFormat":{},"blocks":[{"paragraphFormat":{},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"These materials are confidential and may not be used, edited, altered, reproduced, published or distributed without consent."}]}]}]}`;
    (this.container as DocumentEditorContainerComponent).documentEditor.open(
      sfdt
    );
  }

  // don't show any surplus information
  onOpen(): any {
    (this.container as DocumentEditorContainerComponent).documentEditor.showRestrictEditingPane(false);
  }

  // redirect if not authenticated, or if they should not be able to access
  ngOnInit(): void {
    Auth0.subscribe((authenticated) => (this.authenticated = authenticated));
    if (this.authenticated == false) {
      this.signIn();
    }
    if (!this.getProfile().name.includes('@qmul.ac.uk')) {
      this.router.navigate(['/unauthorised-access']);
      return;
    }
  }
  //  generate the AI report
  async generateReport() {
    // get full report content
    this.container.documentEditor.selection.selectAll();
    let content = this.container.documentEditor.selection.text;
    let reportContent = {
      fullBody: content,
    };

    // save the report body, showing loading whilst it saves
    try {
      document.getElementById('overlay').style.display = 'block';
      this.isLoading = true;
      await this.textEditorApi.saveBodyForAiReport(reportContent).toPromise();
    } catch (error) {
      alert(error.message);
    } finally {
      document.getElementById('overlay').style.display = 'none';
      this.isLoading = false;
    }

    // open drawer containing results of ai report
    this.drawer.toggle();
    this.aiReportComponent.countNumSentences(content);
    this.aiReportComponent.ngOnInit();
  }

  // close the ai report
  close() {
    this.drawer.toggle();
    this.aiReportComponent.ngOnDestroy();
  }

  // pop up to email approvers
  requestApproval() {
    this.requestApprovalService.openPopup(this.container);
  }

  // open pop up to download a pdf
  requestPDFDownload() {
    this.requestDownloadService.openPopup(this);
  }
}
