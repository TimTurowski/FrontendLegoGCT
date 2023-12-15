import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'frontendLegoGCT';
  lightNav = './assets/BurgernavV4.svg';
  lightLogo = './assets/LogoAntrazit.svg';
  lightKreuz = '';
  gitHubLight = './assets/github-mark-kleiner.svg';
  linkedInLight = './assets/linkedin.svg';
  discordLight = './assets/discord-mark-black-kleiner.svg';
  backGround = './assets/backgroundDark.jpg';

  apiUrl:string = '123';

  constructor(private httpClient: HttpClient,
  ) {
  }

    ngOnInit(): void {
        console.log("init");

    }





}
