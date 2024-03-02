import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { MeetingService } from '../../services/meeting.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-meeting',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './update-meeting.component.html',
  styleUrl: './update-meeting.component.css'
})
export class UpdateMeetingComponent implements OnInit{

  meetingForm!:FormGroup;
  clientList!: any[];
  @Input() meeting: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly clientService: ClientService,
    public activeModal: NgbActiveModal,
    private readonly meetingService: MeetingService
  ) { }

  ngOnInit() {
    this.meetingForm = this.formBuilder.group({
      title: [''],
      agenda: [''],
      scheduled_time: [new Date()],
      clients: [''],
    });

    this.clientService.getClients().subscribe((resonse: any) => {
      this.clientList = resonse.clientList;
    });
    if(this.meeting) {
      const formatte_Obj = this.formatMeetingObj(this.meeting);
      this.meetingForm.patchValue(formatte_Obj);
    }
  }

  saveMeeting() {
    if(this.meetingForm.valid){
      let service = this.meetingService.saveMeeting(this.meetingForm.value);
      if(this.meeting) {
        service = this.meetingService.updateMeeting(this.meeting.meeting_id, this.meetingForm.value);
      }
      service.subscribe((response)=>{
        this.activeModal.close('result');
        console.log(response);
      })    
    }
  }

  formatMeetingObj(meeting: any) {
    return {
      title: meeting.title,
      agenda: meeting.agenda,
      scheduled_time: new Date(meeting.scheduled_time),
      clients: meeting.clientList.map((element: any) => {
        return element.client_id
      })
    }
  }


}
