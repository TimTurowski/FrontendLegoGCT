import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss']
})
export class ImpressumComponent implements OnInit{

  private _name:string = "";
  private _strasse:string = "";
  private _ort:string = "";
  private _telefon:string = "";
  private _eMail:string = "";
  constructor(
      private httpClient: HttpClient){}

  /**
   * laden der Impressumsinformationen aus der Konfigurationsdatei
   */
  ngOnInit(): void {

    this.httpClient.get("./assets/config.json").subscribe(data=>{
      console.log(data);
          this._name = JSON.parse(JSON.stringify(data)).impressum.name;
          this._strasse = JSON.parse(JSON.stringify(data)).impressum.strasse;
          this._ort = JSON.parse(JSON.stringify(data)).impressum.ort;
          this._telefon = JSON.parse(JSON.stringify(data)).impressum.telefon;
          this._eMail = JSON.parse(JSON.stringify(data)).impressum.eMail;
        }

    );
  }
  get name(): string {
    return this._name;
  }

  get strasse(): string {
    return this._strasse;
  }

  get ort(): string {
    return this._ort;
  }

  get telefon(): string {
    return this._telefon;
  }

  get eMail(): string {
    return this._eMail;
  }

}
