// globalThis

if (typeof globalThis === 'undefined') {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Object.prototype, '__magic__', {
    configurable: true,
    get: function () {
      return this;
    }
  });

  /* @ts-ignore */
  __magic__.globalThis = __magic__;

  /* @ts-ignore */
  delete Object.prototype.__magic__;
}
