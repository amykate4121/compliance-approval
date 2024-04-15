import { MatDialog } from '@angular/material/dialog';
import { RequestChangesComponent } from './request-changes.component';

// check pop up interactions
describe('RequestChangesComponent', () => {
  let component: RequestChangesComponent;
  let matDialog: MatDialog;

  beforeEach(() => {
    matDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);
    component = new RequestChangesComponent(matDialog);
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