import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeComponent } from './liste.component';
import { Routes, RouterModule } from '@angular/router';
import { AnsichtComponent } from './ansicht/ansicht.component';
import { DetailsComponent } from './details/details.component';
import { ApiService } from '../api.service';
import {SucheModule} from "../suche/suche.module";

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
    RouterModule.forChild(routes),
    SucheModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ApiService
  ]
})
export class ListeModule { }
