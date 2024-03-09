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
}
