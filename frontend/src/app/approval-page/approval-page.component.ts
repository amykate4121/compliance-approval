import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  CharacterFormatProperties,
  DocumentEditorContainerComponent,
} from '@syncfusion/ej2-angular-documenteditor';
import { ApproveService } from '../approve/approve.service';
import { RequestChangesService } from '../request-changes/request-changes.service';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'app-approval-page',
  templateUrl: './approval-page.component.html',
  styleUrls: ['./approval-page.component.scss'],
})
// approver page
export class ApprovalPageComponent {
  authenticated = false;
  constructor(
    private router: Router,
    private approveService: ApproveService,
    private requestChangesService: RequestChangesService
  ) {}
  signIn = Auth0.signIn;
  getProfile = Auth0.getProfile;
  @ViewChild('documenteditor_default')
  public container: DocumentEditorContainerComponent;
  // restrict the options that the user has, as they should only be able to comment rather than alter an apprentices report
  public items = ['Open', 'Comments', 'Find'];

  // redirect if not authenticated, or not an approver
  ngOnInit(): void {
    Auth0.subscribe((authenticated) => (this.authenticated = authenticated));
    if (this.authenticated == false) {
      this.signIn();
    }

    if (this.getProfile().name.includes('@qmul.ac.uk')) {
      this.router.navigate(['/unauthorised-access']);
    }
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
