import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private readonly httpClient: HttpClient) {}

  getMenu(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'menu/category/');
  }
}
