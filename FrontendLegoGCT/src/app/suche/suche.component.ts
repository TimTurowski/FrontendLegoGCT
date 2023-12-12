import {Component, OnInit} from '@angular/core';
import {Router, Routes} from '@angular/router';
import {Injectable} from '@angular/core';
import {Einzelteil, LegoSet, Shop, VorschlagElement} from "./datenstrukturen";
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DatenService} from '../datenservice.service';
import {ApiService} from "../api.service";

@Component({
    selector: 'app-suche',
    templateUrl: './suche.component.html',
    styleUrls: ['./suche.component.scss']
})
@Injectable({
    providedIn: 'root'
})

export class SucheComponent implements OnInit {
    isOpen = false;

    legoSetMap = new Map<string, any>();
    //Url für die Django Api
    //http://192.168.198.47:8000 http://localhost:8000
    readonly apiurl = "http://localhost:8000";
    eingabeWert: string = '';
    lego_set: LegoSet = new LegoSet("null", "null", 1, []);

    img: string = '';
    eingabeSpeicher: string = '';
    ist_geclickt: boolean = false;
    neue_suche: boolean = false;
    set_existiert: boolean = true;
    vorschlaege_liste: VorschlagElement[] = [];
    vorschlaege_bilder: Map<string, string> = new Map();


    constructor(private http: HttpClient, private router: Router, private datenService: DatenService, private apiService: ApiService) {
    }

    /**
     * Methode zum Abfragen der JSON mit dem Suchergebniss
     */
    getSuchList() {

        // return this.http.get("http://192.168.198.47:8000/eingabe/?id="+ this.eingabeWert, {headers:this.apiService.getAuthHeaders()});
        return this.http.get(this.apiurl + "/eingabe/?id=" + this.eingabeWert, {headers: this.apiService.getAuthHeaders()});
        // return this.http.get("https://raw.githubusercontent.com/HannesScherer/DarkProjekt-master-main/main/10320.json");
    }

    /**
     * liefert alle Vorschläge zum bereits in das Suchfeld eingegebenen Text
     */
    getVorschlaege() {
        //toPromis sichert zu das alle daten empfangen wurden
        return this.http.get(this.apiurl + "/eingabe/?name=" + this.eingabeWert).toPromise();

    }

    /**
     * Liefert die JSON mit einem Bild in Base64 Kodierung
     * @param set_id id des Sets des Bilds
     */
    getBild(set_id: string) {
        return this.http.get(this.apiurl + "/bild/?id=" + set_id);
    }

    /**
     * gibt alle Shops einer Suchanfrage mit Einzelteilpreisen aus
     */
    getShops(): Shop[] {
        return this.lego_set.shops;

    }

    /**
     * gibt eine Liste mit Vorschlägen für die Suche
     */
    async getVorschlaegListe() {

        if (this.eingabeWert.length > 2) {
            this.isOpen = true;
            let vorschlaege_liste: VorschlagElement[] = [];
            await this.getVorschlaege().then(data => {
                const parsed_data = JSON.parse(JSON.stringify(data));
                parsed_data.forEach((item: any) => {
                    vorschlaege_liste.push(new VorschlagElement(item.set_name, item.set_id, item.set_bild));

                });
            });
            this.vorschlaege_liste = vorschlaege_liste;
            this.getBilder(vorschlaege_liste);
        }

    }

    /**
     * holt zu jedem Vorschlag die Bilder als Base64
     * @param vorschlaege Liste von suchvorschlägen
     */
    getBilder(vorschlaege: VorschlagElement[]) {

        for (let item of vorschlaege) {


            if (!this.vorschlaege_bilder.has(item.set_id)) {
                this.getBild(item.set_id).subscribe(
                    data => {
                        const parsed_data = JSON.parse(JSON.stringify(data));
                        this.vorschlaege_bilder.set(item.set_id, parsed_data.set_bild);
                    });
            }
        }

    }

    /**
     * Methode führt eine Suche zum geklickten Set aus.
     * @param clicked_set geklickte Set Id
     */
    clickSuggestion(clicked_set: string) {

        this.eingabeWert = clicked_set;
        this.pruefeEingabe();
        this.isOpen = false;
    }


    /**
     * auführen der Suche zur eingegeben Id
     */
    pruefeEingabe() {
        this.set_existiert = true;
        this.neue_suche = true;
        this.ist_geclickt = true;
        this.datenService.updateEingabeSpeicher(this.eingabeWert);
        this.eingabeSpeicher = this.eingabeWert;


            this.getSuchList().subscribe(data => {
                     // @ts-ignore
                    if(!JSON.parse(JSON.stringify(data)).message) {
                        this.set_existiert = true;
                        this.jsonVerarbeiter(data);
                    }
                    else {
                        this.set_existiert = false;
                        this.neue_suche = false;
                    }
                }
            );




    }

    löscheEingabe() {
        this.legoSetMap.clear();
    }

    /**
     * verarbeitet die JSON aus der Suchanfrage zu einer internen Datenstruktur
     * @param data Json Daten
     */
    jsonVerarbeiter(data: any): void {
        const lego_einzelteile: Einzelteil[] = [];

        data[1].parts.forEach((item: any) => {
            const einzelteil: Einzelteil = new Einzelteil(item.einzelteil_id, item.preis, item.anzahl, item.url, item.beschreibung, item.kategorie, item.farbe);
            lego_einzelteile.push(einzelteil);
        })
        const lego_shop: Shop = new Shop(data[1].shop_name, data[1].shop_url, lego_einzelteile);


        const toypro_einzelteile: Einzelteil[] = [];
        data[2].parts.forEach((item: any) => {
            const einzelteil: Einzelteil = new Einzelteil(item.einzelteil_id, item.preis, item.anzahl, item.url, item.beschreibung, item.kategorie, item.farbe);
            toypro_einzelteile.push(einzelteil);
        })
        const toypro_shop: Shop = new Shop(data[2].shop_name, data[2].shop_url, toypro_einzelteile);


        const bricklink_einzelteile: Einzelteil[] = [];
        data[3].parts.forEach((item: any) => {
            const einzelteil: Einzelteil = new Einzelteil(item.einzelteil_id, item.preis, item.anzahl, item.url, item.beschreibung, item.kategorie, item.farbe);
            bricklink_einzelteile.push(einzelteil);
        })
        this.img = data[4].set_bild;


        const bricklink_shop: Shop = new Shop(data[3].shop_name, data[3].shop_url, bricklink_einzelteile);
        const shops: Shop[] = [];
        shops.push(lego_shop);
        shops.push(toypro_shop);
        shops.push(bricklink_shop);
        const lego_set: LegoSet = new LegoSet(data[0].set_id, data[0].set_name, data[0].preis, shops);
        this.lego_set = lego_set;
        this.neue_suche = false;


    }

    ngOnInit() {
    }

    protected readonly JSON = JSON;
    protected readonly localStorage = localStorage;
}

