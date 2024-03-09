import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestApprovalComponent } from './request-approval.component';

@Injectable({
  providedIn: 'root',
})
export class RequestApprovalService {
  constructor(private dialog: MatDialog) {}
  public form;

  openPopup() {
    this.dialog.open(RequestApprovalComponent, {width:'800px', panelClass:'dialog-container'});
    this.form = document.getElementById("approvalRequestForm");
    this.form.addEventListener("submit", this.sendEmail);
  }

  sendEmail(e) {
    e.preventDefault();
    const approver1 = (<HTMLInputElement>document.getElementById('app1')).value
    const approver2 = (<HTMLInputElement>document.getElementById('app2')).value
    const approver3 = (<HTMLInputElement>document.getElementById('app3')).value
    // var mail = 'mailto:'+approver1+', '+approver2+', '+approver3;
    var mail = 'mailto:'+approver1+', '+approver2+', '+approver3+'?subject=[ACTION REQUIRED] Request For Compliance Approval&body=Hello%2C%0D%0AYou have received a request to review an Apprentice Report.%0D%0A%0D%0APlease open the attached file within the approvers section of the Compliance Approval Portal.  To request changes please add comments in line and select the "Request Changes" option.  To approve the current report please select "Approve".%0D%0A%0D%0AFor any questions please contact complianceapprovalportal%40gmail.com';
    var sendEmail = document.createElement('a');
    sendEmail.href = mail;
    sendEmail.click();
  // add attachment here
}

}