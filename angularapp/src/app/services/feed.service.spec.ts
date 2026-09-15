import { TestBed } from '@angular/core/testing';
import { FeedService } from './feed.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FeedService', () => {
  let service: FeedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FeedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  fit('Frontend_should_create_feed_service', () => {
    expect(service).toBeTruthy();
  });
});
