import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientListComponent } from './client-list.component';
import { ClientService } from '../../services/client.service';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UpdateClientComponent } from '../update-client/update-client.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;
  let clientService: ClientService;
  let modalService: NgbModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        CommonModule,
        RouterTestingModule,
        NgbDatepickerModule,
        ClientListComponent,
        UpdateClientComponent
      ],
      providers: [ClientService, NgbModal]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    clientService = TestBed.inject(ClientService);
    modalService = TestBed.inject(NgbModal);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch clients on initialization', () => {
    const mockClients = {
      "clientList": [
          {
              "client_id": 2,
              "name": "aasd",
              "email": "assda@ggg.com",
              "phone": "9988301345",
              "address": "asdasd"
          }
      ]
  };
    jest.spyOn(clientService, 'getClients').mockReturnValue(of(mockClients));
    component.ngOnInit();
    expect(component.clients).toEqual(mockClients.clientList);
    expect(clientService.getClients).toHaveBeenCalled();
  });
});
