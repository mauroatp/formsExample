import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService) {

    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit() {
  }

  get nombreNoValido() {
    return this.forma.get('nombre') && this.forma.get('nombre').touched;
  }
  get apellidoNoValido() {
    return this.forma.get('apellido') && this.forma.get('apellido').touched;
  }
  get emailNoValido() {
    return this.forma.get('correo') && this.forma.get('correo').touched;
  }
  get usuarioNoValido() {
    return this.forma.get('usuario') && this.forma.get('usuario').touched;
  }
  get districtoNoValido() {
    return this.forma.get('direccion.districto') && this.forma.get('direccion.districto').touched;
  }
  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad') && this.forma.get('direccion.ciudad').touched;
  }

//para cargar el array form en la tabla pasatiempos, es un alias 
  get pasatiempos(){ 
    return this.forma.get('pasatiempos') as FormArray;

  }
  get pass1NoValido() {
    return this.forma.get('pass1') && this.forma.get('pass1').touched;
  }
  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? true : false;

    //return this.forma.get('pass1  ') && this.forma.get('pass1').touched;
  }

  crearFormulario() { //desde html uso formcontrols

    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]], //uso desde html formControlName
      apellido: ['', Validators.required ],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.existeUsuario], //tercer lugar del array[] para validaciones async creado en validators.service.ts
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        districto: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.validadores.passwordsIguales('pass1','pass2') //aca hago las validaciones de la pass
    }); 
  }

  crearListeners(){
   /*  this.forma.valueChanges.subscribe( valor=> {
      console.log(valor);
    });

    this.forma.statusChanges.subscribe( status =>{
      console.log(status);
    })
 */
    this.forma.get('nombre').valueChanges.subscribe( nombre => console.log(nombre))
  }

  cargarDataAlFormulario() {
    //this.forma.setValue({ //seteo el formulario
      this.forma.reset({ //reseteo el formulario completando la data submit
      nombre: 'Juanes',
      apellido: 'Peres',
      correo: 'juan@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        districto: 'Ontario',
        ciudad: 'Ottawa'
      },
    });

    ['comer','dormir'].forEach( valor => this.pasatiempos.push( this.fb.control(valor) )); //agrego
  }

  agregarPasatiempos(){
    //utilizo el alias get
    console.log("lleque a agregar?");
    this.pasatiempos.push( this.fb.control('') );
  }

  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }
  guardar() {

    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {

        if( control instanceof FormGroup) //para validar el form group interno de direcciones
        {
          Object.values( control.controls ).forEach(ctr => ctr.markAsTouched); //recorro todos los elementos del form gropu interno
        }
        else{
          control.markAsTouched();
        }        
      });
    }
    console.log(this.forma);

    this.forma.reset({
      nombre:'vacio el nombre'
    });
  }



}
