import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { UpdateProjectComponent } from '../update-project/update-project.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../../services/project.service';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let projectService: ProjectService;
  let modalService: NgbModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectListComponent,
        UpdateProjectComponent,
        HttpClientTestingModule,
        CommonModule,
        RouterTestingModule,
        NgbDatepickerModule
      ],
      providers: [ProjectService, NgbModal]
    })
    .compileComponents();
    
   
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    modalService = TestBed.inject(NgbModal);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
