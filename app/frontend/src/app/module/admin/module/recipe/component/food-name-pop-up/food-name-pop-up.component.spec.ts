import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodNamePopUpComponent } from './food-name-pop-up.component';

describe('FoodNamePopUpComponent', () => {
  let component: FoodNamePopUpComponent;
  let fixture: ComponentFixture<FoodNamePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodNamePopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodNamePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
