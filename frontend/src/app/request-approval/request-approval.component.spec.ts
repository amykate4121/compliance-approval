import { MatDialog } from '@angular/material/dialog';
import { RequestApprovalComponent } from './request-approval.component';


// check pop up interactions
describe('RequestApprovalComponent', () => {
  let component: RequestApprovalComponent;
  let matDialog: MatDialog;

  beforeEach(() => {
    matDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);
    component = new RequestApprovalComponent(matDialog);
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