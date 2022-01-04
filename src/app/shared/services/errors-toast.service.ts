import {Injectable} from '@angular/core';
import {ToastController, ToastOptions} from '@ionic/angular';
import {from, Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {HttpErrorsEnum} from '@shared/utils';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class ErrorsToastService {
  private readonly defaultOptions: ToastOptions = {
    duration: 2000,
    position: 'bottom'
  };

  constructor(public toastController: ToastController, private router: Router) {}

  unauthorized(): Observable<HTMLIonToastElement> {
    return from(this.toastController.create({ ...this.defaultOptions, message: 'Unauthorized' }));
  }

  notFound(prefixLabel?: string): Observable<HTMLIonToastElement> {
    const prefix = prefixLabel ? `${prefixLabel} `: '';
    return from(this.toastController.create({ ...this.defaultOptions, message: `${prefix}Not found` }));
  }

  unexpected(): Observable<HTMLIonToastElement> {
    return from(this.toastController.create({ ...this.defaultOptions, message: `Unexpected error` }));
  }

  notifyErrorMessage(errorCode: number): Observable<HTMLIonToastElement> {
    switch (errorCode) {
      case HttpErrorsEnum.unauthorized:
        return this.unauthorized();
      case HttpErrorsEnum.notFound:
        return this.notFound('Team');
      default:
        return this.unexpected();
    }
  }

  notifyAndNavigateToRoot(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return this.notifyErrorMessage(error.status).pipe(
      switchMap((toast) => toast.present()),
      switchMap(() => this.router.navigateByUrl('')),
      map(() => error)
    );
  }
}
