import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent {
  constructor(private dialog: MatDialog) {}
  
  closeDialog() {
    this.dialog.closeAll();
  }
}
