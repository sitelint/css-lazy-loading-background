"undefined"==typeof globalThis&&(Object.defineProperty(Object.prototype,"__magic__",{configurable:!0,get:function(){return this}}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__);class CommonUtilities{static isHostMethod(e,t){if(!e)return!1;const r=typeof e[t];return this.reUnknown.test(r)||this.reMethod.test(r)&&Boolean(e)||!1}}CommonUtilities.reMethod=/^(function|object)$/,CommonUtilities.reUnknown=/^unknown$/;class CssLazyLoadingBackground{constructor(){this.lazyBackgroundObserver=null,this.isIntersectionObserverSupported=CommonUtilities.isHostMethod(globalThis,"IntersectionObserver")}initialise(){const e=()=>{const e=Array.from(document.querySelectorAll("[style*='--background-image-lazy']"));if(0===e.length)return;const t=e=>{if(!1===e.isIntersecting)return;const t=e.target,r=globalThis.getComputedStyle(t).getPropertyValue("--background-image-lazy");0!==r.length&&(t.style.backgroundImage=`url('${r.replace(/(?:\\(.))/g,"$1").trim()}')`,t.style.removeProperty("--background-image-lazy"),this.lazyBackgroundObserver.unobserve(t))},r=e=>{this.lazyBackgroundObserver.observe(e)};if(this.isIntersectionObserverSupported)return this.lazyBackgroundObserver=new IntersectionObserver((e=>{e.forEach(t)})),void e.forEach(r);e.forEach((e=>{const t=globalThis.getComputedStyle(e).getPropertyValue("--background-image-lazy");null!==t&&(e.style.backgroundImage=`url('${t.replace(/(?:\\(.))/g,"$1").trim()}')`,e.style.removeProperty("--background-image-lazy"))}))};"string"==typeof document.readyState&&"complete"===document.readyState?e():document.addEventListener("DOMContentLoaded",e,!0)}}export{CssLazyLoadingBackground};
