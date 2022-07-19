import { Component, HostBinding, OnInit } from '@angular/core';
import { Indice } from 'src/app/models/indices';
import { IndicesService } from 'src/app/services/indices.service';
import {ActivatedRoute,Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-indice-form',
  templateUrl: './indice-form.component.html',
  styleUrls: ['./indice-form.component.css']
})
export class IndiceFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  
  indice: Indice ={
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
    contranexo: '',
    create_at: undefined
    
  };

  indices : any = [];

  edit: boolean = false;
  
  escrituraForm = new FormGroup({
    nro_escritura: new FormControl(this.indice.nro_escritura, Validators.required),
    nro_folio: new FormControl(this.indice.nro_folio, Validators.required),
    day: new FormControl(this.indice.day, Validators.required),
    month: new FormControl(this.indice.month, Validators.required),
    year: new FormControl(this.indice.year, Validators.required),
    objeto: new FormControl(this.indice.objeto, Validators.required),
    nombre1: new FormControl(this.indice.nombre1, Validators.required),
    nombre2: new FormControl(this.indice.nombre2),
    nexo: new FormControl(this.indice.nexo),
    contranexo: new FormControl(this.indice.contranexo),

  })

  constructor(private indicesService: IndicesService, private router : Router,
     private activatedRoute : ActivatedRoute, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getIndices();

    const params = this.activatedRoute.snapshot.params;
    if(params.id){
      this.indicesService.getIndice(params.id).subscribe(
        res =>{
          console.log(res);
          this.indice = res;
          this.edit = true;
          this.setEscrituraForm(res);

       },
       err=> console.error(err)
     );
    }

  }

  getIndices(){
    this.indicesService.getIndices().subscribe(
      res => {
        this.indices = res;
      },
      err => console.error(err)
    );
  }

  setEscrituraForm(res:any){
    this.escrituraForm.patchValue({
      nro_escritura: res.nro_escritura,
      nro_folio: res.nro_folio,
      day: res.day,
      month: res.month,
      year: res.year,
      objeto: res.objeto,
      nexo: res.nexo,
      nombre1: res.nombre1,
      nombre2: res.nombre2,
      contranexo: res.contranexo
    });
  }

  setIndice(){
    this.indice.nro_escritura = this.escrituraForm.value.nro_escritura;
    this.indice.nro_folio = this.escrituraForm.value.nro_folio;
    this.indice.day = this.escrituraForm.value.day;
    this.indice.month = this.escrituraForm.value.month;
    this.indice.year = this.escrituraForm.value.year;
    this.indice.objeto = this.escrituraForm.value.objeto;
    this.indice.nombre1 = this.escrituraForm.value.nombre1;
    this.indice.nombre2 = this.escrituraForm.value.nombre2;
    this.indice.nexo = this.escrituraForm.value.nexo;
    this.indice.contranexo = this.escrituraForm.value.contranexo;

  }

  saveIndice(){
    // Eliminamos los datos de id y de fecha ya que la base de datos los crea.
    this.setIndice();
    delete this.indice.id;

    if(!this.existeEscritura(this.indice)){
    this.indicesService.saveIndice(this.indice).subscribe(
      res =>{
         console.log(res);
         this.router.navigate(['/indices']);
         this.showSuccess();
      },
      err=>console.error(err)
    );
  }
  else
    this.showError();
  }

  existeEscritura(indice : Indice) : boolean{
    for(let i=0; i<this.indices.length;i++){
      if(this.indices[i].id!=indice.id){
        if((this.indices[i].nro_escritura==indice.nro_escritura || this.indices[i].nro_folio==indice.nro_folio)
        &&(this.indices[i].year==indice.year))
        return true;
    }
  }
    return false
  }


  updateIndice(){
    this.setIndice();

    // Eliminamos el dato de fecha ya que la base de datos los crea.
    if(!this.existeEscritura(this.indice)){
      console.log("No existe escritura igual");
      this.setIndice();
    this.indicesService.updateIndice(Number(this.indice.id),this.indice).subscribe(
      res =>{
         console.log(res);
         this.router.navigate(['/indices']);
         this.showSuccess();
         
      },
      err=> console.error(err)
    );
  }
  else
  this.showError();
}

showError(){
  this.toastr.error('Número de escritura o folio existente');
}


showSuccess() {
  this.toastr.success('La escritura se guardó correctamente');
}



}
