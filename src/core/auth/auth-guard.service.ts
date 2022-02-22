import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService) { }
  canActivate(): boolean | Observable<boolean> {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.authService.authenticate().subscribe();
    return this.authService.onAuthenticated$;
  }
}