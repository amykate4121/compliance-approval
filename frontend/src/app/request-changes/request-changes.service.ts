import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestChangesComponent } from './request-changes.component';
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';

@Injectable({
  providedIn: 'root',
})
// allow approver to download the report including comments and send to apprentices to request changes
export class RequestChangesService {
  constructor(private dialog: MatDialog) {}
  public form;
  public container?: DocumentEditorContainerComponent;

  // open the pop up
  openPopup(container: DocumentEditorContainerComponent) {
    this.container = container;
    this.dialog.open(RequestChangesComponent, {
      width: '670px',
      panelClass: 'dialog-container',
    });
    this.form = document.getElementById('changesRequestForm');

    this.form.addEventListener('submit', (event) => {
      this.sendRequest(event, this.container);
    });
  }

  // download and open email pop up
  sendRequest(event, container) {
    event.preventDefault();
    
    // disable the comment only protection
    // this means the apprentice will be able to edit the report they receive
    this.container.documentEditor.editor.enforceProtection(
      'credential',
      'NoProtection'
    );
    (container as DocumentEditorContainerComponent).documentEditor.save(
      'Commented Report For Changes',
      'Sfdt'
    );

    // open the local mail app, default filling the body adn subject
    // uses email inputted in the form
    const apprenticeEmail = (<HTMLInputElement>document.getElementById('email')).value;
    var mail =
      'mailto:' +
      apprenticeEmail +
      '?subject=[ACTION REQUIRED] Changes Requested for your Report&body=Hello%2C%0D%0AAn approver has requested changes to your report.%0D%0A%0D%0APlease open the attached file within the Compliance Approval Portal.  Changes requested will be shown in the comments.  Once you have made the changes please re-request all three approvals.%0D%0A%0D%0AFor any questions please contact complianceapprovalportal%40gmail.com%0D%0A%0D%0A';
    var sendEmail = document.createElement('a');
    sendEmail.href = mail;
    sendEmail.click();
    this.dialog.closeAll();
  }
}
