import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SucheModule } from './suche/suche.module';
import { ListeModule } from './liste/liste.module';
import { ListeComponent } from './liste/liste.component';
import { SucheComponent } from './suche/suche.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImpressumComponent } from './impressum/impressum.component';
import { ErgebnisComponent } from './suche/ergebnis/ergebnis.component';
import { EinzelteileAnzeigenComponent } from './suche/ergebnis/einzelteile-anzeigen/einzelteile-anzeigen.component';
import { AuthComponent } from './auth/auth.component';
import { CommonModule} from "@angular/common";
import { OverlayModule } from "@angular/cdk/overlay";
import { RechtlichesComponent } from './rechtliches/rechtliches.component';


export const routes: Routes = [
  {path: '', redirectTo: 'suche', pathMatch: 'full'},
  {path: 'liste', component: ListeComponent},
  {path: 'suche', component: SucheComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'suche/ergebnis', component: ErgebnisComponent},
  {path: 'suche/ergebnis/einzelteile-anzeigen', component: EinzelteileAnzeigenComponent},
  {path: 'login', component: AuthComponent},
  {path: 'rechtliches', component: RechtlichesComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ImpressumComponent,
    AuthComponent,
    RechtlichesComponent
  ],
  imports: [
    BrowserModule,
    ListeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes),
    SucheModule,
    OverlayModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
