import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatenService } from 'src/app/datenservice.service';
import { LegoSet } from '../datenstrukturen';
import { SucheComponent } from '../suche.component';

@Component({
  selector: 'app-ergebnis',
  templateUrl: './ergebnis.component.html',
  styleUrls: ['./ergebnis.component.scss']
})
export class ErgebnisComponent implements OnInit{
  suchanfrage: string ='';
  suchergebnis:any;
  url: string = '/assets/suchergebniss.json';
  ist_geclickt: boolean = false;

  eingabe: string = '';
  constructor(private datenService: DatenService, private suche: SucheComponent) {

    this.datenService.eingabeSpeicher$.subscribe((eingabe) => {
      this.suchanfrage = eingabe;
    });

  }
  getImg(){
    return this.suche.img;
  }

  getName(){
    return this.suche.lego_set.set_name;
  }
  getId(){
    return this.suche.lego_set.set_id;
  }
  getPreis(){
    return this.suche.lego_set.preis;
  }
  getEinzelteilAnzahl() {
    return this.suche.lego_set.einzelteil_anzahl;
  }
  getEinzelteile(): boolean{
    this.ist_geclickt = true;
    return this.ist_geclickt;
  }
  getShopName1(){
    return this.suche.lego_set.shops[0].shop_name;
  }
  getShopUrl1(){
    return this.suche.lego_set.shops[0].anbieter_url;

  }
  getVerfuegbareEinzelteile1(){
    return this.suche.lego_set.shops[1].einzelteile;
  }
  getShopName2(){
    return this.suche.lego_set.shops[1].shop_name;
  }
  getShopUrl2(){
    return this.suche.lego_set.shops[1].anbieter_url;

  }
  getVerfuegbareEinzelteile2(){
    return this.suche.lego_set.shops[1].einzelteile;
  }
  getShopName3(){
    return this.suche.lego_set.shops[2].shop_name;
  }
  getShopUrl3(){
    return this.suche.lego_set.shops[2].anbieter_url;

  }
  getVerfuegbareEinzelteile3(){
    return this.suche.lego_set.shops[2].einzelteile;
  }

  show_prices(shop_name:string) {
    this.clear_prices();
    let shop_id = 0;
    if(shop_name == "Lego") {
      shop_id = 0;
    }else if(shop_name == "Toypro") {
      shop_id = 1;
    }else if(shop_name == "Bricklink") {
      shop_id = 2;
    }
    console.log(shop_id);

    const table = document.getElementById("einzelteil_liste");
    for(let i = 0; i < this.suche.lego_set.shops[shop_id].einzelteile.length; i++) {
      const tr = document.createElement("tr");
      const td_id =document.createElement("td");
      td_id.innerText = this.suche.lego_set.shops[shop_id].einzelteile[i].einelteil_id;

      const td_anzahl =document.createElement("td");
      td_anzahl.innerText = String(this.suche.lego_set.shops[shop_id].einzelteile[i].anzahl);

      const td_preis =document.createElement("td");
      td_preis.innerText = String(this.suche.lego_set.shops[shop_id].einzelteile[i].preis);

      tr.appendChild(td_id);
      tr.appendChild(td_anzahl);
      tr.appendChild(td_preis);
      // @ts-ignore
      table.appendChild(tr);
    }
  }
  clear_prices() {
    const table = document.getElementById("einzelteil_liste");

    // @ts-ignore
    while (table.lastElementChild) {
      // @ts-ignore
      table.lastElementChild.remove();
    }
  }

  ngOnInit() {

  }
  /*
  protected readonly localStorage = localStorage;
  protected readonly JSON = JSON;
  */
}
