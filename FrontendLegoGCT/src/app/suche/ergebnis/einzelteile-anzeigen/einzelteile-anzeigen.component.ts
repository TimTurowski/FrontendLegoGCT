import {Component, Input} from '@angular/core';
import {Einzelteil, Shop} from "../../datenstrukturen";

@Component({
  selector: 'app-einzelteile-anzeigen',
  templateUrl: './einzelteile-anzeigen.component.html',
  styleUrls: ['./einzelteile-anzeigen.component.scss']
})
export class EinzelteileAnzeigenComponent {
  @Input()shops:Shop[] = [];
  @Input()shop_id:number = 0;

  getEinzelteileMitPreis(): Einzelteil[] {

    const einzelteile:Einzelteil[] = [];

    for(let i = 0; i < this.shops[this.shop_id].einzelteile.length; i++) {
      if(this.shops[this.shop_id].einzelteile[i].preis != null) {
        einzelteile.push(this.shops[this.shop_id].einzelteile[i]);
      }

    }

    return einzelteile;
  }
  getEinzelteileOhnePreis(): Einzelteil[] {
    const einzelteile:Einzelteil[] = [];

    for(let i = 0; i < this.shops[this.shop_id].einzelteile.length; i++) {
      if(this.shops[this.shop_id].einzelteile[i].preis == null) {
        einzelteile.push(this.shops[this.shop_id].einzelteile[i]);
      }

    }

    return einzelteile;
  }

}
