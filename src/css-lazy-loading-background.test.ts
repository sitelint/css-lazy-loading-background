import { CssLazyLoadingBackground } from './css-lazy-loading-background';

describe('CssLazyLoadingBackground', () => {
  let cssLazyLoadingBackground: CssLazyLoadingBackground;

  beforeEach(() => {
    cssLazyLoadingBackground = new CssLazyLoadingBackground();
  });

  it('should determine the instance', () => {
    const instance: CssLazyLoadingBackground = new CssLazyLoadingBackground();

    expect(instance).toBeDefined();
  });

});
