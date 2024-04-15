import { MatDialog } from '@angular/material/dialog';
import { ApproveService } from './approve.service';

// check the approver can approve
describe('ApproveService', () => {
  let service: ApproveService;
  let matDialog: MatDialog;

  beforeEach(() => {
    // mock the service
    matDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
    service = new ApproveService(matDialog);
  });

  // check service is created
  it('should create', () => {
    expect(service).toBeTruthy();
  });

  // check service is created
  it('should create', () => {
    service.openPopup();
    expect(matDialog.open).toHaveBeenCalled();
  });  
});
