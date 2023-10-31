import { TestBed } from '@angular/core/testing';

import { FoodGuard } from './food.guard';

describe('FoodGuard', () => {
  let guard: FoodGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FoodGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
