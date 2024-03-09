import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request-changes',
  templateUrl: './request-changes.component.html',
  styleUrls: ['./request-changes.component.scss']
})
export class RequestChangesComponent {
  constructor(private dialog: MatDialog) {}
  
  closeDialog() {
    this.dialog.closeAll();
  }
}
