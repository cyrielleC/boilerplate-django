import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopyService {
  static clone(object: any):  any{
    if (Array.isArray(object)) {
      return object.map(el => CopyService.clone(el));
    }
    if (object && typeof object === 'object') {
      const result: any = {};
      Object.keys(object).forEach(key => {
        result[key] =CopyService.clone(object[key])
      });
      return result;
    }
    return object;
  }
}
