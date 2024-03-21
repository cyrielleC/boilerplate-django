import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

export const IsAdminAuthenticatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
) => {
  // TODO
  return true;
}