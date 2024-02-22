import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);

  if(loginService.getTokenLogin()) {
    return true;
  }
  
  return inject(Router).createUrlTree(['login']);
};
