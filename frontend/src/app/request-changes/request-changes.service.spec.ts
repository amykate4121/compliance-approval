import { MatDialog } from '@angular/material/dialog';
import { RequestChangesService } from './request-changes.service';

// check the apprentice and successfully interact with request download
describe('RequestChangesService', () => {
  let service: RequestChangesService;
  let matDialog: MatDialog;

  beforeEach(() => {
    matDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
    service = new RequestChangesService(matDialog);
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

  // amy here
});
