import {Component, Input} from '@angular/core';
import {Einzelteil} from "../../datenstrukturen";

@Component({
  selector: 'app-fehlende-einzelteile-anzeigen',
  templateUrl: './fehlende-einzelteile-anzeigen.component.html',
  styleUrls: ['./fehlende-einzelteile-anzeigen.component.scss']
})
export class FehlendeEinzelteileAnzeigenComponent {
  @Input()einzelteile:Einzelteil[] = [];
  @Input()shop_id:number = 0;
  @Input()einzelteile_lego:Einzelteil[] = [];
  @Input()einzelteile_toypro:Einzelteil[] = [];
  @Input()einzelteile_bricklink:Einzelteil[] = [];

  andereShops(einzelteil_id:string):string {
    let andere_shops:string = "";
    if(this.shop_id == 0) {
      let toypro_ids = this.einzelteile_toypro.map(a => a.einelteil_id);
      let bricklink_ids = this.einzelteile_bricklink.map(a => a.einelteil_id);

      if(toypro_ids.includes(einzelteil_id)) {
        andere_shops = andere_shops + "Toypro "
      }
      if(bricklink_ids.includes(einzelteil_id)) {
        andere_shops = andere_shops + "Bricklink "
      }
    }
    if(this.shop_id == 1) {
      let lego_ids = this.einzelteile_lego.map(a => a.einelteil_id);
      let bricklink_ids = this.einzelteile_bricklink.map(a => a.einelteil_id);

      if(lego_ids.includes(einzelteil_id)) {
        andere_shops = andere_shops + "Lego "
      }
      if(bricklink_ids.includes(einzelteil_id)) {
        andere_shops = andere_shops + "Bricklink "
      }

    }
    if(this.shop_id == 2) {
      let lego_ids = this.einzelteile_lego.map(a => a.einelteil_id);
      let toypro_ids = this.einzelteile_toypro.map(a => a.einelteil_id);

      if(lego_ids.includes(einzelteil_id)) {
        andere_shops = andere_shops + "Lego "
      }
      if(toypro_ids.includes(einzelteil_id)) {
        andere_shops = andere_shops + "Toypro "
      }

    }


    return andere_shops;

  }



}
