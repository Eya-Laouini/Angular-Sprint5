import { ComponentFixture, TestBed } from '@angular/core/testing';

import { foodComponent } from './food.component';

describe('FoodComponent', () => {
  let component: foodComponent;
  let fixture: ComponentFixture<foodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ foodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(foodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
