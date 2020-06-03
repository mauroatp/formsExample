import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReactiveComponent } from './pages/reactive/reactive.component';
import { TemplateComponent } from './pages/template/template.component';


const routes: Routes = [
  { path: 'reactive'    , component: ReactiveComponent}, //valido que este autenticado no entre por url
  { path: 'template', component: TemplateComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'reactive' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }