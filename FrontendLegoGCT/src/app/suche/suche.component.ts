import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { Einzelteil, LegoSet, Shop } from "./datenstrukturen";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatenService } from '../datenservice.service';

@Component({
  selector: 'app-suche',
  templateUrl: './suche.component.html',
  styleUrls: ['./suche.component.scss']
})

export class SucheComponent implements OnInit{

  legoSetMap = new Map<string, any>();
  readonly apiurl ="localhost:8000";
  eingabeWert:string ='';
  lego_set:LegoSet = new LegoSet("null","null",1,[]);
  
  img:string = '';
  eingabeSpeicher: string = '';
  ist_geclickt:boolean=false;

constructor(private http: HttpClient, private router: Router, private datenService: DatenService){}

  getSuchList() {
    // return this.http.get("http://localhost:8000/eingabe/?id="+ this.eingabeWert);
    return this.http.get("https://raw.githubusercontent.com/HannesScherer/DarkProjekt-master-main/main/10316.json");
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

  pruefeEingabe() {
    this.ist_geclickt = true;
    this.datenService.updateEingabeSpeicher(this.eingabeWert);
    this.eingabeSpeicher = this.eingabeWert;
    this.router.navigate(['/suche/ergebnis']);
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
      lego_einzelteile.push(einzelteil);
    })
    const toypro_shop:Shop = new Shop(data[2].shop_name, data[2].shop_url, lego_einzelteile);


    const bricklink_einzelteile:Einzelteil[] = [];
    data[3].parts.forEach((item:any) => {
      const einzelteil:Einzelteil = new Einzelteil(item.einzelteil_id,item.preis,item.anzahl, item.url);
      lego_einzelteile.push(einzelteil);
    })
    this.img = data[4];


    const bricklink_shop:Shop = new Shop(data[3].shop_name, data[3].shop_url, lego_einzelteile);
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

