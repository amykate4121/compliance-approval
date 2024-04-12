import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss'],
})
// where the approver can notify the apprentice that they approve
export class ApproveComponent {
  constructor(private dialog: MatDialog) {}

  // close the pop up
  closeDialog() {
    this.dialog.closeAll();
  }
}
