import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';

export const authGuardGuard: CanActivateFn & CanActivateChildFn = () => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true; 
  } else {
    return router.createUrlTree(['']); // road to login o home 
  }
};