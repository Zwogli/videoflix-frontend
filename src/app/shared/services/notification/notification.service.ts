import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})

export class NotificationService {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Schließen', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  showDialog(message: string, title: string = 'Information'): void {
    this.dialog.open(DialogComponent, {
      data: { message, title },
    });
  }
}

