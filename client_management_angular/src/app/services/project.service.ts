import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private readonly _httpClient: HttpClient) {}


  getProjects(): Observable<any> {
    return this._httpClient.get<any>(environment.API_GATEWAY + 'projects');
  }

  createProject(value: any) {
    return this._httpClient.post<any>(environment.API_GATEWAY + 'projects',JSON.stringify(value),this.options);
  }

  updateProject(id: any, value: any): Observable<any> {
    return this._httpClient.put<any>(`${environment.API_GATEWAY}projects/${id}`,JSON.stringify(value),this.options);
  }

  deleteProject(project_id: any) {
    return this._httpClient.delete<any>(`${environment.API_GATEWAY}projects/${project_id}`);
  }
}
