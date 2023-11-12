import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeComponent } from './liste.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'liste', component: ListeComponent}
];

@NgModule({
  declarations: [
    ListeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ListeModule { }
