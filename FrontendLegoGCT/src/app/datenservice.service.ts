import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatenService {
  private eingabeSpeicher = new BehaviorSubject<string>('');
  eingabeSpeicher$ = this.eingabeSpeicher.asObservable();

  updateEingabeSpeicher(eingabe: string) {
    this.eingabeSpeicher.next(eingabe);
  }
}