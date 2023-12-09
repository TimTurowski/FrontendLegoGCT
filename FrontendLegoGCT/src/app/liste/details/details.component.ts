import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {Shop} from "../../suche/datenstrukturen";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent{
  @Input() legoSet: any;
  @Input() legoSetDetails: Shop[] = [];
  constructor(
    private apiService: ApiService,

  ) {}




  protected readonly console = console;


}
