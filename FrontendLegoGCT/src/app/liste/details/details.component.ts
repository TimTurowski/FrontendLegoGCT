import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {Shop} from "../../suche/datenstrukturen";
import {SucheComponent} from "../../suche/suche.component";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
    @Input() legoSet: any;
    @Input() legoSetDetails: Shop[] = [];
    bilder: Map<string, string> = new Map();

    constructor(
        private router: Router,
        private apiService: ApiService,
        private suche: SucheComponent
    ) {
    }

    /**
     * gibt zu einer Set Id das entsprechende Bild
     * @param set_id übergebene Set Id
     */
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





    protected readonly console = console;


}
