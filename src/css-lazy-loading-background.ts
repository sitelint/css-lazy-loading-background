import './polyfills';
import { CommonUtilities } from './utilities/common.utilities';

export class CssLazyLoadingBackground {
  private lazyBackgroundObserver: IntersectionObserver | null;
  private isIntersectionObserverSupported: boolean;
  private processEntriesBindInstance: any;
  private skipElements: string;

  constructor() {
    this.lazyBackgroundObserver = null;
    this.isIntersectionObserverSupported = CommonUtilities.isHostMethod(globalThis, 'IntersectionObserver');
    this.processEntriesBindInstance = null;

    this.skipElements = `${[
      ':root',
      'base',
      'body',
      'br',
      'code',
      'defs',
      'desc',
      'filter',
      'g',
      'head',
      'hgroup',
      'hr',
      'iframe',
      'img',
      'input',
      'linearGradient',
      'link',
      'mark',
      'meta',
      'noscript',
      'object',
      'option',
      'path',
      'script',
      'stop',
      'style',
      'title'
    ].map((i: string): string => {
      return `:not(${i})`;
    }).join('')}`;
  }

  private loadBackgroundIfElementOnScreen(entry: IntersectionObserverEntry): void {
    if (entry.isIntersecting === false) {
      return;
    }

    const target: HTMLElement = (entry.target as HTMLElement);
    const backgroundImageLazy: string = globalThis.getComputedStyle(target).getPropertyValue('--background-image-lazy');

    if (backgroundImageLazy.length > 0) {
      target.style.setProperty('background-image', `url('${backgroundImageLazy.replace(/(?:\\(.))/g, '$1').trim()}')`);
      target.style.removeProperty('--background-image-lazy');

      this.lazyBackgroundObserver!.unobserve(target);

      return;
    }

    const backgroundImageSetLazy: string = globalThis.getComputedStyle(target).getPropertyValue('--background-image-set-lazy');

    if (backgroundImageSetLazy.length > 0) {
      const backgroundImageValue: string = backgroundImageSetLazy.replace('image-lazy-set', 'image-set');

      target.style.setProperty('background-image', backgroundImageValue);

      return;
    }

    const dataBackgroundImage: string | null = target.getAttribute('data-lazy-background');

    if (typeof dataBackgroundImage === 'string' && dataBackgroundImage.length > 0) {
      target.style.setProperty('background-image', `url('${dataBackgroundImage}')`);
      target.removeAttribute('data-lazy-background');

      this.lazyBackgroundObserver!.unobserve(target);
    }
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

    if (backgroundImageLazy.length > 0) {
      (element as HTMLElement).style.setProperty('background-image', `url('${backgroundImageLazy.replace(/(?:\\(.))/g, '$1').trim()}')`);
      (element as HTMLElement).style.removeProperty('--background-image-lazy');

      return;
    }

    const backgroundImageSetLazy = globalThis.getComputedStyle(element).getPropertyValue('--background-image-set-lazy');

    if (backgroundImageSetLazy.length > 0) {
      const backgroundImageValue: string = backgroundImageSetLazy.replace('image-lazy-set', 'image-set');

      (element as HTMLElement).style.setProperty('background-image', backgroundImageValue);
      (element as HTMLElement).style.removeProperty('--background-image-set-lazy');
    }
  }

  private getLazyBackgroundDetail(element: Element): boolean {
    const backgroundImageLazy: string = globalThis.getComputedStyle(element).getPropertyValue('--background-image-lazy');
    const backgroundImageSetLazy: string = globalThis.getComputedStyle(element).getPropertyValue('--background-image-set-lazy');
    const dataBackgroundImage: string | null = element.getAttribute('data-lazy-background');

    return backgroundImageLazy.length > 0 || backgroundImageSetLazy.length > 0 || typeof dataBackgroundImage === 'string' && dataBackgroundImage.length > 0;
  }

  private initialiseStyleBackgroundIntersectionObserver(): void {
    const allElements: Element[] = Array.from(document.querySelectorAll(`body *${this.skipElements}`));

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
