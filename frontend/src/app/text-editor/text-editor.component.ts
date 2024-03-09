import * as Auth0 from 'auth0-web';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentEditorContainerComponent, Toolbar, ToolbarService } from '@syncfusion/ej2-angular-documenteditor';
import {
  DocumentEditorComponent
} from '@syncfusion/ej2-angular-documenteditor';
import { RequestApprovalService } from '../request-approval/request-approval.service';

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [ToolbarService]
})
export class TextEditorComponent implements OnInit{
  constructor(private requestApprovalService: RequestApprovalService){}
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
  }


  // this method will be completed after the AI model is incorperated
  generateReport(){
    let downloadLink: HTMLAnchorElement = document.createElementNS('http://www.w3.org/1999/xhtml', 'a') as HTMLAnchorElement;
    let http: XMLHttpRequest = new XMLHttpRequest();
        http.open('POST', 'http://localhost:5000/api/documenteditor/ExportSFDT');
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        http.responseType = 'json';
        //Serialize the document content as sfdt.
        let sfdt: any = { content: this.container.documentEditor.serialize() };
        http.send(JSON.stringify(sfdt));
  }

  // this method will be completed when integrated with approvers
  requestApproval(){
    (this.container as DocumentEditorContainerComponent ).documentEditor.save('downloaded report', 'Sfdt');
    this.requestApprovalService.openPopup();
  }
}



