import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateProjectComponent } from '../update-project/update-project.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit{
  projects!:any[];
  constructor(
    private projectService: ProjectService,
    private readonly modalService: NgbModal,
    ) {}


  ngOnInit(): void {
    this.projectService.getProjects().subscribe((response:any) => {
      this.projects = response.projectList
    });
    
  }

  open(project?: any) {
		const modlaRef = this.modalService.open(UpdateProjectComponent, {backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    if(project) {
      modlaRef.componentInstance.project = project;
    }
    modlaRef.result.then(
			() => {
				this.ngOnInit();
			}
		);
	}

  delete(project: any) {
    this.projectService.deleteProject(project.project_id).subscribe((response)=>{
      this.ngOnInit();
    })
  }
  
}
