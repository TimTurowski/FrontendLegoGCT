import {Component, Input} from '@angular/core';
import {VorschlagElement} from "../datenstrukturen";
import {SucheComponent} from "../suche.component";

@Component({
  selector: 'app-such-vorschlaege',
  templateUrl: './such-vorschlaege.component.html',
  styleUrls: ['./such-vorschlaege.component.scss']
})
export class SuchVorschlaegeComponent {
  constructor(suche:SucheComponent) {
    this.suche = suche;
  }
    suche;
  @Input()vorschlaege:VorschlagElement[] = [];
  @Input()bilder:Map<string, string> = new Map();

  getBild(set_id:string):string{
    let bild:string = "./assets/placeholder-image.png";
    if(this.bilder.has(set_id)) {
      // @ts-ignore
        if (this.bilder.get(set_id) != " ") {
        bild = "data:image/jpg;base64," + this.bilder.get(set_id);
        }
    }
    return bild;
  }

}
