import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleLinedInputsWithIconsComponent } from './simple-lined-inputs-with-icons.component';

describe('SimpleLinedInputsWithIconsComponent', () => {
  let component: SimpleLinedInputsWithIconsComponent;
  let fixture: ComponentFixture<SimpleLinedInputsWithIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleLinedInputsWithIconsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleLinedInputsWithIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
