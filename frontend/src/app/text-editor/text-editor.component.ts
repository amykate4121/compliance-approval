import { Component } from '@angular/core';
import * as Auth0 from 'auth0-web';
import {Router} from "@angular/router";
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent {
  constructor(private router: Router) { }
  ngOnInit(): void {
    const self = this;
    Auth0.handleAuthCallback((err) => {
      if (err) alert(err);
      self.router.navigate(['/text-editor']);
    });
  }

  public customToolbar: Object ={
    items: ['Print', 'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|', 'Bold', 'Italic', 'Underline', 'Alignments', 'Formats', '|', 'Cut', 'Copy', 'Paste', '|', 'Undo', 'Redo', '|', 'OrderedList', 'BulletFormatList', 'SubScript', 'SuperScript', '|', 'CreateTable', 'Image', 'CreateLink']
  }
}
