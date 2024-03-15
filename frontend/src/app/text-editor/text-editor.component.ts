import * as Auth0 from 'auth0-web';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentEditorContainerComponent, Toolbar, ToolbarService } from '@syncfusion/ej2-angular-documenteditor';
import {
  DocumentEditorComponent
} from '@syncfusion/ej2-angular-documenteditor';
import { RequestApprovalService } from '../request-approval/request-approval.service';
import {
  PdfBitmap,
  PdfDocument,
  PdfPageOrientation,
  PdfPageSettings,
  PdfSection,
  SizeF,
} from '@syncfusion/ej2-pdf-export';

import { ImageFormat } from '@syncfusion/ej2-angular-documenteditor';
import { RequestDownloadService } from '../request-download/request-download.service';
import { TextEditorApi } from './text-editor.api';

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [ToolbarService]
})
export class TextEditorComponent implements OnInit{
  authenticated = false;
  constructor(private requestApprovalService: RequestApprovalService, private requestDownloadService: RequestDownloadService, private textEditorApi: TextEditorApi, private router: Router ){}
  signIn = Auth0.signIn;
  signOut = Auth0.signOut;
  getProfile = Auth0.getProfile;
  @ViewChild('documenteditor_default')
    public container?: DocumentEditorContainerComponent;
    // load your default document here
    
    onCreate(): any {
          let sfdt: string = `{"sections":[{"sectionFormat":{},"blocks":[{"paragraphFormat":{},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"CONFIDENTIAL - These materials are confidential and may not be used, edited, altered, reproduced, published or distributed without the consent of both the author and Company x.  All rights are reserved to their full extent."}]}]}]}`;
          // open the default document.
          (this.container as DocumentEditorContainerComponent ).documentEditor.open(sfdt);
    }

  // fix this to ensure user can't open if they arent logged in
  ngOnInit(): void {
    const self = this;
    Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
  }
// AMY EDIT HERE
  generateReport() { 
    this.container.documentEditor.selection.selectAll(); 
    let content = this.container.documentEditor.selection.text;
    let reportContent = {
      title: content,
      description: 'test',
    }
    this.textEditorApi
      .saveExam(reportContent)
      .subscribe(
        () => this.router.navigate(['/exam']),
        error => alert(error.message)
    );
  }

  // this method will be completed when integrated with approvers
  requestApproval(){
    this.requestApprovalService.openPopup(this.container);
  }

  requestPDFDownload(){
    this.requestDownloadService.openPopup(this);
  }
}
