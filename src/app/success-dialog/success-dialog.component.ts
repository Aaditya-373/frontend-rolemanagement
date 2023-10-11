import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  template: `
    <h1 mat-dialog-title>Success</h1>
    <div mat-dialog-content>
      {{ data.message }}
    </div>
  `
})
export class SuccessDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
