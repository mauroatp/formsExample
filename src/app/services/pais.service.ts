import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //previamente importo httpclientmodule en el app.module.ts
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor( private http: HttpClient ) { }

  getPaise(){

return this.http.get('https://restcountries.eu/rest/v2/lang/es')
            .pipe( 
              map( (resp: any[]) => { //este es el map reactive extension
                  return resp.map( pais => {   //este es el map de los arreglos
                    return {
                      nombre: pais.name, 
                      codigo: pais.alpha3Code
                    }
                  })   
                }) 
              );
  }
}
