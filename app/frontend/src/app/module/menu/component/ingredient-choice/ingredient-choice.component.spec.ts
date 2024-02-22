import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientChoiceComponent } from './ingredient-choice.component';

describe('IngredientChoiceComponent', () => {
  let component: IngredientChoiceComponent;
  let fixture: ComponentFixture<IngredientChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientChoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
