import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { foodCategoryGuard } from './food-category.guard';

describe('foodCategoryGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => foodCategoryGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
