import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulasExplanationComponent } from './formulas-explanation.component';

describe('FormulasExplanationComponent', () => {
  let component: FormulasExplanationComponent;
  let fixture: ComponentFixture<FormulasExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulasExplanationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulasExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
