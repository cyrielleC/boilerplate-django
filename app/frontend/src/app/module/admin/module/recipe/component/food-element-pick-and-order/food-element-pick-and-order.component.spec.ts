import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodElementPickAndOrderComponent } from './food-element-pick-and-order.component';

describe('FoodElementPickAndOrderComponent', () => {
  let component: FoodElementPickAndOrderComponent;
  let fixture: ComponentFixture<FoodElementPickAndOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodElementPickAndOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodElementPickAndOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
