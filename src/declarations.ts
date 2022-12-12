import { CssLazyLoadingBackground } from './css-lazy-loading-background';

declare global {
    export type sitelint = CssLazyLoadingBackground;
    export const sitelint: typeof CssLazyLoadingBackground;
}
