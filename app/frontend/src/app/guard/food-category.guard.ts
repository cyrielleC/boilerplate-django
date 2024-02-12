import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const foodCategoryGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  console.log("AUTH: " + AuthService.instanceCounter);
  return !environment.protectAllContentWithAuthentication ? true :
    inject(AuthService).isUserInRoles(['registered']) ? true : inject(NavigationService).router.createUrlTree(['login']);
};
