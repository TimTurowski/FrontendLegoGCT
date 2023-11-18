import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeComponent } from './liste.component';
import { Routes, RouterModule } from '@angular/router';
import { AnsichtComponent } from './ansicht/ansicht.component';
import { DetailsComponent } from './details/details.component';
import { ApiService } from '../api.service';

const routes: Routes = [
  {path: 'liste', component: ListeComponent}
];

@NgModule({
  declarations: [
    ListeComponent,
    AnsichtComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ApiService
  ]
})
export class ListeModule { }
