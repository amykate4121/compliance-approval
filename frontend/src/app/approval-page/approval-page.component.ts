import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterFormatProperties, DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import { ApproveService } from '../approve/approve.service';
import { RequestChangesService } from '../request-changes/request-changes.service';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'app-approval-page',
  templateUrl: './approval-page.component.html',
  styleUrls: ['./approval-page.component.scss']
})
export class ApprovalPageComponent {
  authenticated = false;
  constructor(private router: Router, private approveService: ApproveService, private requestChangesService: RequestChangesService) { }
  signIn = Auth0.signIn;
  signOut = Auth0.signOut;
  getProfile = Auth0.getProfile;
  @ViewChild('documenteditor_default')
  public container: DocumentEditorContainerComponent;
  public items = ['Open', 'Comments', 'Find'];

  public commentsOnly(): void {
    //enforce protection
    this.container.documentEditor.editor.enforceProtection('123', 'CommentsOnly');
  }
  ngOnInit(): void {
    Auth0.subscribe((authenticated) => (this.authenticated = authenticated));
    if (this.authenticated == false){
      this.signIn();
    }

    if ((this.getProfile().name).includes('@qmul.ac.uk')){
      this.router.navigate(['/unauthorised-access']);
    }
  }


  approve(){
    this.approveService.openPopup();
  }

  // this method will be completed when integrated with approvers
  requestChanges(){
    this.requestChangesService.openPopup(this.container);
  }
}




