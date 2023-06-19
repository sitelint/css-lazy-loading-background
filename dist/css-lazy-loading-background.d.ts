declare class CssLazyLoadingBackground {
    private lazyBackgroundObserver;
    private isIntersectionObserverSupported;
    private processEntriesBindInstance;
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
