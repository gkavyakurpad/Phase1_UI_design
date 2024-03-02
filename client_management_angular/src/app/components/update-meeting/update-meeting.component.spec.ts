import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UpdateMeetingComponent } from './update-meeting.component';
import { ClientService } from '../../services/client.service';
import { MeetingService } from '../../services/meeting.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UpdateMeetingComponent', () => {
  let component: UpdateMeetingComponent;
  let fixture: ComponentFixture<UpdateMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, CommonModule,UpdateMeetingComponent,HttpClientTestingModule],
      declarations: [],
      providers: [ClientService, MeetingService, NgbActiveModal]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
