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
export class RequestDownloadService {
  constructor(private dialog: MatDialog) {}
  public form;
  public textEditor?: DocumentEditorContainerComponent;

  openPopup(textEditor) {
    this.textEditor = textEditor;
    this.dialog.open(RequestDownloadComponent, {width:'670px', panelClass:'dialog-container'});
    this.form = document.getElementById("downloadRequestForm");
  
    this.form.addEventListener("submit", (event) => {
      this.downloadPDF(event, this.textEditor);
    });
  }

  // AMY tidy and make it look like you
  // reference this?
  downloadPDF(e, textEditor) {
    e.preventDefault();
    let obj = textEditor;
        let pdfdocument: PdfDocument = new PdfDocument();
        let count: number = obj.container.documentEditor.pageCount;
        obj.container.documentEditor.documentEditorSettings.printDevicePixelRatio = 2;
        let loadedPage = 0;
        for (let i = 1; i <= count; i++) {
          setTimeout(() => {
            let format: ImageFormat = 'image/jpeg' as ImageFormat;
            // Getting pages as image
            let image = obj.container.documentEditor.exportAsImage(i, format);
            image.onload = function () {
              let imageHeight = parseInt(
                image.style.height.toString().replace('px', '')
              );
              let imageWidth = parseInt(
                image.style.width.toString().replace('px', '')
              );
              let section: PdfSection = pdfdocument.sections.add() as PdfSection;
              let settings: PdfPageSettings = new PdfPageSettings(0);
              if (imageWidth > imageHeight) {
                settings.orientation = PdfPageOrientation.Landscape;
              }
              settings.size = new SizeF(imageWidth, imageHeight);
              (section as PdfSection).setPageSettings(settings);
              let page = section.pages.add();
              let graphics = page.graphics;
              let imageStr = image.src.replace('data:image/jpeg;base64,', '');
              let pdfImage = new PdfBitmap(imageStr);
              graphics.drawImage(pdfImage, 0, 0, imageWidth, imageHeight);
              loadedPage++;
              if (loadedPage == count) {
                  // Exporting the document as pdf
                pdfdocument.save(
                  (obj.container.documentEditor.documentName === ''
                    ? 'PDF Report'
                    : obj.container.documentEditor.documentName) + '.pdf'
                );
              }
            };
          }, 500);
        }

  }
}