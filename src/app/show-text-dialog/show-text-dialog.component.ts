import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface TextData {
  text: string;
}
@Component({
  selector: 'app-show-text-dialog',
  templateUrl: './show-text-dialog.component.html',
  styleUrls: ['./show-text-dialog.component.scss']
})
export class ShowTextDialogComponent implements OnInit {
  text:string;
  constructor(
    public dialogRef: MatDialogRef<ShowTextDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TextData,
  ) { }

  ngOnInit(): void {
  }

}
