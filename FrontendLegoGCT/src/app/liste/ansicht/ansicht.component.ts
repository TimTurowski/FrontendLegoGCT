import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {SucheComponent} from "../../suche/suche.component";
import {LegoSet, Shop} from "../../suche/datenstrukturen";

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

  bilder: Map<string, string> = new Map();
  private _lastdate: string = "";
  
  selectedLegoSet = [];
  selectedLegoSetDetails:Shop[] =  [];


  constructor(private router: Router, private suche: SucheComponent){

  }

  ngOnInit() {}
  getSetBild(set_id: string) {
    let bild: string = "../assets/placeholder-image.png";
    // prüft, ob das Bild bereits geladen wurde
    if (!this.bilder.has(set_id)) {
        //läd Bild aus der Datenbank
        this.suche.getBild(set_id).subscribe(data => {

            const parsed_data = JSON.parse(JSON.stringify(data));
            this.bilder.set(set_id, parsed_data.set_bild);
        });
    } else {
        //holt das Bild aus dem Cache
        // @ts-ignore
        if(this.bilder.get(set_id) != " ") {
            bild = "data:image/jpg;base64," + this.bilder.get(set_id);
        }
    }
    return bild;
  }

    /**
     * erzeugt eine Textuelle Darstellung des Datums
     * @param raw_date Json darstellung des Suchzeitpunkts
     */
    getSucheDate(raw_date:string) {
      const date:Date = new Date(raw_date);
      return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
  }

  /**
   * erzeugt eine Textuelle Darstellung der Suchuhrzeit
   * @param raw_date Json darstellung des Suchzeitpunkts
   */
  getSucheTime(raw_date:string) {
      const date:Date = new Date(raw_date);
      return date.getHours() + ":" + date.getMinutes();
  }


  deleteSet(set: any){
    this.deletedSet.emit(set);
    var element = document.getElementById("buttonZeile");
    element?.remove();
  }
  legoSetClicked(set: any){
      this.selectLegoSet.emit(set);

      
  }
  
  neueSuche() {
      this.router.navigate(['suche']);
  }
  setlastdate(value: string) {
        this._lastdate = value;
    }

  getDay(date_string:string) {
    const date = new Date(date_string);
      return date.getDate()+"."+ date.getMonth()+"." + date.getFullYear();
  }
  isNewDay(date_string:string) {
    let date:Date = new Date(date_string);

    return date.getDate() != new Date(this._lastdate).getDate();

  }
  


  protected readonly console = console;
}
