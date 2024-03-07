import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterFormatProperties, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';

@Component({
  selector: 'app-approval-page',
  templateUrl: './approval-page.component.html',
  styleUrls: ['./approval-page.component.scss']
})
export class ApprovalPageComponent {
  constructor(private router: Router) { }
  @ViewChild('document_editor')
  public container: DocumentEditorContainerComponent;
  public items = ['Open', 'Comments', 'Find'];

  public commentsOnly(): void {
    //enforce protection
    this.container.documentEditor.editor.enforceProtection('123', 'CommentsOnly');
  }
  ngOnInit(): void {
  }


  // this method will be completed after the AI model is incorperated
  approve(){
    let temp = 123;
  }

  // this method will be completed when integrated with approvers
  requestChanges(){
    let temp = 123;
  }
}




