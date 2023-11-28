import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { Einzelteil, LegoSet, Shop } from "./datenstrukturen";
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
  readonly apiurl ="http://192.168.198.47:8000";
  eingabeWert:string ='';
  lego_set:LegoSet = new LegoSet("null","null",1,[]);

  img:string = '';
  eingabeSpeicher: string = '';
  ist_geclickt:boolean=false;

constructor(private http: HttpClient, private router: Router, private datenService: DatenService, private apiService: ApiService){}

  getSuchList() {
    console.log(this.eingabeWert);
    // return this.http.get("http://192.168.198.47:8000/eingabe/?id="+ this.eingabeWert, {headers:this.apiService.getAuthHeaders()});

    return this.http.get(this.apiurl + "/eingabe/?id="+ this.eingabeWert, {headers:this.apiService.getAuthHeaders()});
    // return this.http.get("https://raw.githubusercontent.com/HannesScherer/DarkProjekt-master-main/main/10316.json");
  }

  //gibt die Json zurück mit den Suchvorschlägen zur aktuellen Eingabe
  getVorschlaege() {

    return this.http.get(this.apiurl + "/eingabe/?name=" + this.eingabeWert);

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


  //Methode zum Updaten der Vorschlagsliste
  updateVorschlaege() {


    // @ts-ignore
    const table = document.getElementById("vorschlaege");


    if (this.eingabeWert.length > 2 && isNaN(Number(this.eingabeWert))) {
      this.isOpen = true;
      this.getVorschlaege().subscribe(data => {

        this.clearSuggestions();

        const parsed_data = JSON.parse(JSON.stringify(data));
        // @ts-ignore

        for (let i = 0; i < Math.min(parsed_data.length, 5); i++) {

          const tr = document.createElement("tr");
          const td_button = document.createElement("td");

          const img = document.createElement("img");
          img.src = "data:image/jpg;base64," + parsed_data[i].set_bild;
          img.width = 150;
          img.height = 100;
          img.setAttribute("style","margin-left:10px;");
          img.className = "suggestion_img";

          const set_button = document.createElement("a");
          tr.appendChild(img);
          set_button.addEventListener("click", () => {

            this.clickSuggestion(parsed_data[i].set_id)
          });

          // set_button.className = "vorschlag_link";
          set_button.innerHTML = parsed_data[i].set_id + " " + parsed_data[i].set_name;
          td_button.appendChild(set_button)


          tr.appendChild(td_button);
          // @ts-ignore
          table.appendChild(tr);
        }

      })
    } else {
      this.clearSuggestions();
      this.isOpen = false;
    }


  }
  //löscht alle Vorschläge
  clearSuggestions() {


    const table = document.getElementById("vorschlaege");
    // @ts-ignore
    while (table.lastElementChild) {
      // @ts-ignore
      table.lastElementChild.remove();
    }

  }

//methode zur ausführung einer Suche aus den Vorschlägen
  clickSuggestion(clicked_set: string) {
    this.clearSuggestions();
    this.eingabeWert = clicked_set;
    this.pruefeEingabe();
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
      const einzelteil:Einzelteil = new Einzelteil(item.einzelteil_id,item.preis,item.anzahl, item.url);
      lego_einzelteile.push(einzelteil);
    })
    const lego_shop:Shop = new Shop(data[1].shop_name, data[1].shop_url, lego_einzelteile);


    const toypro_einzelteile:Einzelteil[] = [];
    data[2].parts.forEach((item:any) => {
      const einzelteil:Einzelteil = new Einzelteil(item.einzelteil_id,item.preis,item.anzahl, item.url);
      toypro_einzelteile.push(einzelteil);
    })
    const toypro_shop:Shop = new Shop(data[2].shop_name, data[2].shop_url, toypro_einzelteile);


    const bricklink_einzelteile:Einzelteil[] = [];
    data[3].parts.forEach((item:any) => {
      const einzelteil:Einzelteil = new Einzelteil(item.einzelteil_id,item.preis,item.anzahl, item.url);
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

