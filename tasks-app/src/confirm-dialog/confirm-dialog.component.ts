import { Component, inject } from '@angular/core';
import { ConfirmDialogData } from '../_interfaces/confimation-dialog-data.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  public data: ConfirmDialogData = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
}
