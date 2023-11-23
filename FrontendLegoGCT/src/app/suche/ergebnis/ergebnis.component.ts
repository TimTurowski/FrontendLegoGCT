import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DatenService} from 'src/app/datenservice.service';
import {Einzelteil, LegoSet, Shop} from '../datenstrukturen';
import {SucheComponent} from '../suche.component';

@Component({
  selector: 'app-ergebnis',
  templateUrl: './ergebnis.component.html',
  styleUrls: ['./ergebnis.component.scss']
})
export class ErgebnisComponent implements OnInit {
  @Input()shops: Shop[] = []
  suchanfrage: string = '';
  suchergebnis: any;
  url: string = '/assets/suchergebniss.json';
  ist_geclickt: boolean = false;
  clicked_shop: number = 0;

  eingabe: string = '';

  constructor(private datenService: DatenService, private suche: SucheComponent) {

    this.datenService.eingabeSpeicher$.subscribe((eingabe) => {
      this.suchanfrage = eingabe;
    });

  }
  set_clicked_shop(shop_id:number) {
    this.ist_geclickt = true;
    this.clicked_shop = shop_id;
  }

  getImg() {
    return this.suche.img;
  }

  getName() {
    return this.suche.lego_set.set_name;
  }

  getId() {
    return this.suche.lego_set.set_id;
  }

  getPreis() {
    return this.suche.lego_set.preis;
  }


  getEinzelteile(): boolean {
    this.ist_geclickt = true;
    return this.ist_geclickt;
  }

  getShopName1() {
    return this.suche.lego_set.shops[0].shop_name;
  }

  getShopUrl1() {
    return this.suche.lego_set.shops[0].anbieter_url;

  }

  getVerfuegbareEinzelteile1() {
    return this.suche.lego_set.shops[1].einzelteile;
  }

  getShopName2() {
    return this.suche.lego_set.shops[1].shop_name;
  }

  getShopUrl2() {
    return this.suche.lego_set.shops[1].anbieter_url;

  }

  getVerfuegbareEinzelteile2() {
    return this.suche.lego_set.shops[1].einzelteile;
  }

  getShopName3() {
    return this.suche.lego_set.shops[2].shop_name;
  }

  getShopUrl3() {
    return this.suche.lego_set.shops[2].anbieter_url;

  }

  getEinzelteilAnzahl():number {
    let einzelteil_anzahl = 0;
    for(let i = 0; i < this.suche.lego_set.shops[0].einzelteile.length;  i++) {
      einzelteil_anzahl = einzelteil_anzahl + this.suche.lego_set.shops[0].einzelteile[i].anzahl;
    }
    return einzelteil_anzahl;
  }

  getEinzelteilpreis(shop_id:number): string{

    let preis: number = 0.0;
    for(let i = 0; i < this.suche.lego_set.shops[shop_id].einzelteile.length; i++){
      if(this.suche.lego_set.shops[shop_id].einzelteile[i].preis != null) {
        preis = preis + (this.suche.lego_set.shops[shop_id].einzelteile[i].preis
          * this.suche.lego_set.shops[shop_id].einzelteile[i].anzahl);
      }

    }
    return preis.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  }
  getVerfuegbareEinzelteile(shop_id:number):number {
    let einzelteil_anzahl = 0;
    for(let i = 0; i < this.suche.lego_set.shops[shop_id].einzelteile.length;  i++) {
      if(this.suche.lego_set.shops[shop_id].einzelteile[i].preis != null) {
        einzelteil_anzahl = einzelteil_anzahl + this.suche.lego_set.shops[shop_id].einzelteile[i].anzahl;
      }
    }
    return einzelteil_anzahl;

  }



  show_prices(shop_id: number) {
    this.clear_prices();

    console.log(shop_id);

    const table = document.getElementById("einzelteil_liste");
    const failed_table = document.getElementById("einzelteil_liste_failed");

    const head_tr  = document.createElement("tr");
    const head_tr_failed  = document.createElement("tr");

    const th_id = document.createElement("th");
    th_id.innerHTML = "Id";
    const th_anzahl = document.createElement("th");
    th_anzahl.innerHTML = "Anzahl";
    const th_preis = document.createElement("th");
    th_preis.innerHTML = "Preis";

    head_tr.appendChild(th_id);
    head_tr.appendChild(th_anzahl);
    head_tr.appendChild(th_preis);

    const th_id_failed = document.createElement("th");
    th_id_failed.innerHTML = "Id";
    const th_anzahl_failed = document.createElement("th");
    th_anzahl_failed.innerHTML = "Anzahl";

    head_tr_failed.appendChild(th_id_failed);
    head_tr_failed.appendChild(th_anzahl_failed);
    // @ts-ignore
    failed_table.appendChild(head_tr_failed);
    // @ts-ignore
    table.appendChild(head_tr);


    for (let i = 0; i < this.suche.lego_set.shops[shop_id].einzelteile.length; i++) {

      if (this.suche.lego_set.shops[shop_id].einzelteile[i].preis != null) {
        const tr = document.createElement("tr");
        const td_id = document.createElement("td");
        td_id.innerText = this.suche.lego_set.shops[shop_id].einzelteile[i].einelteil_id;

        const td_anzahl = document.createElement("td");
        td_anzahl.innerText = String(this.suche.lego_set.shops[shop_id].einzelteile[i].anzahl) +"x";

        const td_preis = document.createElement("td");
        td_preis.innerText = this.suche.lego_set.shops[shop_id].einzelteile[i]
          .preis.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

        tr.appendChild(td_id);
        tr.appendChild(td_anzahl);
        tr.appendChild(td_preis);
        // @ts-ignore
        table.appendChild(tr);
      }else {
        const tr = document.createElement("tr");
        const td_id = document.createElement("td");
        td_id.innerText = this.suche.lego_set.shops[shop_id].einzelteile[i].einelteil_id;

        const td_anzahl = document.createElement("td");
        td_anzahl.innerText = String(this.suche.lego_set.shops[shop_id].einzelteile[i].anzahl);



        tr.appendChild(td_id);
        tr.appendChild(td_anzahl);
        // @ts-ignore
        failed_table.appendChild(tr);

      }
    }
  }

  clear_prices() {
    const table = document.getElementById("einzelteil_liste");

    // @ts-ignore
    while (table.lastElementChild) {
      // @ts-ignore
      table.lastElementChild.remove();
    }
    const failed_table = document.getElementById("einzelteil_liste_failed");

    // @ts-ignore
    while (failed_table.lastElementChild) {
      // @ts-ignore
      failed_table.lastElementChild.remove();
    }
  }

  ngOnInit() {

  }

  /*
  protected readonly localStorage = localStorage;
  protected readonly JSON = JSON;
  */
}
