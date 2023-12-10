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
  private _lastdate: string = "";


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
  setlastdate(value: string) {
        this._lastdate = value;
    }

  getDay(date_string:string) {
    const date = new Date(date_string);
      return date.getDate()+"."+ date.getMonth()+"." + date.getFullYear();
  }
  isNewDay(date_string:string) {
    let date:Date = new Date(date_string);

    return date.getDate() != new Date(this._lastdate).getDate();

  }
  


  protected readonly console = console;
}
