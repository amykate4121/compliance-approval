import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenerateReportComponent } from './generate-report.component';
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';

@Injectable({
  providedIn: 'root',
})
export class GenerateReportService {
  constructor(private dialog: MatDialog) {}
  public form;
  public container?: DocumentEditorContainerComponent;

  openPopup() {
    this.dialog.open(GenerateReportComponent, {width:'670px', panelClass:'dialog-container'});
    this.form = document.getElementById("approvalForm");
    this.form.addEventListener("submit", this.sendApprovalEmail);
  }

  sendApprovalEmail(e) {
    e.preventDefault();
    const apprentice = (<HTMLInputElement>document.getElementById('email')).value
    var mail = "mailto:" + apprentice + "?subject=[Notification] Compliance Approval Received&body=Hello%2C%0D%0AYour report has received an approval.%0D%0A%0D%0AAfter three approvals, please request a PDF download for submission.%0D%0A%0D%0AFor any questions please contact complianceapprovalportal%40gmail.com%0D%0A%0D%0A";
    var sendEmail = document.createElement('a');
    sendEmail.href = mail;
    sendEmail.click();
  }
}