import { FoodNamePipe } from './food-name.pipe';

describe('FoodNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FoodNamePipe();
    expect(pipe).toBeTruthy();
  });
});
