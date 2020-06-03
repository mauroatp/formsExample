import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';

//importo rutas
import { AppRoutingModule } from './app.routing.module';

//importo formsmodule(del tipo template) para evitar postback formulario template y reactive
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//importo el http para hacer peticiones desde service
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // importo el modulo
    HttpClientModule, //importo el reactivo
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
