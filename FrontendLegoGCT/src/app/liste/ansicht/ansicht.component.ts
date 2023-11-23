import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-ansicht',
  templateUrl: './ansicht.component.html',
  styleUrls: ['./ansicht.component.scss']
})
export class AnsichtComponent implements OnInit {
  @Input() legoSets = [];
  @Output() deletedSet = new EventEmitter();
  @Output() selectLegoSet = new EventEmitter();

    constructor(private router: Router){

  }

  ngOnInit() {}
  deleteSet(set: any){
    this.deletedSet.emit(set);
  }
  legoSetClicked(set: any){
      this.selectLegoSet.emit(set);
  }
  neueSuche() {
      this.router.navigate(['suche']);
  }

  protected readonly console = console;
}
