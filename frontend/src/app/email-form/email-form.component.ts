import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit{
  public form

  ngOnInit(): void {
      this.form = document.getElementById("approvalRequestForm");
      this.form.addEventListener("submit", this.sendEmail);
  }
  

  sendEmail(e) {
    e.preventDefault();
    const approver1 = (<HTMLInputElement>document.getElementById('app1')).value
    const approver2 = (<HTMLInputElement>document.getElementById('app2')).value
    const approver3 = (<HTMLInputElement>document.getElementById('app3')).value
    var mail = 'mailto:'+approver1+', '+approver2+', '+approver3;
    var sendEmail = document.createElement('a');
    sendEmail.href = mail;
    sendEmail.click();
    // add attachment here
    // somehow redirect here
  }
  
}
