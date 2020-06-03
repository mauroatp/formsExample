import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

usuario = {
  nombre: '',
  apellido: '',
  correo: '',
  pais: '',
  genero: ''
}; //se lo asigno al html con [ngModel]="usuario"

paises: any[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit() {

    this.paisService.getPaise()
      .subscribe( paise =>{
        
        this.paises = paise;
        this.paises.unshift({
          nombre:'[Seleccione pais]',
          codigo: ''
        });
        console.log(this.paises);
      });

  }

guardar(forma: NgForm){

  if(forma.invalid){
    
    Object.values( forma.controls ).forEach( control => {
      control.markAsTouched();
    });
    
    return;
  }
  console.log(forma);
  console.log(forma.value);
}

}
