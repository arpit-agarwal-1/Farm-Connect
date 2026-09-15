import { TestBed } from '@angular/core/testing';

import { LivestockService } from './livestock.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LivestockService', () => {
  let service: LivestockService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LivestockService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  fit('Frontend_should_create_livestock_service', () => {
    expect(service).toBeTruthy();
  });
});
