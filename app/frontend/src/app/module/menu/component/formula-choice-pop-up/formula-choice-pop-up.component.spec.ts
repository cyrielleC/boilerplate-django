import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaChoicePopUpComponent } from './formula-choice-pop-up.component';

describe('FormulaChoicePopUpComponent', () => {
  let component: FormulaChoicePopUpComponent;
  let fixture: ComponentFixture<FormulaChoicePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulaChoicePopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulaChoicePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
