import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request-approval',
  templateUrl: './request-approval.component.html',
  styleUrls: ['./request-approval.component.scss'],
})
// form for apprentice to request approvals
export class RequestApprovalComponent {
  constructor(private dialog: MatDialog) {}

  // close the pop up
  closeDialog() {
    this.dialog.closeAll();
  }
}
