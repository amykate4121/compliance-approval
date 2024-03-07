import * as Auth0 from 'auth0-web';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentEditorContainerComponent, Toolbar, ToolbarService } from '@syncfusion/ej2-angular-documenteditor';
import {
  DocumentEditorComponent
} from '@syncfusion/ej2-angular-documenteditor';

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [ToolbarService]
})
export class TextEditorComponent implements OnInit{
  @ViewChild('document_editor')
  public documentEditor?: DocumentEditorComponent;
  constructor(private router: Router) { }

  // fix this to ensure user can't open if they arent logged in
  ngOnInit(): void {
  }


  // this method will be completed after the AI model is incorperated
  generateReport(){
    let temp = 123;
  }

  // this method will be completed when integrated with approvers
  requestApproval(){
    let temp = 123;
  }
}



