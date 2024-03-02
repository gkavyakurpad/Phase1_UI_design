import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private readonly _httpClient: HttpClient) {}


  getMeetings():Observable<any> {
    return this._httpClient.get<any>(environment.API_GATEWAY + 'meetings');
  }

  saveMeeting(value: any) :Observable<any>{
    return this._httpClient.post<any>(environment.API_GATEWAY + 'meetings',JSON.stringify(value),this.options);
  }

  updateMeeting(id: any,value: any) :Observable<any>{
    return this._httpClient.put<any>(`${environment.API_GATEWAY}meetings/${id}`,JSON.stringify(value),this.options);
  }

  deleteMeeting(meetingID: any): Observable<any> {
    return this._httpClient.delete<any>(`${environment.API_GATEWAY}meetings/${meetingID}`);
  }
}
