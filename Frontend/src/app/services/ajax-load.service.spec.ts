import { TestBed } from '@angular/core/testing';

import { AjaxLoadService } from './ajax-load.service';

describe('AjaxLoadService', () => {
  let service: AjaxLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjaxLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
