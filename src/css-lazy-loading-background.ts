import './polyfills';
import { CommonUtilities } from './utilities/common.utilities';

export class CssLazyLoadingBackground {
  private lazyBackgroundObserver: IntersectionObserver | null;
  private isIntersectionObserverSupported: boolean;

  constructor() {
    this.lazyBackgroundObserver = null;
    this.isIntersectionObserverSupported = CommonUtilities.isHostMethod(globalThis, 'IntersectionObserver');
  }

  public initialise(): void {
    const initialiseStyleBackgroundIntersectionObserver = () => {
      const lazyBackgrounds: Element[] = Array.from(document.querySelectorAll('*'));

      if (lazyBackgrounds.length === 0) {
        return;
      }

      const loadBackgroundIfElementOnScreen = (entry: IntersectionObserverEntry): void => {
        if (entry.isIntersecting === false) {
          return;
        }

        const target: HTMLElement = (entry.target as HTMLElement);
        const backgroundImageLazy: string = globalThis.getComputedStyle(target).getPropertyValue('--background-image-lazy');

        if (backgroundImageLazy.length === 0) {
          return;
        }

        target.style.backgroundImage = `url('${backgroundImageLazy}')`;
        this.lazyBackgroundObserver!.unobserve(target);
      };

      const observeElementVisibility = (lazyBackground: Element): void => {
        this.lazyBackgroundObserver!.observe(lazyBackground);
      };

      const setBackground = (element: Element): void => {
        const backgroundImageLazy = globalThis.getComputedStyle(element).getPropertyValue('--background-image-lazy');

        if (backgroundImageLazy === null) {
          return;
        }

        (element as HTMLElement).style.backgroundImage = `url('${backgroundImageLazy}')`;

      };

      if (this.isIntersectionObserverSupported) {
        this.lazyBackgroundObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
          entries.forEach(loadBackgroundIfElementOnScreen);
        });
        lazyBackgrounds.forEach(observeElementVisibility);
      } else {
        lazyBackgrounds.forEach(setBackground);
      }
    };

    if (typeof document.readyState === 'string' && document.readyState === 'complete') {
      initialiseStyleBackgroundIntersectionObserver();
    } else {
      document.addEventListener('DOMContentLoaded', initialiseStyleBackgroundIntersectionObserver, true);
    }
  }
}
