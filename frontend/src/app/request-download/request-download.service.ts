import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestDownloadComponent } from './request-download.component';
import { DocumentEditorContainerComponent } from '@syncfusion/ej2-angular-documenteditor';
import {
  PdfBitmap,
  PdfDocument,
  PdfPageOrientation,
  PdfPageSettings,
  PdfSection,
  SizeF,
} from '@syncfusion/ej2-pdf-export';
import { ImageFormat } from '@syncfusion/ej2-angular-documenteditor';

@Injectable({
  providedIn: 'root',
})
// form to download as a pdf after apprentice has received three approvals
export class RequestDownloadService {
  constructor(public dialog: MatDialog) {}
  public form;
  public textEditor?: DocumentEditorContainerComponent;
  public testingPdfDocument: PdfDocument;

  // open the pop up to request download
  // set up what happens on button click
  openPopup(textEditor) {
    this.textEditor = textEditor;
    this.dialog.open(RequestDownloadComponent, {
      width: '670px',
      panelClass: 'dialog-container',
    });
    this.form = document.getElementById('downloadRequestForm');

    if (this.form) {
      this.form.addEventListener('submit', (event) => {
        this.downloadPDF(event, this.textEditor);
      });
    }
  }

  // get the conent of the report and save it as a pdf document
  // there is no inbuilt functionality for this and therefore each page is treated as an image
  downloadPDF(event, textEditor) {
    event.preventDefault();

    // create a blank pdf
    let pdfDocument = new PdfDocument();
    let numPages: number = textEditor.container.documentEditor.pageCount;
    textEditor.container.documentEditor.documentEditorSettings.printDevicePixelRatio = 2;

    // iterate through each page one by one and turn this into an image
    let loadedPage = 0;
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      let imageFormat: ImageFormat = 'image/jpeg' as ImageFormat;
      let pageAsImage = textEditor.container.documentEditor.exportAsImage(
        pageNum,
        imageFormat
      );

      // save height and width of image to determine orientation
      pageAsImage.onload = function () {
        let imageHeight = parseInt(
          pageAsImage.style.height.toString().replace('px', '')
        );
        let imageWidth = parseInt(
          pageAsImage.style.width.toString().replace('px', '')
        );

        // speficy the actual layout of the page
        let settings: PdfPageSettings = new PdfPageSettings(0);
        settings.size = new SizeF(imageWidth, imageHeight);
        // default orientation is portrait, alter if needed
        if (imageWidth > imageHeight) {
          settings.orientation = PdfPageOrientation.Landscape;
        }

        // add this new created page to the pdf
        let section: PdfSection = pdfDocument.sections.add() as PdfSection;
        (section as PdfSection).setPageSettings(settings);
        let page = section.pages.add();

        // add the image to the page, covers the full page
        let graphics = page.graphics;
        let imageStr = pageAsImage.src.replace('data:image/jpeg;base64,', '');
        let pdfImage = new PdfBitmap(imageStr);
        graphics.drawImage(pdfImage, 0, 0, imageWidth, imageHeight);
        loadedPage++;

        // after adding every page, save the doc
        if (loadedPage == numPages) {
          pdfDocument.save('PDF Report For Submission.pdf');
        }
      };
    }
    this.testingPdfDocument = pdfDocument;
    this.dialog.closeAll();
  }
}
