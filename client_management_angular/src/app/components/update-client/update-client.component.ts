import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.css'
})
export class UpdateClientComponent implements OnInit{
  clientForm!: FormGroup;
  @Input() modal: any;
  @Input() client: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly clientService: ClientService,
    public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.clientForm = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      phone: ['',[Validators.required, Validators.minLength(10)]],
      address:['',[Validators.required]]
    })

    if(this.client) {
      this.clientForm.patchValue(this.client);
    }
  }
  
  save(): void{
    if(this.clientForm.valid){
      let service = this.clientService.saveClients(this.clientForm.value);
      if(this.client) {
        service = this.clientService.updateClient(this.client.client_id, this.clientForm.value);
      }
      service.subscribe((response)=>{
        this.activeModal.close('result');
        console.log(response);
      })    
    }
  }
}
