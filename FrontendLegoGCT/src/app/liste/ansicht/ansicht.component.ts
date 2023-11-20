import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ansicht',
  templateUrl: './ansicht.component.html',
  styleUrls: ['./ansicht.component.scss']
})
export class AnsichtComponent implements OnInit {
  @Input() movies = [];
  @Output() selectMovie = new EventEmitter();

  constructor(){}

  ngOnInit() {}

  movieClicked(movie: any){
    this.selectMovie = movie;
    console.log('selectedMovie', this.selectMovie);
  }
}
