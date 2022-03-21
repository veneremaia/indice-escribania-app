import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogYearData } from '../indice-list.component';

@Component({
  selector: 'app-dialogyear',
  templateUrl: './dialogyear.component.html',
  styleUrls: ['./dialogyear.component.css']
})
export class DialogyearComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogyearComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogYearData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
