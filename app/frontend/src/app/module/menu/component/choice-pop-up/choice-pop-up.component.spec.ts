import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicePopUpComponent } from './choice-pop-up.component';

describe('ChoicePopUpComponent', () => {
  let component: ChoicePopUpComponent;
  let fixture: ComponentFixture<ChoicePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChoicePopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChoicePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
