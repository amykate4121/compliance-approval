import { MatDialog } from '@angular/material/dialog';
import { RequestApprovalService } from './request-approval.service';

// check the apprentice can request approval
describe('RequestApprovalService', () => {
  let service: RequestApprovalService;
  let matDialog: MatDialog;

  beforeEach(() => {
    // mock the service
    matDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
    service = new RequestApprovalService(matDialog);
  });

  // check service is created
  it('should create', () => {
    expect(service).toBeTruthy();
  });

  // check service is created
  it('should create', () => {
    service.openPopup(null);
    expect(matDialog.open).toHaveBeenCalled();
  });

//   amy here
});
