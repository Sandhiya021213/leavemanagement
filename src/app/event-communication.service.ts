import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventCommunicationService {
  private eventSubject = new Subject<any>();

  // Observable for other components to subscribe to
  eventObservable$ = this.eventSubject.asObservable();

  // Method to trigger the event
  triggerEvent(data: any) {
    this.eventSubject.next(data);
  }
}
