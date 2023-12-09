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
  /*shop 1(0,3)
    shop 2(1,4)
    shop 3(2,5)
   */
  ist_geclickt: boolean[] = [false,false,false, false,false,false];

  clicked_shop: number = 0;

  eingabe: string = '';

  minfiguren_zeigen:boolean = false;

  filter_kategorien:Set<string> = new Set<string>(["Figure, Heads And Masks",
      "Figure Accessories, Upper And Lower Body",
      "Figure, Head Clothing",
      "Figure, Special",
      "Figures, Special",
      "Figures",
      "Duplo Figures",
      "Figure, Accessories For The Upper And Lower Part",
      "Figure, Head And Clothing",
      "Figure, Accessories, Shells W/ Ballsnap",
      "Figure, Theme",
      "Figure, Wigs",
      "Figure Parts",
      "Figure Accessories, Upper And Lower Part"]);

  constructor(private datenService: DatenService, private suche: SucheComponent) {

    this.datenService.eingabeSpeicher$.subscribe((eingabe) => {
      this.suchanfrage = eingabe;
    });

  }
  set_clicked_shop(id:number) {

    for(let i = 0; i < this.ist_geclickt.length; i++) {
      if(i == id) {
        this.ist_geclickt[id] = !this.ist_geclickt[id];
      }else {
        this.ist_geclickt[i] = false;
      }
    }


    this.clicked_shop = id;
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
    let setPreis:string ="Nicht Verfügbar";
    if(this.suche.lego_set.preis!= null) {
      setPreis = this.suche.lego_set.preis.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
    }
    return setPreis;
  }




  getShopName1() {
    return this.suche.lego_set.shops[0].shop_name;
  }

  getShopUrl1() {
    return this.suche.lego_set.shops[0].anbieter_url;

  }


  getShopName2() {
    return this.suche.lego_set.shops[1].shop_name;
  }

  getShopUrl2() {
    return this.suche.lego_set.shops[1].anbieter_url;

  }


  getShopName3() {
    return this.suche.lego_set.shops[2].shop_name.substring(0,9) + " "
      + this.suche.lego_set.shops[2].shop_name.substring(9,this.suche.lego_set.shops[2].shop_name.length);
  }

  getShopUrl3() {
    return this.suche.lego_set.shops[2].anbieter_url;

  }

  toggle_minfiguren_zeigen() {
    this.minfiguren_zeigen = !this.minfiguren_zeigen;
    if(this.minfiguren_zeigen){

        this.filter_kategorien = new Set<string>([]);

    }else {
      this.filter_kategorien = new Set<string>(["Figure, Heads And Masks",
          "Figure Accessories, Upper And Lower Body",
          "Figure, Head Clothing",
          "Figure, Special",
          "Figures, Special",
          "Figures",
          "Duplo Figures",
          "Figure, Accessories For The Upper And Lower Part",
          "Figure, Head And Clothing",
          "Figure, Accessories, Shells W/ Ballsnap",
          "Figure, Theme",
          "Figure, Wigs",
          "Figure Parts",
          "Figure Accessories, Upper And Lower Part"]);
    }
  }


  getEinzelteilAnzahl():number {
    let einzelteil_anzahl = 0;
    for(let i = 0; i < this.suche.lego_set.shops[0].einzelteile.length;  i++) {
      if(!this.filter_kategorien.has(this.suche.lego_set.shops[0].einzelteile[i].kategorie)) {
        einzelteil_anzahl = einzelteil_anzahl + this.suche.lego_set.shops[0].einzelteile[i].anzahl;
      }
    }
    return einzelteil_anzahl;
  }

  getEinzelteilpreis(shop_id:number): string{

    let preis: number = 0.0;
    for(let i = 0; i < this.suche.lego_set.shops[shop_id].einzelteile.length; i++){
      if(this.suche.lego_set.shops[shop_id].einzelteile[i].preis != null
        && ! this.filter_kategorien.has(this.suche.lego_set.shops[shop_id].einzelteile[i].kategorie)) {
        preis = preis + (this.suche.lego_set.shops[shop_id].einzelteile[i].preis
          * this.suche.lego_set.shops[shop_id].einzelteile[i].anzahl);
      }

    }
    return preis.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  }
  getVerfuegbareEinzelteile(shop_id:number):number {
    let einzelteil_anzahl = 0;
    for(let i = 0; i < this.suche.lego_set.shops[shop_id].einzelteile.length;  i++) {
      if(this.suche.lego_set.shops[shop_id].einzelteile[i].preis != null
          && ! this.filter_kategorien.has(this.suche.lego_set.shops[shop_id].einzelteile[i].kategorie)) {
        einzelteil_anzahl = einzelteil_anzahl + this.suche.lego_set.shops[shop_id].einzelteile[i].anzahl;
      }
    }
    return einzelteil_anzahl;

  }
  getEinzelteileMitPreis(shop_id: number): Einzelteil[] {


    const einzelteile:Einzelteil[] = [];

    for(let i = 0; i < this.shops[shop_id].einzelteile.length; i++) {
      if(this.shops[shop_id].einzelteile[i].preis != null
          && ! this.filter_kategorien.has(this.suche.lego_set.shops[shop_id].einzelteile[i].kategorie)) {
        einzelteile.push(this.shops[shop_id].einzelteile[i]);
      }

    }
    return einzelteile;
  }


  getEinzelteileOhnePreis(shop_id: number): Einzelteil[] {
    const einzelteile:Einzelteil[] = [];

    for(let i = 0; i < this.shops[shop_id % 3].einzelteile.length; i++) {
      if(this.shops[shop_id % 3].einzelteile[i].preis == null
          && ! this.filter_kategorien.has(this.suche.lego_set.shops[shop_id].einzelteile[i].kategorie)) {
        einzelteile.push(this.shops[shop_id % 3].einzelteile[i]);
      }

    }

    return einzelteile;
  }

  getEinzelteilVolstaendigkeit(shop_id:number):number {
    return this.getVerfuegbareEinzelteile(shop_id) / this.getEinzelteilAnzahl() * 100;
  }





  ngOnInit() {

  }

}
