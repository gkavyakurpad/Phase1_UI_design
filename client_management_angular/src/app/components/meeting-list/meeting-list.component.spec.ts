import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingListComponent } from './meeting-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateMeetingComponent } from '../update-meeting/update-meeting.component';
import { MeetingService } from '../../services/meeting.service';

describe('MeetingListComponent', () => {
  let component: MeetingListComponent;
  let fixture: ComponentFixture<MeetingListComponent>;
  let meetingService: MeetingService;
  let modalService: NgbModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MeetingListComponent,
        HttpClientTestingModule,
        CommonModule,
        RouterTestingModule,
        NgbDatepickerModule,
        MeetingListComponent,
        UpdateMeetingComponent
      ],
      providers: [MeetingService, NgbModal]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingListComponent);
    component = fixture.componentInstance;
    meetingService = TestBed.inject(MeetingService);
    modalService = TestBed.inject(NgbModal);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
