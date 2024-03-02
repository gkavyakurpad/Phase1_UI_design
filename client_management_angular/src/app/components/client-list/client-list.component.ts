import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateClientComponent } from '../update-client/update-client.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule,RouterModule,NgbDatepickerModule,UpdateClientComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit{
  clients: any;

  constructor(
    private readonly clientService: ClientService,
    private readonly modalService: NgbModal,
    ) {}


  ngOnInit(): void {
    this.clientService.getClients().subscribe((response)=>{
      this.clients = response.clientList;
    })
  }

  open(client?: any) {
		const modlaRef = this.modalService.open(UpdateClientComponent, {backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    if(client) {
      modlaRef.componentInstance.client = client;
    }
    modlaRef.result.then(
			() => {
				this.ngOnInit();
			}
		);
	}

  delete(client: any) {
    this.clientService.deleteClient(client.client_id).subscribe((response)=>{
      this.ngOnInit();
    })
  }




}
