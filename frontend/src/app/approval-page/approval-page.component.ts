import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { ApproveService } from '../approve/approve.service';
import { RequestChangesService } from '../request-changes/request-changes.service';
import * as Auth0 from 'auth0-web';
import { AiReportComponent } from '../ai-report/ai-report.component';
import { ApprovalPageApi } from './approval-page.api';

@Component({
  selector: 'app-approval-page',
  templateUrl: './approval-page.component.html',
  styleUrls: ['./approval-page.component.scss'],
})
// approver page
export class ApprovalPageComponent {
  authenticated = false;
  constructor(
    public router: Router,
    public approveService: ApproveService,
    public requestChangesService: RequestChangesService,
    public approvalPageApi: ApprovalPageApi
  ) {}
  signIn = Auth0.signIn;
  getProfile = Auth0.getProfile;
  @ViewChild('documenteditor_default')
  
  public container: DocumentEditorContainerComponent;
  // restrict the options that the user has, as they should only be able to comment rather than alter an apprentices report
  public items = ['Open', 'Comments', 'Find'];
  @ViewChild('drawer')
  public drawer?;
  public isLoading = false;
  @ViewChild(AiReportComponent) aiReportComponent: AiReportComponent;


  // redirect if not authenticated, or not an approver
  ngOnInit(): void {
    this.isLoading = false;
    Auth0.subscribe((authenticated) => (this.authenticated = authenticated));
    if (this.authenticated == false) {
      this.signIn();
    }

    if (this.getProfile().name.includes('@qmul.ac.uk')) {
      this.router.navigate(['/unauthorised-access']);
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
      await this.approvalPageApi.saveBodyForAiReport(reportContent).toPromise();
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


  // open pop up to send approval email
  approve() {
    this.approveService.openPopup();
  }

  // open pop up to request changes to the report
  requestChanges() {
    this.requestChangesService.openPopup(this.container);
  }

  // add restriction so approver can only comment
  public commentsOnly(): void {
    this.container.documentEditor.editor.enforceProtection(
      'credential',
      'CommentsOnly'
    );
  }
}
