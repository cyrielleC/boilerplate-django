import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodElementsInputComponent } from './food-elements-input.component';

describe('FoodElementsInputComponent', () => {
  let component: FoodElementsInputComponent;
  let fixture: ComponentFixture<FoodElementsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodElementsInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodElementsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
