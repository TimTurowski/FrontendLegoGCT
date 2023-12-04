import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrierungComponent } from './registrierung.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'registrierung', component: RegistrierungComponent}
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class RegistrierungModule { }
