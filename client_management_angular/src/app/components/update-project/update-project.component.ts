import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ProjectService } from '../../services/project.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css',
})
export class UpdateProjectComponent implements OnInit{
  projectForm!: any;
  clients!: any[];
  @Input() project!:any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly clientService: ClientService,
    private readonly projectService: ProjectService,
    public activeModal: NgbActiveModal,

  ) {}


  ngOnInit(): void {
    this.clientService.getClients().subscribe((response:any) => {
      this.clients = response.clientList;
    });

    this.projectForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      clientId: ['', [Validators.required]],
      status: ['NOT_STARTED', [Validators.required]],
      startDate: [new Date(), [Validators.required]],
      endDate: [new Date(), [Validators.required]],
    });

    if(this.project) {
      const formatte_Obj = this.formatObj(this.project);
      this.projectForm.patchValue(formatte_Obj);
    }
  }

  formatObj(project: any) {
    return {
      name: project.name,
      description: project.description,
      clientId: project.client_id,
      status: project.status,
      startDate: new Date(project.startDate),
      endDate: new Date(project.endDate),
    };
  }

  onSubmit(): void {
    
    if (this.projectForm.valid) {
      let service = this.projectService.createProject(this.projectForm.value);
      if(this.project) {
        service = this.projectService.updateProject(this.project.project_id, this.projectForm.value);
      }
      service.subscribe((response)=>{
        this.activeModal.close('result');
        console.log(response);
      });
    }
  }
}
