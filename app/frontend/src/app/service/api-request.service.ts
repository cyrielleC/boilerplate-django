import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { FoodCategory, Dish, Ingredient, Restaurant } from '../model/recipe.models';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private readonly httpClient: HttpClient) {}

  getApiRootUrl(): string {
    return environment.apiUrl;
  }

  getFoodCategory(): Observable<FoodCategory[]> {
    return this.httpClient.get<FoodCategory[]>( this.getApiRootUrl() + 'menu/foodcategory/');
  }
  getDishes(): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>( this.getApiRootUrl() + 'menu/dish/');
  }
  getIngredients(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>( this.getApiRootUrl() + 'menu/ingredient/');
  }
  getRestaurant(): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>( this.getApiRootUrl() + 'menu/restaurant/1');
  }
}
