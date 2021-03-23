import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../_helpers/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  baseUrl = 'http://localhost:8080/zonions/restaurant';
  baseUrl1 = 'http://localhost:8080/zonions/restaurant/active';
  urlimage = 'http://localhost:8080/zonions/restaurantImage';
 changestatus = 'http://localhost:8080/zonions/changestatus';
 bookTableUrl = 'http://localhost:8080/zonions/bookTable';

 constructor(private http: HttpClient) { }

 getRestaurantList(): Observable<Restaurant[]> {
   console.log(this.http.get(this.baseUrl));
   return this.http.get<Restaurant[]>( `${this.baseUrl}`);

 }

 getActiveRestaurantList(): Observable<Restaurant[]> {
  console.log(this.http.get(this.baseUrl1));
  return this.http.get<Restaurant[]>( `${this.baseUrl1}`);

}
 createRestaurant(restaurant: any): Observable<any> {
     return this.http.post(this.baseUrl, restaurant);
 }

 deleteRestaurant(id: number): Observable<any> {
       return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
 }

 getRestaurantById(id: number): Observable<any> {
       return this.http.get(`${this.baseUrl}/${id}`);
 }
 update(id: number, value: any): Observable<any> {
     return this.http.put(`${this.baseUrl}/${id}`, value);
 }

 changeStatus(id: number, value: any): Observable<any> {
     return this.http.put(`${this.changestatus}/${id}`, value);
 }

 uploadMenu(file: any, id: number): any {
   const target: DataTransfer =  (file.target) as DataTransfer;
   const fileList: FileList = target.files;
   const filel: File = fileList[0];
   const formdata: FormData = new FormData();
   formdata.append('file', filel, filel.name);
   console.log('formdata in service', formdata);
  // formdata.append('file', file);
   const req = new HttpRequest('PUT', `${this.urlimage}/${id}`, formdata, {
     reportProgress: true,
     responseType: 'text'
   }
   );
   console.log('request object in service', req);
   return this.http.request(req);
 }

 bookTable(bookTable: any): Observable<any> {
  return this.http.post(this.bookTableUrl, bookTable);
}
}
