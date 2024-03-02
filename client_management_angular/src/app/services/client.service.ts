import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  
  
  

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private readonly _httpClient: HttpClient) {}


  saveClients(value: any): Observable<any> {
    return this._httpClient.post<any>(`${environment.API_GATEWAY}clients`,JSON.stringify(value),this.options);
  }

  updateClient(id: any, value: any): Observable<any> {
    return this._httpClient.put<any>(`${environment.API_GATEWAY}clients/${id}`,JSON.stringify(value),this.options);
  }

  deleteClient(client_id: any): Observable<any> {
    return this._httpClient.delete<any>(`${environment.API_GATEWAY}clients/${client_id}`);
  }

  getClients():Observable<any> {
    return this._httpClient.get<any>(`${environment.API_GATEWAY}clients`);
  }
}
