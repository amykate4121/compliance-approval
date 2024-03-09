import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterFormatProperties, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { ApproveService } from '../approve/approve.service';
import { RequestChangesService } from '../request-changes/request-changes.service';

@Component({
  selector: 'app-approval-page',
  templateUrl: './approval-page.component.html',
  styleUrls: ['./approval-page.component.scss']
})
export class ApprovalPageComponent {
  constructor(private approveService: ApproveService, private requestChangesService: RequestChangesService) { }
  @ViewChild('documenteditor_default')
  public container: DocumentEditorContainerComponent;
  public items = ['Open', 'Comments', 'Find'];

  public commentsOnly(): void {
    //enforce protection
    this.container.documentEditor.editor.enforceProtection('123', 'CommentsOnly');
  }
  ngOnInit(): void {
  }


  approve(){
    this.approveService.openPopup();
  }

  // this method will be completed when integrated with approvers
  requestChanges(){
    this.requestChangesService.openPopup(this.container);
  }
}




