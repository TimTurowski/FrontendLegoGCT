import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ansicht',
  templateUrl: './ansicht.component.html',
  styleUrls: ['./ansicht.component.scss']
})
export class AnsichtComponent implements OnInit {
  movies = [];

  constructor(){}

  ngOnInit() {}
}
