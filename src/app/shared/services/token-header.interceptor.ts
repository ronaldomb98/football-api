import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environment/environment';

@Injectable()
export class TokenHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = req.clone({
      headers: req.headers.append('X-Auth-Token', environment.footballApiToken)
    });

    return next.handle(newRequest);
  }

}

export const API_TOKEN_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenHeaderInterceptor,
  multi: true,
};
