import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Restaurant, Food } from '../model/api-recipe.models';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private readonly httpClient: HttpClient) {}

  getApiRootUrl(): string {
    return environment.urls.apiUrl;
  }

  getFood(): Observable<Food[]> {
    return this.httpClient.get<Food[]>( this.getApiRootUrl() + 'menu/food/');
  }

  createFood(food: Food): Observable<Food> {
    return this.httpClient.post<Food>(this.getApiRootUrl() + 'menu/food/', food);
  }

  updateFood(food: Food): Observable<Food> {
    return this.httpClient.put<Food>(this.getApiRootUrl() + 'menu/food2/' + food.id + '/', food);
  }

  getRestaurant(): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>( this.getApiRootUrl() + 'menu/restaurant/' + environment.restaurantId);
  }
}
