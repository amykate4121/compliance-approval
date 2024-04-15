import { MatDialog } from '@angular/material/dialog';
import { ApproveComponent } from './approve.component';

// check pop up interaction
describe('ApproveComponent', () => {
  let component: ApproveComponent;
  let matDialog: MatDialog;

  beforeEach(() => {
    matDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);
    component = new ApproveComponent(matDialog);
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