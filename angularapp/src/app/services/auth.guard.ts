import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStorageService } from './auth-storage.service';

export const authGuard: CanActivateFn = (route, state) => {


  const router = inject(Router);
  const authStorage= inject(AuthStorageService);

  const token = authStorage.getItem('token');
  if(token){
    return true;
  }

  router.navigate(['/home']);
  return false;
};
