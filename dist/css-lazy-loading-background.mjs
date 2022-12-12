if (typeof globalThis === 'undefined') {
    Object.defineProperty(Object.prototype, '__magic__', {
        configurable: true,
        get: function () {
            return this;
        }
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
}

class CommonUtilities {
    static isHostMethod(obj, method) {
        if (!obj) {
            return false;
        }
        const t = typeof obj[method];
        return this.reUnknown.test(t) || (this.reMethod.test(t) && Boolean(obj)) || false;
    }
}
CommonUtilities.reMethod = /^(function|object)$/;
CommonUtilities.reUnknown = /^unknown$/;

class CssLazyLoadingBackground {
    constructor() {
        this.lazyBackgroundObserver = null;
        this.isIntersectionObserverSupported = CommonUtilities.isHostMethod(globalThis, 'IntersectionObserver');
    }
    initialise() {
        const initialiseStyleBackgroundIntersectionObserver = () => {
            const lazyBackgrounds = Array.from(document.querySelectorAll('*'));
            if (lazyBackgrounds.length === 0) {
                return;
            }
            const loadBackgroundIfElementOnScreen = (entry) => {
                if (entry.isIntersecting === false) {
                    return;
                }
                const target = entry.target;
                const backgroundImageLazy = globalThis.getComputedStyle(target).getPropertyValue('--background-image-lazy');
                if (backgroundImageLazy.length === 0) {
                    return;
                }
                target.style.backgroundImage = `url('${backgroundImageLazy}')`;
                this.lazyBackgroundObserver.unobserve(target);
            };
            const observeElementVisibility = (lazyBackground) => {
                this.lazyBackgroundObserver.observe(lazyBackground);
            };
            const setBackground = (element) => {
                const backgroundImageLazy = globalThis.getComputedStyle(element).getPropertyValue('--background-image-lazy');
                if (backgroundImageLazy === null) {
                    return;
                }
                element.style.backgroundImage = `url('${backgroundImageLazy}')`;
            };
            if (this.isIntersectionObserverSupported) {
                this.lazyBackgroundObserver = new IntersectionObserver((entries) => {
                    entries.forEach(loadBackgroundIfElementOnScreen);
                });
                lazyBackgrounds.forEach(observeElementVisibility);
            }
            else {
                lazyBackgrounds.forEach(setBackground);
            }
        };
        if (typeof document.readyState === 'string' && document.readyState === 'complete') {
            initialiseStyleBackgroundIntersectionObserver();
        }
        else {
            document.addEventListener('DOMContentLoaded', initialiseStyleBackgroundIntersectionObserver, true);
        }
    }
}

export { CssLazyLoadingBackground };
