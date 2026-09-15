import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStorageService } from './auth-storage.service';

export const roleGuard: CanActivateFn = (route, state) => {


  const authStorage=inject(AuthStorageService);
  const router = inject(Router);

  const userRole = authStorage.getItem('role');

  const expectedRole = route.data['role'];

  if (userRole === expectedRole) {
    return true;
  }

  if (userRole === 'owner') {
    router.navigate(['/home']);
  } else if (userRole === 'supplier') {
    router.navigate(['/home']);
  } else {
    router.navigate(['/login']);
  }
  return false;
};
