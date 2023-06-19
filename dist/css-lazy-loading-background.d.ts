declare class CssLazyLoadingBackground {
    private lazyBackgroundObserver;
    private isIntersectionObserverSupported;
    private processEntriesBindInstance;
    private skipElements;
    constructor();
    private loadBackgroundIfElementOnScreen;
    private processEntries;
    private observeElementVisibility;
    private setBackground;
    private getLazyBackgroundDetail;
    private initialiseStyleBackgroundIntersectionObserver;
    destroy(): void;
    initialise(): void;
}

export { CssLazyLoadingBackground };
