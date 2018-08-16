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

If you want to produce build artifacts (like the base css), you can either
create a build script, or use `npx`.

```json
{
  "scripts": {
    "build": "components --js ./path/for/js --css ./path/fo/css"
  }
}
```

```bash
npx hxoht/components --js ./path/for/js --css ./path/for/css
```

You can also build a subset of componenets by supplying a list of tag-names
(separated by spaces).

```bash
npx hxoht/components \
  --js ./path/for/js --css ./path/for/css \
  content-dialog content-tabs profile-image
```

# DEVELOPMENT

```bash
npm install
npm run build && npm run dev
```

