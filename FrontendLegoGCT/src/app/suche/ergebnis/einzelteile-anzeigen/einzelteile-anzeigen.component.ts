import {Component, Input} from '@angular/core';
import {Einzelteil, Shop} from "../../datenstrukturen";

@Component({
  selector: 'app-einzelteile-anzeigen',
  templateUrl: './einzelteile-anzeigen.component.html',
  styleUrls: ['./einzelteile-anzeigen.component.scss']
})
export class EinzelteileAnzeigenComponent {
  @Input()einzelteile:Einzelteil[] = [];

}
