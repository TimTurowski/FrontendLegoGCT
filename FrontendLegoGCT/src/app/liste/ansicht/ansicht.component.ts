import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../api.service";
import {SucheComponent} from "../../suche/suche.component";

@Component({
  selector: 'app-ansicht',
  templateUrl: './ansicht.component.html',
  styleUrls: ['./ansicht.component.scss']
})
export class AnsichtComponent implements OnInit {
  @Input() legoSet: any;
  @Input() legoSets = [];
  @Output() deletedSet = new EventEmitter();
  @Output() selectLegoSet = new EventEmitter();
  clickedSets:Set<string> = new Set<string>();
  private _lastdate: string = "";
  bilder: Map<string, string> = new Map();


  constructor(private router: Router,
              private httpClient: HttpClient,
              private apiService: ApiService,
              private suche: SucheComponent,
              private http: HttpClient

  ){

  }

  async ngOnInit() {
    await this.http.get("./assets/config.json").toPromise().then(data => {
      this.suche.apiUrl = JSON.parse(JSON.stringify(data)).config.DjangoURL;
    });
  }
  deleteSet(set: any){
    this.deletedSet.emit(set);
  }
  legoSetClicked(set: any){
    this.clickedSets.add(set["set_id"]);
    this.selectLegoSet.emit(set);
  }
  neueSuche() {
      this.router.navigate(['suche']);
  }

  erneutSuchen(set_id:string) {
    localStorage.setItem("verlaufSuche", set_id);
    this.router.navigate(['suche']);
  }

  setlastdate(value: string) {
        this._lastdate = value;
    }

  /**
  * Methode zum Zurückgeben des formatierten Datums
  * @param date_string unformatiertes Datum
  */
  getDay(date_string:string) {
    const date = new Date(date_string);
      return date.getDate()+"."+ date.getMonth()+"." + date.getFullYear();
  }

  /**
   * Gibt einen boolean an, ob das Element von einem neuen Tag ist
   * @param date_string unformatiertes Datum
   */
  isNewDay(date_string:string) {
    let date:Date = new Date(date_string);

    return date.getDate() != new Date(this._lastdate).getDate();

  }

  /**
   * Diese Methode fordert alle bilder der angeklickten Sets an.
   */
  getSetBilder() {
    //clicktSets ist Set mit allen geklickten Sets
    const ids = Array.from(this.clickedSets);
    ids.forEach(a => {
      // prüft, ob das Bild bereits geladen wurde
      if (!this.bilder.has(a)) {
        //läd Bild aus der Datenbank
        this.suche.getBild(a).subscribe(data => {

          const parsed_data = JSON.parse(JSON.stringify(data));
          this.bilder.set(a, parsed_data.set_bild);
        });
      }
    });
  }






  protected readonly console = console;
}
