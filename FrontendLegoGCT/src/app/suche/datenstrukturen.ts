
export class LegoSet {
    private _set_id:string;
    private _set_name: string;
    private _preis:number;
    private _einzelteil_anzahl:number;
    private _shops:Shop[];

    public constructor(set_id: string, set_name: string,preis: number, shops:Shop[]) {
        this._set_id = set_id;
        this._set_name = set_name;
        this._preis = preis;
        this._einzelteil_anzahl = 0;
        this._shops = shops;
    }


    get set_id(): string {
        return this._set_id;
    }

    get set_name(): string {
        return this._set_name;
    }

    get preis(): number {
        return this._preis;
    }

    get einzelteil_anzahl(): number {
        return this._einzelteil_anzahl;
    }

    get shops(): Shop[] {
        return this._shops;
    }
}

export class Shop {
    private _shop_name:string;
    private _anbieter_url:string;
    private _einzelteile:Einzelteil[];

    constructor(shop_name: string, url: string, einzelteile:Einzelteil[]) {
        this._shop_name = shop_name;
        this._anbieter_url = url;
        this._einzelteile = einzelteile;
    }


    get shop_name(): string {
        return this._shop_name;
    }

    get anbieter_url(): string {
        return this._anbieter_url;
    }

    get einzelteile(): Einzelteil[] {
        return this._einzelteile;
    }
}

export class Einzelteil {


    public _einelteil_id:string;
    private _preis:number;
    private _anzahl:number;
    private _einzelteil_url:string;
    private _beschreibung:string;
    private _kategorie:string;
    private _farbe:string;


  constructor(einelteil_id: string, preis: number, anzahl: number, einzelteil_url: string, beschreibung: string, kategorie: string, farbe: string) {
    this._einelteil_id = einelteil_id;
    this._preis = preis;
    this._anzahl = anzahl;
    this._einzelteil_url = einzelteil_url;
    this._beschreibung = beschreibung;
    this._kategorie = kategorie;
    this._farbe = farbe;
  }

  get einelteil_id(): string {
        return this._einelteil_id;
    }

    get preis(): number {
        return this._preis;
    }

    get anzahl(): number {
        return this._anzahl;
    }

    get einzelteil_url(): string {
        return this._einzelteil_url;
    }
    get beschreibung(): string {
      return this._beschreibung;
    }

    get kategorie(): string {
      return this._kategorie;
    }

    get farbe(): string {
      return this._farbe;
    }
}
export class VorschlagElement {
  private _set_name:string;
  private _set_id:string;
  private _set_bild:string;
  constructor(set_name: string, set_id: string, set_bild: string) {
    this._set_name = set_name;
    this._set_id = set_id;
    this._set_bild = set_bild;
  }


  get set_name(): string {
    return this._set_name;
  }

  get set_id(): string {
    return this._set_id;
  }

  get set_bild(): string {
    return this._set_bild;
  }
}
