# CSS Lazy Loading Background

Lazy loading CSS background isn't available out of the box in the browser. Therefore this package should help to achieve that.

## Demo

[CSS Lazy Loading Background](https://www.sitelint.com/lab/css-background-lazy-loading/)

## Getting started

First download the package:

```bash
npm install @sitelintcode/css-lazy-loading-background --save
```

### Setting up the image

#### CSS

Specify the whole image URL in `--background-image-lazy:`, but without `url()`, as normally you would use.


Example usage:

```CSS
  --background-image-lazy: prague-3010406_1920_thumbnail.jpeg;
  background-image: var(--background-image-lazy);
```

#### HTML and attribute `data-lazy-background`

Eventually, if you want to use as the attribute `data-lazy-background` then:

```HTML
  <div class="example-data-lazy-background" data-lazy-background="san-francisco-panorama.jpg"></div>
```

### TypeScript

```TypeScript
  import CssLazyLoadingBackground from '@sitelintcode/css-lazy-loading-background';

  const cssLazyLoadingBackground: CssLazyLoadingBackground = new CssLazyLoadingBackground();

  cssLazyLoadingBackground.initialise();
```

The `initialise` method will automatically be applied based on `document.readyState` and if the page isn't loaded yet then use `DOMContentLoaded` event.

### JavaScript

The package is also exposed to the global object (`window` in the browser) so you can use it in following way:

```HTML
  <script>
    (function() {
      const cssLazyLoadingBackground = new window['css-lazy-loading-background'].CssLazyLoadingBackground();

      cssLazyLoadingBackground.initialise();
    }());
  </script>
```

## Technical

1. `import { terser } from "rollup-plugin-terser";` was replaced with  `import { terser } from "rollup-plugin-minification";` because `rollup-plugin-terser` is not compatible with Rollup 3.x version. See: https://github.com/TrySound/rollup-plugin-terser/issues/119

## Contributing

Contributions are welcome, and greatly appreciated! Contributing doesn't just mean submitting pull requests. There are many different ways for you to get involved, including answering questions on the issues, reporting or triaging bugs, and participating in the features evolution process.

## License

MOZILLA PUBLIC LICENSE, VERSION 2.0
