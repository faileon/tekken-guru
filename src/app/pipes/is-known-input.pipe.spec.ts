import { IsKnownInputPipe } from './is-known-input.pipe';

describe('IsKnownInputPipe', () => {
  it('create an instance', () => {
    const pipe = new IsKnownInputPipe();
    expect(pipe).toBeTruthy();
  });
});
