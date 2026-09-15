import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';


const MaterialComponents = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatDialogModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatChipsModule,
  MatMenuModule,
  MatDividerModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,

  BrowserAnimationsModule,
  MatSortModule

];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
