import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import {Einzelteil, LegoSet, Shop, VorschlagElement} from "./datenstrukturen";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatenService } from '../datenservice.service';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-suche',
  templateUrl: './suche.component.html',
  styleUrls: ['./suche.component.scss']
})
@Injectable({
    providedIn: 'root'
})

export class SucheComponent implements OnInit{
  isOpen = false;

  legoSetMap = new Map<string, any>();
  //Url für die Django Api
  //http://192.168.198.47:8000 http://localhost:8000
  readonly apiurl ="http://localhost:8000";
  eingabeWert:string ='';
  lego_set:LegoSet = new LegoSet("null","null",1,[]);

  img:string = '';
  eingabeSpeicher: string = '';
  ist_geclickt:boolean=false;
  vorschlaege_liste:VorschlagElement[] = [];
  vorschlaege_bilder:Map<string, string> = new Map();


constructor(private http: HttpClient, private router: Router, private datenService: DatenService, private apiService: ApiService){}

  getSuchList() {
    console.log(this.eingabeWert);
    // return this.http.get("http://192.168.198.47:8000/eingabe/?id="+ this.eingabeWert, {headers:this.apiService.getAuthHeaders()});

    return this.http.get(this.apiurl + "/eingabe/?id="+ this.eingabeWert, {headers:this.apiService.getAuthHeaders()});
    // return this.http.get("https://raw.githubusercontent.com/HannesScherer/DarkProjekt-master-main/main/10320.json");
  }

  //gibt die Json zurück mit den Suchvorschlägen zur aktuellen Eingabe
  getVorschlaege() {
    //toPromis sichert zu das alle daten empfangen wurden
    return this.http.get(this.apiurl + "/eingabe/?name=" + this.eingabeWert).toPromise();

  }

  getBild(set_id:string) {
    return this.http.get(this.apiurl + "/bild/?id=" + set_id);
  }
  addSuchList(val: any) {
    return this.http.post(this.apiurl + '/suchleiste/' , val);
  }

  updateSuchList(val: any) {
    return this.http.post(this.apiurl + '/suchleiste/' , val);
  }
  deleteSuchLeiste(val: any) {
    return this.http.delete(this.apiurl + '/suchleiste/' + val);
  }

  getAllSuchanfragenName():Observable<any[]>{
    return this.http.get<any[]>(this.apiurl +'/suchleiste/');
  }
  ausgabeInput() {
    console.log(this.eingabeSpeicher);
  }


  getShops(): Shop[] {
    return this.lego_set.shops;

  }

  async getVorschlaegListe() {

  if(this.eingabeWert.length > 2) {
      this.isOpen = true;
      let vorschlaege_liste:VorschlagElement[] = [];
      await this.getVorschlaege().then(data => {
          const parsed_data = JSON.parse(JSON.stringify(data));
          parsed_data.forEach((item:any) =>{
              vorschlaege_liste.push(new VorschlagElement(item.set_name,item.set_id,item.set_bild));

          });
      });
      this.vorschlaege_liste = vorschlaege_liste;
      this.getBilder(vorschlaege_liste);
  }

  }

  getBilder(vorschlaege:VorschlagElement[]) {
    console.log(vorschlaege.length);

    for(let item of vorschlaege) {


      if(!this.vorschlaege_bilder.has(item.set_id)) {
        this.getBild(item.set_id).subscribe(
            data => {
              const parsed_data = JSON.parse(JSON.stringify(data));
              this.vorschlaege_bilder.set(item.set_id, parsed_data.set_bild);});
      }
    }

  }



//methode zur ausführung einer Suche aus den Vorschlägen
  clickSuggestion(clicked_set: string) {
    // this.clearSuggestions();
    this.eingabeWert = clicked_set;
    this.pruefeEingabe();
    this.isOpen = false;
  }


  pruefeEingabe() {
    this.ist_geclickt = true;
    this.datenService.updateEingabeSpeicher(this.eingabeWert);
    this.eingabeSpeicher = this.eingabeWert;

    this.getSuchList().subscribe(data =>{
     this.jsonVerarbeiter(data);
      console.log(data);
      localStorage.setItem("set_id", JSON.parse(JSON.stringify(data))[1].parts[0].preis)
      }

    );


  }
  löscheEingabe() {
    this.legoSetMap.clear();
  }

  jsonVerarbeiter(data: any): void {
    const lego_einzelteile:Einzelteil[] = [];
    data[1].parts.forEach((item:any) => {
      const einzelteil:Einzelteil = new Einzelteil(item.einzelteil_id,item.preis,item.anzahl, item.url,item.beschreibung,item.kategorie,item.farbe);
      lego_einzelteile.push(einzelteil);
    })
    const lego_shop:Shop = new Shop(data[1].shop_name, data[1].shop_url, lego_einzelteile);


    const toypro_einzelteile:Einzelteil[] = [];
    data[2].parts.forEach((item:any) => {
      const einzelteil:Einzelteil = new Einzelteil(item.einzelteil_id,item.preis,item.anzahl, item.url,item.beschreibung,item.kategorie,item.farbe);
      toypro_einzelteile.push(einzelteil);
    })
    const toypro_shop:Shop = new Shop(data[2].shop_name, data[2].shop_url, toypro_einzelteile);


    const bricklink_einzelteile:Einzelteil[] = [];
    data[3].parts.forEach((item:any) => {
      const einzelteil:Einzelteil = new Einzelteil(item.einzelteil_id,item.preis,item.anzahl, item.url,item.beschreibung,item.kategorie,item.farbe);
      bricklink_einzelteile.push(einzelteil);
    })
    this.img = data[4].set_bild;


    const bricklink_shop:Shop = new Shop(data[3].shop_name, data[3].shop_url, bricklink_einzelteile);
    const shops:Shop[] = [];
    shops.push(lego_shop);
    shops.push(toypro_shop);
    shops.push(bricklink_shop);
    const lego_set:LegoSet = new LegoSet(data[0].set_id, data[0].set_name, data[0].preis, shops);
    console.log(lego_set);
    localStorage.setItem("set", JSON.stringify(lego_set));
    this.lego_set = lego_set;
    sessionStorage.setItem("set",this.JSON.stringify(lego_set))


  }

  ngOnInit() {}

  protected readonly JSON = JSON;
  protected readonly localStorage = localStorage;
}

