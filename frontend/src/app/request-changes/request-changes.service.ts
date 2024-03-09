import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestChangesComponent } from './request-changes.component';
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';

@Injectable({
  providedIn: 'root',
})
export class RequestChangesService {
  constructor(private dialog: MatDialog) {}
  public form;
  public container?: DocumentEditorContainerComponent;

  openPopup(container: DocumentEditorContainerComponent) {
    this.container = container;
    this.dialog.open(RequestChangesComponent, {width:'670px', panelClass:'dialog-container'});
    this.form = document.getElementById("changesRequestForm");
  
    this.form.addEventListener("submit", (event) => {
      this.sendRequest(event, this.container);
    });
  }

  sendRequest(e, container) {
    e.preventDefault();
    // CHECK HOW TO GIVE EDIT ACCESS AGAIN BEFORE SAVING AND REOPENINING!!!!!
    this.container.documentEditor.editor.enforceProtection('123', 'NoProtection');
    (container as DocumentEditorContainerComponent ).documentEditor.save('Commented report', 'Sfdt')
    const apprenticeEmail = (<HTMLInputElement>document.getElementById('email')).value
    var mail = "mailto:" + apprenticeEmail + "?subject=[ACTION REQUIRED] Changes Requested for your Report&body=Hello%2C%0D%0AAn approver has requested changes to your report.%0D%0A%0D%0APlease open the attached file within the Compliance Approval Portal.  Changes requested will be shown in the comments.  Once you have made the changes please re-request all three approvals.%0D%0A%0D%0AFor any questions please contact complianceapprovalportal%40gmail.com%0D%0A%0D%0A";
    var sendEmail = document.createElement('a');
    sendEmail.href = mail;
    sendEmail.click();
  }
}