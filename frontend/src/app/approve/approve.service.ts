import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApproveComponent } from './approve.component';
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';

@Injectable({
  providedIn: 'root',
})
// ensure approver understands what makes report complaint, and notify apprentice that the approval has been received
export class ApproveService {
  constructor(private dialog: MatDialog) {}
  public form;
  public container?: DocumentEditorContainerComponent;
  public apprentice: string;
  public sendEmail: any;

  // open the pop up
  openPopup() {
    this.dialog.open(ApproveComponent, {
      width: '670px',
      panelClass: 'dialog-container',
    });

    this.form = document.getElementById('approvalForm');
    if (this.form) {
      this.form.addEventListener('submit', (event) => {
        this.sendApprovalEmail(event);
      });
    }
  }

  // open default mail app to notify apprentice that they have received approval
  sendApprovalEmail(event) {
    event.preventDefault();
    const apprentice = (<HTMLInputElement>document.getElementById('email'))
      .value;
    var mail =
      'mailto:' +
      apprentice +
      '?subject=[Notification] Compliance Approval Received&body=Hello%2C%0D%0AYour report has received an approval.%0D%0A%0D%0AAfter three approvals, please request a PDF download for submission.%0D%0A%0D%0AFor any questions please contact complianceapprovalportal%40gmail.com%0D%0A%0D%0A';
    var sendEmail = document.createElement('a');
    sendEmail.href = mail;
    sendEmail.click();
    this.dialog.closeAll();
  }
}
