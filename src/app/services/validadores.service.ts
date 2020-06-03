import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


//creo una interface para devolver erro
interface ErrorValidate{
  [s: string]: boolean 
}
@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

/*  noHerrera(control: FormControl): { [s: string]: boolean } {

    if (control.value.toLowerCase() === 'herrera') {
      return {
        noHerrera: true
      }
    }
    return null;
  }*/

  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate>{
    
    //si no se completa el usuario
    if( !control.value ){
      return Promise.resolve(null);
    }

    return new Promise( (resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'mal'){
          resolve({existe: true});
        }else{
          resolve(null); //devuelvo nul si esta bien
        }
      }, 3500);
    });
  }

  passwordsIguales(pass1: string, pass2: string){

    return (formGroup: FormGroup) =>{
        const pass1Control= formGroup.controls[pass1];
        const pass2Control= formGroup.controls[pass2];

        if(pass1Control.value === pass2Control.value ){
          pass2Control.setErrors(null);
        }else{
          pass2Control.setErrors({noEsIgual: true});
        }
    }
  }
}
