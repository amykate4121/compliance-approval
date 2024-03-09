import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request-download',
  templateUrl: './request-download.component.html',
  styleUrls: ['./request-download.component.scss']
})
export class RequestDownloadComponent {
  constructor(private dialog: MatDialog) {}
  
  closeDialog() {
    this.dialog.closeAll();
  }
}
