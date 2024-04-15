import { MatDialog } from '@angular/material/dialog';
import { RequestDownloadService } from './request-download.service';
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';

// check the apprentice and successfully interact with request download
describe('RequestDownloadService', () => {
  let service: RequestDownloadService;
  let matDialog: MatDialog;
  let textEditor: any;

  beforeEach(() => {
    // mock the service
    matDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
    service = new RequestDownloadService(matDialog);

    // mock text editor
    textEditor = {
      container: {
        documentEditor: {
          pageCount: 5,
          documentEditorSettings: { printDevicePixelRatio: 2 },
          exportAsImage: jasmine
            .createSpy()
            .and.callFake((pageNum, imageFormat) => {
              const image = new Image();
              image.src = 'data:image/jpeg;base64,base64imagestring';
              return image;
            }),
        },
      },
    } as unknown as DocumentEditorContainerComponent;
  });

  // check service is created
  it('should create', () => {
    expect(service).toBeTruthy();
  });

  // check service is created
  it('should create', () => {
    service.openPopup(textEditor);
    expect(matDialog.open).toHaveBeenCalled();
  });

  // check pdf downloads
  it('should download pdf', () => {
    service.downloadPDF(new Event('submit'), textEditor);
    expect(matDialog.closeAll).toHaveBeenCalled();
    expect(service.pdfDocument).not.toBeNull();
  });
});
