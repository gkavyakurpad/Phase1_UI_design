import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
