import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request-download',
  templateUrl: './request-download.component.html',
  styleUrls: ['./request-download.component.scss'],
})
// request PDF download after 3 approvers received so they are then able to submit a pdf doc
export class RequestDownloadComponent {
  constructor(private dialog: MatDialog) {}

  // close the pop up window
  closeDialog() {
    this.dialog.closeAll();
  }
}
