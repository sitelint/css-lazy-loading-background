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


/*
 * Other objects can be added as well
 * Other clones: https://github.com/pvorb/clone/blob/master/clone.js, https://github.com/angular/angular.js/blob/master/src/Angular.js#L453
 */
const clonePolyfill = (o) => {
  const gdcc = '__getDeepCircularCopy__';
  let result;

  if (o !== Object(o)) {
    return o;
  }

  const set = gdcc in o;
  const cache = o[gdcc];

  if (set && typeof cache === 'function') {
    return cache();
  }
  // else
  o[gdcc] = function() {
    return result;
  }; // overwrite

  if (Object.getPrototypeOf(o) === null) {
    return o;
  }

  if (Array.isArray(o)) {
    const cloneArray = (a) => {
      if (typeof a === 'object') {
        if (a === null) {
          return a;
        }

        return Object.assign({}, a);
      }

      return a;
    };

    result = o.map(cloneArray);

  } else if (Object.getPrototypeOf(o).constructor.name.toLowerCase() === 'date') {
    return new Date(o.valueOf());
  } else if (Object.getPrototypeOf(o).constructor.name.toLowerCase() === 'regexp') {
    return new RegExp(o);
  } else {
    result = {};
    for (const prop in o) {
      if (prop !== gdcc) {
        result[prop] = clonePolyfill(o[prop]);
      } else if (set) {
        result[prop] = clonePolyfill(cache);
      }
    }
  }

  if (set) {
    o[gdcc] = cache; // reset
  } else {
    delete o[gdcc]; // unset again
  }

  return result;
};

// structuredClone polyfill
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = clonePolyfill;
}

if (('requestIdleCallback' in globalThis) === false) {
  globalThis.requestIdleCallback = function (cb) {
    const start = Date.now();

    return globalThis.setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1);
  };

  globalThis.cancelIdleCallback = function (id) {
    clearTimeout(id);
  };
}

jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
  top: 0,
  left: 0,
  width: 10,
  height: 10
}));

Object.defineProperty(window.screen, 'orientation', {
  value: {
    angle: 0,
    onchange: null,
    type: "landscape-primary"
  },
  writable: true
});
