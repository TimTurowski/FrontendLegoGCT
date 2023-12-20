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
  legoBild = './assets/LEGO_logo.svg.png';
  toyProBild = './assets/ToyPro.webp';
  brickLink = './assets/BrickLink_logo-inverted.webp';
  url: string = '/assets/suchergebniss.json';
  /*shop 1(0,3)
    shop 2(1,4)
    shop 3(2,5)
   */
  ist_geclickt: boolean[] = [false,false,false, false,false,false];

  clicked_shop: number = 0;

  eingabe: string = '';

  minfiguren_zeigen:boolean = false;

  // alle Kategorien, welche als Minifigur Teil gefiltert werden
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

  /**
   * Methode zum Auswählen eines Shops
   * @param id id des Shops 0: Lego; 1: Toypro; 2: Bricklink
   */
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

  /**
   * gibt bild des gesuchten Sets als Base64
   */
  getImg() {
    let bild:string = "../assets/placeholder-image.png";
    if(this.suche.img != undefined) {
      bild = "data:image/jpg;base64," + this.suche.img;
    }
    return bild;
  }

  /**
   * gibt namen des gesuchten Sets
   */
  getName() {
    return this.suche.lego_set.set_name;
  }

  /**
   * gibt die ID des gesuchten Sets
   */
  getId() {
    return this.suche.lego_set.set_id;
  }

  /**
   * gibt den Preis des Gescuhten Sets
   */
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


  /**
   * ändert den Modus ob Minifigurenteile angezeigt werden
   */
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


  /**
   * Methode zur Ausgabe der Einzelteilanzahl
   */
  getEinzelteilAnzahl():number {
    let einzelteil_anzahl = 0;
    for(let i = 0; i < this.suche.lego_set.shops[0].einzelteile.length;  i++) {
      if(!this.filter_kategorien.has(this.suche.lego_set.shops[0].einzelteile[i].kategorie)) {
        einzelteil_anzahl = einzelteil_anzahl + this.suche.lego_set.shops[0].einzelteile[i].anzahl;
      }
    }
    return einzelteil_anzahl;
  }

  /**
   * gibt den Gesammtpreis der Einzelteile aus
   * @param shop_id id des Shops 0: Lego; 1: Toypro; 2: Bricklink
   */
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

  /**
   * gibt die Anzahl aller verfügbaren Einzelteile
   * @param shop_id id des Shops 0: Lego; 1: Toypro; 2: Bricklink
   */
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

  /**
   * gibt eine Liste mit allen verfügbaren Einzelteilen
   * @param shop_id id des Shops 0: Lego; 1: Toypro; 2: Bricklink
   */
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

  /**
   * Gibt alle Einzelteil aus, welche nicht in diesen Shop angeboten werden
   * @param shop_id id des Shops 0: Lego; 1: Toypro; 2: Bricklink
   */
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

  /**
   * Gibt die Vollständigkeit der Einzelteile des Shops aus
   * @param shop_id id des Shops 0: Lego; 1: Toypro; 2: Bricklink
   */
  getEinzelteilVolstaendigkeit(shop_id:number):number {
    return this.getVerfuegbareEinzelteile(shop_id) / this.getEinzelteilAnzahl() * 100;
  }

  /**
   * Methode gibt das style attribut für die Progressbar
   * @param shop_id id des Shops 0: Lego; 1: Toypro; 2: Bricklink
   */
  getProgressAttribut(shop_id:number):string {
    let vollstaendigkeit:number = this.getVerfuegbareEinzelteile(shop_id) / this.getEinzelteilAnzahl()
    let color = "";
    if(vollstaendigkeit < 0.33) {
      color = "#DB1500"
    } else if(vollstaendigkeit >= 0.33 && vollstaendigkeit < 0.66) {
      color = "#DBD900"
    } else {
      color = "#01DB41"

    }/*
      rot #DB635C
      gelb #DBD27E
      grün#7EDB78

       */

    return " stroke-dashoffset:" + (450- (450 *vollstaendigkeit)) +
        ";stroke:" + color + "; filter: drop-shadow(0 0 5px " + color + ")"
  }





  ngOnInit() {

  }

}
