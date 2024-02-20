import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

export const IsAdminAuthenticatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
) => {
  console.log(route.params['path']);
  return true;
}