import { TestBed } from '@angular/core/testing';

import { RouteGuardService } from './route-gaurd.service';

describe('RouteGaurdService', () => {
  let service: RouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
