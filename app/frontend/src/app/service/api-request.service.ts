import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private readonly httpClient: HttpClient) {}

  getApiRootUrl(): string {
    return environment.apiUrl;
  }

  getCategory(): Observable<any> {
    return this.httpClient.get( this.getApiRootUrl() + 'menu/category/');
  }
}
