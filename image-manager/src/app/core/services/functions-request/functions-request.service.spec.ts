import { TestBed } from '@angular/core/testing';

import { FunctionsRequestService } from './functions-request.service';

describe('FunctionsRequestService', () => {
  let service: FunctionsRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionsRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
