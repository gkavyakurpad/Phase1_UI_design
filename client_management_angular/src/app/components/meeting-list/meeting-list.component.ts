import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateMeetingComponent } from '../update-meeting/update-meeting.component';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './meeting-list.component.html',
  styleUrl: './meeting-list.component.css'
})
export class MeetingListComponent implements OnInit {
  meetings!: any[];

  constructor(
    private readonly meetingService: MeetingService,
    private readonly modalService: NgbModal,
    ) {}

  ngOnInit() {
    this.meetingService.getMeetings().subscribe((response: any) => {
      this.meetings = response.meetingList;
    });
  }

  open(meeting?: any) {
		const modlaRef = this.modalService.open(UpdateMeetingComponent, {backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    if(meeting) {
      modlaRef.componentInstance.meeting = meeting;
    }
    modlaRef.result.then(
			() => {
				this.ngOnInit();
			}
		);
	}

  delete(meeting: any) {
    this.meetingService.deleteMeeting(meeting.meeting_id).subscribe((response: any)=>{
      this.ngOnInit();
    });
  }
  
}
