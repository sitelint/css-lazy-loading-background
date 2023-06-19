import './polyfills';
import { CommonUtilities } from './utilities/common.utilities';

export class CssLazyLoadingBackground {
  private lazyBackgroundObserver: IntersectionObserver | null;
  private isIntersectionObserverSupported: boolean;
  private processEntriesBindInstance: any;

  constructor() {
    this.lazyBackgroundObserver = null;
    this.isIntersectionObserverSupported = CommonUtilities.isHostMethod(globalThis, 'IntersectionObserver');
    this.processEntriesBindInstance = null;
  }

  private loadBackgroundIfElementOnScreen(entry: IntersectionObserverEntry): void {
    if (entry.isIntersecting === false) {
      return;
    }

    const target: HTMLElement = (entry.target as HTMLElement);
    const backgroundImageLazy: string = globalThis.getComputedStyle(target).getPropertyValue('--background-image-lazy');

    if (backgroundImageLazy.length === 0) {
      return;
    }

    target.style.backgroundImage = `url('${backgroundImageLazy.replace(/(?:\\(.))/g, '$1').trim()}')`;
    target.style.removeProperty('--background-image-lazy');
    this.lazyBackgroundObserver!.unobserve(target);
  }

  private processEntries(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      this.loadBackgroundIfElementOnScreen(entry);
    }
  }

  private observeElementVisibility(lazyBackground: Element): void {
    this.lazyBackgroundObserver!.observe(lazyBackground);
  }

  private setBackground(element: Element): void {
    const backgroundImageLazy = globalThis.getComputedStyle(element).getPropertyValue('--background-image-lazy');

    if (backgroundImageLazy.length === 0) {
      return;
    }

    (element as HTMLElement).style.backgroundImage = `url('${backgroundImageLazy.replace(/(?:\\(.))/g, '$1').trim()}')`;
    (element as HTMLElement).style.removeProperty('--background-image-lazy');
  }

  private getLazyBackgroundDetail(element: Element): boolean {
    return globalThis.getComputedStyle(element).getPropertyValue('--background-image-lazy').length > 0;
  }

  private initialiseStyleBackgroundIntersectionObserver(): void {
    const allElements: Element[] = Array.from(document.querySelectorAll('body *'));

    if (allElements.length === 0) {
      return;
    }

    const elementsWithLazyBackground: Element[] = allElements.filter(this.getLazyBackgroundDetail);

    if (elementsWithLazyBackground.length === 0) {
      return;
    }

    if (this.isIntersectionObserverSupported) {
      this.processEntriesBindInstance = this.processEntries.bind(this);
      this.lazyBackgroundObserver = new IntersectionObserver(this.processEntriesBindInstance);

      for (const element of elementsWithLazyBackground) {
        this.observeElementVisibility(element);
      }

      return;
    }

    for (const element of elementsWithLazyBackground) {
      this.setBackground(element);
    }
  }

  public destroy(): void {
    this.processEntriesBindInstance = null;
  }

  public initialise(): void {
    if (typeof document.readyState === 'string' && document.readyState !== 'loading') {
      this.initialiseStyleBackgroundIntersectionObserver();
    } else {
      window.addEventListener('DOMContentLoaded', this.initialiseStyleBackgroundIntersectionObserver, true);
    }
  }
}
