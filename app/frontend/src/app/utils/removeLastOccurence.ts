import { ObjectWithId } from "../model/api-recipe.models";

export function removeLastOccurrence(array: ObjectWithId[], element: ObjectWithId): ObjectWithId[] {
    const index = array.map(obj => obj.id).lastIndexOf(element.id);
  
    if (index !== -1) {
      array.splice(index, 1);
    }
  
    return array;
}
  