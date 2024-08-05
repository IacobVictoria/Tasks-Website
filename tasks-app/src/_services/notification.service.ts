import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { NotificationType } from "../_enums/notification-type.enum";
import { Notification } from "../_interfaces/notification.interface";

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private notificationSubject = new Subject<Notification | null>();

    get notification$(): Observable<Notification | null>{
        return this.notificationSubject.asObservable();
    }

    notify(type: NotificationType, message: string): void{
        this.notificationSubject.next({type, message});
    }
}