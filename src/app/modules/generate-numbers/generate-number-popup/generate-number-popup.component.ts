import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-number-popup',
  templateUrl: './generate-number-popup.component.html',
  styleUrls: ['./generate-number-popup.component.scss']
})
export class GenerateNumberPopupComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GenerateNumberPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public generatedNumber: any,
  ) { }

  ngOnInit(): void {
  }
}
