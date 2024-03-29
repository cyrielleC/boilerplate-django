import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ObjectWithOrder } from "@app/model/api-recipe.models";

export abstract class AbstractWithDragAndDrop {
    
  drop(elements: ObjectWithOrder[], event: CdkDragDrop<any>) {
    moveItemInArray(elements, event.previousIndex, event.currentIndex);
    this.updateOrder(elements);
  }

  add(elements: ObjectWithOrder[], newElement: ObjectWithOrder & Record<string, any>) {
    elements.push(newElement);
    this.updateOrder(elements);
  }

  remove(elements: ObjectWithOrder[], element: any) {
    let index = elements.findIndex(el => this.isElementToSearch(el, element));
    elements.splice(index, 1);
    this.updateOrder(elements);
  }

  private updateOrder(elements: ObjectWithOrder[]) {
    elements.forEach((el: ObjectWithOrder, index: number) => {
      el.order = index;
    });
  }

  protected abstract isElementToSearch(element1: any, element2: any): boolean;
}