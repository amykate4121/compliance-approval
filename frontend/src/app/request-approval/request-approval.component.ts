import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request-approval',
  templateUrl: './request-approval.component.html',
  styleUrls: ['./request-approval.component.scss']
})
export class RequestApprovalComponent {
  constructor(private dialog: MatDialog) {}
  
  closeDialog() {
    this.dialog.closeAll();
  }

  // sendEmail() {
  //   const approver1 = (<HTMLInputElement>document.getElementById('app1')).value
  //   const approver2 = (<HTMLInputElement>document.getElementById('app2')).value
  //   const approver3 = (<HTMLInputElement>document.getElementById('app3')).value

  //   // add default body etc here
  //   // var mail = 'mailto:'+approver1+', '+approver2+', '+approver3;
  //   var mail = 'mailto:test@gmail.com?subject=%5BACTION%20REQUIRED%5D%20Request%20For%20Compliance%20Approval&body=Hello%2C%0D%0AYou%20have%20received%20a%20request%20to%20review%20an%20Apprentice%20Report.%20%20%0D%0A%0D%0APlease%20open%20the%20attached%20file%20within%20the%20approvers%20section%20of%20the%20Compliance%20Approval%20Portal.%20%20To%20request%20changes%20please%20add%20comments%20in%20line%20and%20select%20the%20"Request%20Changes"%20option.%20%20To%20approve%20the%20current%20report%20please%20select%20"Approve".%0D%0A%0D%0AFor%20any%20questions%20please%20contant%20complianceapprovalportal%40gmail.com';
    
  //   var sendEmail = document.createElement('a');
  //   sendEmail.href = mail;
  //   sendEmail.click();
    
  //   this.closeDialog();
  // }

}
