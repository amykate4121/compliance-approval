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
import { ExamsComponent } from '../exams/exams.component';

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

  @ViewChild('drawer')
    public drawer?;
    public isLoading = false;
  @ViewChild(ExamsComponent) examsComponent: ExamsComponent;
    
    // load your default document here
    
    onCreate(): any {
          let sfdt: string = `{"sections":[{"sectionFormat":{},"blocks":[{"paragraphFormat":{},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"These materials are confidential and may not be used, edited, altered, reproduced, published or distributed without consent."}]}]}]}`;
          // open the default document.
          (this.container as DocumentEditorContainerComponent ).documentEditor.open(sfdt);
    }

  // fix this to ensure user can't open if they arent logged in
  ngOnInit(): void {
    Auth0.subscribe((authenticated) => (this.authenticated = authenticated));
    if (this.authenticated == false){
      this.signIn();
    }
    if (!(this.getProfile().name).includes('@qmul.ac.uk')){
      this.router.navigate(['/unauthorised-access']);
    }
  }
// AMY EDIT HERE
// CALL GET AFTER POSTING TO ACTUALLY MAKE SURE IT UPDATES
  async generateReport() { 
        this.container.documentEditor.selection.selectAll(); 
    let content = this.container.documentEditor.selection.text;
    let reportContent = {
      title: content,
      description: 'test',
    }


    try {
      document.getElementById("overlay").style.display = "block";
      this.isLoading = true; // Set isLoading to true to display loading icon
      await this.textEditorApi.saveExam(reportContent).toPromise(); // Assuming saveExam returns an Observable
    } catch (error) {
      alert(error.message);
    } finally {
      document.getElementById("overlay").style.display = "none";
      this.isLoading = false; // Reset isLoading to false once operation is complete (whether success or error)
    }

    this.drawer.toggle();
    this.examsComponent.ngOnInit();
  }

  close(){
    this.drawer.toggle();
  }

  // this method will be completed when integrated with approvers
  requestApproval(){
    this.requestApprovalService.openPopup(this.container);
  }

  requestPDFDownload(){
    this.requestDownloadService.openPopup(this);
  }

  turnOn() {
    document.getElementById("overlay").style.display = "block";
  }
  
  off() {
    document.getElementById("overlay").style.display = "none";
  }
}
