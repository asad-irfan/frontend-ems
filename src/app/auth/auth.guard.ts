import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  options: IndividualConfig;
  authState = new BehaviorSubject(null);
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 6000;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.authService.User.pipe(
      take(1),
      map(token => {
        if (token) {
          return true;
        } else {
          this.router.navigate(['/login']);
          this.authState.next(null);
          this.showErrorToast('Error!!', 'You are not authorized to access this URL. Please login to get access.', 'error');
          return false;
        }
      })
    );
  }

  showErrorToast(title: string, message: string, type: string) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
}
