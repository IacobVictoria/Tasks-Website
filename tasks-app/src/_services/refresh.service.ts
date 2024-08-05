import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RefreshService {
    private refreshSubject = new Subject<void>();

    // Observable to subscribe to refresh events
    refresh$ = this.refreshSubject.asObservable();

    // Method to trigger refresh
    triggerRefresh() {
        this.refreshSubject.next();
    }
}
