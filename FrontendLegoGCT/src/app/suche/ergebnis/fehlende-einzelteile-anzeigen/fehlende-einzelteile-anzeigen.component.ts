import {Component, Input} from '@angular/core';
import {Einzelteil} from "../../datenstrukturen";

@Component({
  selector: 'app-fehlende-einzelteile-anzeigen',
  templateUrl: './fehlende-einzelteile-anzeigen.component.html',
  styleUrls: ['./fehlende-einzelteile-anzeigen.component.scss']
})
export class FehlendeEinzelteileAnzeigenComponent {
  @Input()einzelteile:Einzelteil[] = [];


}
