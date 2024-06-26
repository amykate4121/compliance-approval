import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestApprovalComponent } from './request-approval.component';
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';

@Injectable({
  providedIn: 'root',
})
// form for apprentice to add approver emails, and download report to request approval
export class RequestApprovalService {
  constructor(private dialog: MatDialog) {}
  public form;
  public container?: DocumentEditorContainerComponent;

  // open the pop up
  openPopup(container: DocumentEditorContainerComponent) {
    this.container = container;
    this.dialog.open(RequestApprovalComponent, {
      width: '670px',
      panelClass: 'dialog-container',
    });
    this.form = document.getElementById('approvalRequestForm');

    if (this.form) {
      this.form.addEventListener('submit', (event) => {
        this.sendEmail(event, this.container);
      });
    }
  }

  // download report and open local mail app
  sendEmail(event, container) {
    event.preventDefault();
    // download report
    (container as DocumentEditorContainerComponent).documentEditor.save(
      'Downloaded Report For Approval',
      'Sfdt'
    );

    // open mail app using the approver emails inputted and a default email body
    const approver1 = (<HTMLInputElement>document.getElementById('app1')).value;
    const approver2 = (<HTMLInputElement>document.getElementById('app2')).value;
    const approver3 = (<HTMLInputElement>document.getElementById('app3')).value;
    var mail =
      'mailto:' +
      approver1 +
      ',' +
      approver2 +
      ',' +
      approver3 +
      "?subject=[ACTION REQUIRED] Request For Compliance Approval&body=Hello%2C%0D%0AYou have received a request to review an Apprentice Report.%0D%0A%0D%0APlease open the attached file within the approvers section of the Compliance Approval Portal.  To request changes please add comments in line and select the 'Request Changes' option.  To approve the current report please select 'Approve'.%0D%0A%0D%0AFor any questions please contact complianceapprovalportal%40gmail.com%0D%0A%0D%0A";
    var sendEmail = document.createElement('a');
    sendEmail.href = mail;
    sendEmail.click();
    this.dialog.closeAll();
  }
}
