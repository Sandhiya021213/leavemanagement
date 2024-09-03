import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
 

  private apiUrl = 'http://127.0.0.1:8080/api/leaves'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  

  getLeavesById(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  } 
  
  getLeaves(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  } 

  updateLeave(id: number, leaveData:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`,leaveData);
  }

  deleteLeave(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  sendLeaveEmail(id: number, recipientEmail: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/send-email`, { recipient_email: recipientEmail });
  }

  createLeave(leaveData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, leaveData);
  }
}
