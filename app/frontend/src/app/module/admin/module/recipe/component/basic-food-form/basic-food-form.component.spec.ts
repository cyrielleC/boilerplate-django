import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicFoodFormComponent } from './basic-food-form.component';

describe('BasicFoodFormComponent', () => {
  let component: BasicFoodFormComponent;
  let fixture: ComponentFixture<BasicFoodFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicFoodFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicFoodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
