import { TestBed } from '@angular/core/testing';

import { ImagesRequestService } from './images-request.service';

describe('ImagesRequestService', () => {
  let service: ImagesRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
