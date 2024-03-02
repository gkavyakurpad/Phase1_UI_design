import { TestBed } from '@angular/core/testing';

import { MeetingService } from './meeting.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MeetingService', () => {
  let service: MeetingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(MeetingService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
