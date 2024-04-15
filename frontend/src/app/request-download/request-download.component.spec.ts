import { MatDialog } from '@angular/material/dialog';
import { RequestDownloadComponent } from './request-download.component';

// check pop up interaction
describe('RequestDownloadComponent', () => {
  let component: RequestDownloadComponent;
  let matDialog: MatDialog;

  beforeEach(() => {
    matDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);
    component = new RequestDownloadComponent(matDialog);
  });

  // check component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check the pop up closes
  it('should close pop up', () => {
    component.closeDialog();
    expect(matDialog.closeAll).toHaveBeenCalled();
  });
});