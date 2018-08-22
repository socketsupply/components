![logo](https://raw.githubusercontent.com/hxoht/tonic/addimage/readme-tonic.png)

# SYNOPSIS
A collection of components built with [Tonic](https://github.com/hxoht/tonic).

# USAGE
You can install the components package with npm and it will bundle `Tonic` into
a single file.

```bash
npm install hxoht/components
```

```js
const Tonic = require('components') // Tonic is bundled in here and is the only export.
```

This package can create build artifacts that you can use in your project. You
can do this in a few different ways using the `components` command.

As an npm script in your `package.json` file...

```json
{
  "scripts": {
    "build": "components --js ./path/for/js --css ./path/fo/css"
  }
}
```

Using the `npx` script that ships with `npm`.

```bash
npx hxoht/components --js ./path/for/js --css ./path/for/css
```

You can build only a subset of components by supplying a list of tag-names
(separated by spaces).

```bash
npx hxoht/components \
  --js ./path/for/js --css ./path/for/css \
  content-dialog content-tabs profile-image
```

If you do not want to inline the CSS for each component, you can generate a
single css file with all of it using the `--no-inline-css` option.

```bash
components --js ./test/js --css ./test/css --no-inline
```

# DEVELOPMENT

```bash
npm install
npm run build && npm run dev
```

