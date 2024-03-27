import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryElementDisplayComponent } from './category-element-display.component';

describe('CategoryElementDisplayComponent', () => {
  let component: CategoryElementDisplayComponent;
  let fixture: ComponentFixture<CategoryElementDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryElementDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryElementDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
