import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { LoaderService } from '../_services/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>, // the http request being intercepted
  next: HttpHandlerFn   // the function that takes the request
) => {
  const loaderService = inject(LoaderService);

  loaderService.show(); //start of the Http request

  return next(req).pipe(finalize(() => loaderService.hide()));
  //called once the HTTP request completes
};
