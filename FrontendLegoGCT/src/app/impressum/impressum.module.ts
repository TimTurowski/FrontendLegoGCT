import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpressumComponent } from './impressum.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'impressum', component: ImpressumComponent}
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

export class ImpressumModule { }
