import { TestBed } from '@angular/core/testing';
import { RequestService } from './request.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RequestService', () => {
  let service: RequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  fit('Frontend_should_create_request_service', () => {
    expect(service).toBeTruthy();
  });
});
