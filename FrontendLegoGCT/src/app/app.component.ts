import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontendLegoGCT';
  lightNav = './assets/BurgernavV4.svg';
  lightLogo = './assets/LogoAntrazit.svg';
  lightKreuz = '';
  gitHubLight = './assets/github-mark-kleiner.svg';
  linkedInLight = './assets/linkedin.svg';
  discordLight = './assets/discord-mark-black-kleiner.svg';
  backGround = './assets/backgroundDark.jpg';

  handleClick(event: Event) {
    event.preventDefault();
  }
}
