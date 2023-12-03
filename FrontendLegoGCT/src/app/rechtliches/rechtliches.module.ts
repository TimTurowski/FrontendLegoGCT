import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RechtlichesComponent } from './rechtliches.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'impressum', component: RechtlichesComponent}
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

export class RechtlichesModule { }
