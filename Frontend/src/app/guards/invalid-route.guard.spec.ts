import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { invalidRouteGuard } from './invalid-route.guard';

describe('invalidRouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => invalidRouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
