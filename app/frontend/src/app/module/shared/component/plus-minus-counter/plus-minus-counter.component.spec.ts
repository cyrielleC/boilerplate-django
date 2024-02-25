import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusMinusCounterComponent } from './plus-minus-counter.component';

describe('PlusMinusCounterComponent', () => {
  let component: PlusMinusCounterComponent;
  let fixture: ComponentFixture<PlusMinusCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlusMinusCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlusMinusCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
