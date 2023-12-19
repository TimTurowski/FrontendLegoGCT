import {Component, Input, OnInit} from '@angular/core';
import {Einzelteil, Shop} from "../../datenstrukturen";

@Component({
  selector: 'app-einzelteile-anzeigen',
  templateUrl: './einzelteile-anzeigen.component.html',
  styleUrls: ['./einzelteile-anzeigen.component.scss']
})
export class EinzelteileAnzeigenComponent {

  @Input()einzelteile:Einzelteil[] = [];
  @Input()shop_id:number = 0;
  @Input()einzelteile_lego:Einzelteil[] = [];
  @Input()einzelteile_toypro:Einzelteil[] = [];
  @Input()einzelteile_bricklink:Einzelteil[] = [];
  lego_preise:Map<string,number> = new Map<string,number>();
  toypro_preise:Map<string,number> = new Map<string,number>();
  bricklink_preise:Map<string,number> = new Map<string,number>();


  /**
     * erstellt Maps für die Einzelteillisten der verscheidenden Shops
     */
  createPreisMaps() {
    this.einzelteile_lego.forEach(a => this.lego_preise.set(a.einelteil_id, a.preis));
    this.einzelteile_toypro.forEach(a => this.toypro_preise.set(a.einelteil_id, a.preis));
    this.einzelteile_bricklink.forEach(a => this.bricklink_preise.set(a.einelteil_id, a.preis));

    }


    /**
     * liefert eine Farbliche Markierung für eine Tabellenreihe abhängig von einem Preislichen vergleich mit den anderen
     * Angeboten
     * @param einzelteil_id id des Einzelteils
     * @param einzelteil_preis preis des Einzelteils
     */
  getElementFarbe(einzelteil_id:string, einzelteil_preis:number):string {
    let color = "rgb(117,255,157)";
    const default_color = "rgb(255,255,255)";
    if(this.shop_id == 0) {
      console.log(einzelteil_id);

      if(this.toypro_preise.get(einzelteil_id) != undefined) {

        // @ts-ignore
          if(this.toypro_preise.get(einzelteil_id) < einzelteil_preis) {

              color =  default_color;
        }
      }
      if(this.bricklink_preise.get(einzelteil_id) != undefined) {

          console.log(this.toypro_preise.get(einzelteil_id));

          // @ts-ignore
          if(this.bricklink_preise.get(einzelteil_id) < einzelteil_preis) {

              color =  default_color;
          }
      }
    }
    if(this.shop_id == 1) {

        if(this.lego_preise.get(einzelteil_id) != undefined) {
            // @ts-ignore

            if(this.lego_preise.get(einzelteil_id) < einzelteil_preis) {
                color =  default_color;
            }
        }
        if(this.bricklink_preise.get(einzelteil_id) != undefined) {
            // @ts-ignore
            if(this.bricklink_preise.get(einzelteil_id) < einzelteil_preis) {
                color =  default_color;
            }
        }


    }
    if(this.shop_id == 2) {

        if(this.lego_preise.get(einzelteil_id) != undefined) {
            // @ts-ignore
            if(this.lego_preise.get(einzelteil_id) < einzelteil_preis) {
                color =  default_color;
            }
        }
        if(this.toypro_preise.get(einzelteil_id) != undefined) {
            // @ts-ignore
            if(this.toypro_preise.get(einzelteil_id) < einzelteil_preis) {
                color =  default_color;
            }
        }

    }
    return color != default_color?"background: " + color+ ";color: " + "#181818" :"";

  }

}
