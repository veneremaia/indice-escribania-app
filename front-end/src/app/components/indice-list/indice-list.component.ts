import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Indice } from 'src/app/models/indices';
import { IndicesService } from '../../services/indices.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { MatDialog } from '@angular/material/dialog';
import { DialogyearComponent } from './dialogyear/dialogyear.component';


export interface DialogYearData {
  year: number;
}

@Component({
  selector: 'app-indice-list',
  templateUrl: './indice-list.component.html',
  styleUrls: ['./indice-list.component.css']
})


export class IndiceListComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  @ViewChild('content') content!: ElementRef;


  closeResult = '';
  escrituraModal!: Indice;
  indices: any = [];
  nombres: any = [];
  searchValue: string = "";
  years : any = [];
  filterYear = new Date().getFullYear();
  indice: Indice = {
    id: 0,
    nro_escritura: 0,
    nro_folio: 0,
    day: 0,
    month: 0,
    year: 0,
    objeto: '',
    nombre1: '',
    nombre2: '',
    nexo: '',
    contranexo: ''
  };
  constructor(public dialog: MatDialog, private indicesService: IndicesService, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.getIndices();


  }


  getIndices() {
    this.indices = [];
    this.indicesService.getIndices().subscribe(
      res => {
        res.forEach(indice =>{
          if(indice.year==this.filterYear){
            this.indices.push(Object.assign({}, indice))
          }
        })
  

        res.forEach(element => {
          if(element.year==this.filterYear && element.nombre2){
            this.indice.id = element.id;
            this.indice.nro_escritura = element.nro_escritura;
            this.indice.nro_folio = element.nro_folio;
            this.indice.day = element.day;
            this.indice.month = element.month;
            this.indice.year = element.year;
            this.indice.nombre1 = element.nombre2;
            this.indice.nombre2 = element.nombre1;
            this.indice.nexo = element.contranexo;
            this.indice.contranexo = element.nexo;
            this.indice.objeto = element.objeto;

            this.indices.push(Object.assign({}, this.indice));
            this.years.push(Object.assign({},element.year));
          }
        });

        this.indices = this.indices.sort((obj1: Indice, obj2: Indice) => {
          if (obj1.nombre1.toLowerCase() > obj2.nombre1.toLowerCase()) {
            return 1;
          }
          if (obj1.nombre1.toLowerCase() < obj2.nombre1.toLowerCase())
            return -1;
          return 0;
        })

        this.indices = this.indices.sort((obj1: Indice, obj2: Indice) => {
          if (obj1.nombre1.toLowerCase().substring(0, 1) == obj2.nombre1.toLowerCase().substring(0, 1)) {
            if (obj1.nro_escritura > obj2.nro_escritura)
              return 1;
            else
              return -1
          }
          return 0;
        });

        this.years = this.years.sort((obj1: Number, obj2: Number) => {
          if (obj1 > obj2) {
            return 1;
          }
          if (obj1 < obj2)
            return -1;
          return 0;
        })
        

      },
      err => console.error(err)
    );

  }


  deleteIndice(id: any) {
    this.indicesService.deleteIndice(id).subscribe(
      res => {
        this.getIndices();
      },
      err => console.error(err)
    )
  }

  private getEscrituraById(id: string) {
    this.indicesService.getIndice(id).subscribe(
      res => {

        this.escrituraModal = res;

      },
      err => console.error(err)
    )
  }

  open(content: any, id: any) {
    this.getEscrituraById(id);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openYear() : void {
    const dialogRef = this.dialog.open(DialogyearComponent, {
      width: '250px',
      data: {year: this.filterYear},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
      this.filterYear = result;
      this.getIndices();
    }});
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  separatesByFirstLeter(): Indice[][] {
    let rowsByLeter: Indice[] = [];
    let all: Indice[][] = []
    rowsByLeter.push(this.indices[0])
    for (let i = 1; i < this.indices.length; i++) {
      if (this.indices[i].nombre1.toLowerCase().substring(0, 1) == this.indices[i - 1].nombre1.toLowerCase().substring(0, 1))
        rowsByLeter.push(this.indices[i]);
      else {
        if(rowsByLeter.length>0)
          all.push(Object.assign({}, rowsByLeter));
        rowsByLeter = [];
        rowsByLeter.push(this.indices[i]);
      }
      if(i==this.indices.length-1){
        all.push(Object.assign({}, rowsByLeter));
      }
    }
    return all;

  }

  createPdf() {
    let all = this.separatesByFirstLeter();
    var doc = new jsPDF();
    doc.setTextColor(100);
    let cell =0;
    let odd = true;
    let page = 1;
    let head = [['Acto', 'Intervinientes', 'Escritura', 'Día', 'Mes', 'Folio']];
    all.forEach((indiceByLeter: Indice[]) => {
      let data: (string | number)[][] = [];
      for (let i = 0; i < Object.keys(indiceByLeter).length; i++) {
        let nombreCompleto = indiceByLeter[i].nombre1 + " " + indiceByLeter[i].nexo + " " + indiceByLeter[i].nombre2;
        if(nombreCompleto.length>45){
          nombreCompleto = nombreCompleto.substring(0,45);
        }
        data.push([indiceByLeter[i].objeto, nombreCompleto, indiceByLeter[i].nro_escritura, indiceByLeter[i].day, indiceByLeter[i].month, indiceByLeter[i].nro_folio])
      }
      
      (doc as any).autoTable({
        
        head: head,
        body: data,
        theme: 'plain',
        styles: {fontSize: 12,minCellHeight:10.5, font:'arial'},
        margin: { top: 13, left: 40},
        
        willDrawCell: function (data: any) {           
          cell++

          if(cell>148){
            cell=0;
            odd = !odd;
          }
          if(data.table.startPageNumber!=page){
            cell=0;
            odd = true;
            if(!(data.table.startPageNumber % 2))
              doc.addPage();
          }
          if(!odd){
            data.table.settings.margin.left=10;
            data.table.settings.margin.right=25;
            }
          else{
            data.table.settings.margin.left=40;
            data.table.settings.margin.right=3;
          }
          page = data.table.startPageNumber;
    }
      });
      
      doc.addPage();
    })
    doc.save('indice.pdf');

  }

}