import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


//manage the state of a loading indicator SPINNER 
//that shows whether the application is currently performing an HTTP request.
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading$ = new Subject<boolean>();
  //acts as an observable to notify subscribers about the loading state

  show(): void {
    this.isLoading$.next(true);//loading process has started
  }

  hide(): void {
    this.isLoading$.next(false);
  }
}
