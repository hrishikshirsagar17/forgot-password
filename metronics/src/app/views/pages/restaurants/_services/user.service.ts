import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '/home/hkshirsagar/Documents/Zonions Application/Metronics-Theme/src/app/core/auth/_services/app.constants';

const API_URL = 'http://localhost:8080/api/test/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/api/auth/';


  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'home', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  getAllUsers(): Observable<any[]> {
    console.log(this.http.get(this.baseUrl + 'users'));
    return this.http.get<any[]>( this.baseUrl + 'users');

  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl + 'users'}/${id}`);
}
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl + 'users'}/${id}`, { responseType: 'text' });
}

changeUserRole(id: number, value: any): Observable<any> {
  return this.http.put(`${this.baseUrl + 'users'}/${id}`, value);
}

getCurrentUser(): Observable<any> {
  alert('inside getCurrentUser');
  return this.http.get(AppConstants.API_URL + 'user/me', httpOptions);
}

}
