import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {Shop} from "../../suche/datenstrukturen";
import {SucheComponent} from "../../suche/suche.component";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
    @Input() legoSet: any;
    @Input() legoSetDetails: Shop[] = [];
    @Input()bilder: Map<string, string> = new Map();

    constructor(
        private router: Router,
        private apiService: ApiService,
        private http: HttpClient
    ) {
    }

    /**
     * gibt zu einer Set Id das entsprechende Bild
     * @param set_id übergebene Set Id
     */
    getSetBild(set_id: string) {
      console.log(set_id);
        let bild: string = "../assets/placeholder-image.png";
        // prüft, ob das Bild bereits geladen wurde
        if (!this.bilder.has(set_id)) {
            //läd Bild aus der Datenbank
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
