import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucheComponent } from './suche.component';
import { Routes, RouterModule } from '@angular/router';
import { ErgebnisComponent } from './ergebnis/ergebnis.component';
import { EinzelteileAnzeigenComponent } from './ergebnis/einzelteile-anzeigen/einzelteile-anzeigen.component';
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'suche', component: SucheComponent},
  {path: 'suche/ergebnis', component: ErgebnisComponent}
];

@NgModule({
  declarations: [
    SucheComponent,
    ErgebnisComponent,
    EinzelteileAnzeigenComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule
    ],
    exports: [
        RouterModule,
        SucheComponent
    ]
})
export class SucheModule { }
