import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  safeHtmlMessage: SafeHtml;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, title: string},
    private sanitizer: DomSanitizer
  ) {
    this.safeHtmlMessage = this.sanitizer.bypassSecurityTrustHtml(data.message);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
