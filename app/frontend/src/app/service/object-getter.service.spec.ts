import { TestBed } from '@angular/core/testing';

import { ObjectGetterService } from './object-getter.service';

describe('AbstractObjectGetterService', () => {
  let service: ObjectGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
