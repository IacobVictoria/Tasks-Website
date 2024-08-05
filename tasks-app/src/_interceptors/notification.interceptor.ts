import {
  HttpEventType,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { NOTIFICATION_HTTP_METHODS } from '../_constants/notification-http.constants';
import { NotificationService } from '../_services/notification.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NotificationType } from '../_enums/notification-type.enum';

export const notificationInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  if (!NOTIFICATION_HTTP_METHODS.includes(req.method)) {
    // daca request ul este intre cele mentionate in constants
    return next(req);
  }

  const notificationService = inject(NotificationService);
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          if (event.status === 200) {
            notificationService.notify(
              NotificationType.Success,
              `${req.method} Request successful`
            );
          } else {
            notificationService.notify(
              NotificationType.Error,
              `${req.method} Request unsuccessful`
            );
          }
        }
      },
      error: (error) => {
        notificationService.notify(
          NotificationType.Error,
          `Error occurred : ${error.statusText} | Status: ${error.status}`
        );
      },
    })
  );
};
