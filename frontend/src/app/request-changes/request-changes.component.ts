import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request-changes',
  templateUrl: './request-changes.component.html',
  styleUrls: ['./request-changes.component.scss'],
})
// form for approver to request changes
export class RequestChangesComponent {
  constructor(private dialog: MatDialog) {}

  // close the pop up
  closeDialog() {
    this.dialog.closeAll();
  }
}
