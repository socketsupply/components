![logo](https://raw.githubusercontent.com/hxoht/tonic/addimage/readme-tonic.png)

# SYNOPSIS
A collection of components built with [Tonic](https://github.com/hxoht/tonic).

# USAGE
You can install the components package with npm and it will bundle `Tonic` into a single file.

```bash
npm install @conductorlab/tonic @conductorlab/components
```

```js
const Tonic = require('tonic')
const components = require('components')(Tonic)
```

### PARTIAL BUILDS

You can exclude components by supplying the `--exclude` argument followed by a list of tag-names (separated by spaces and surrounded by quotes).

```bash
npx hxoht/components ./path/to/output.js \
  --exclude 'content-dialog content-tabs profile-image'
```

Or you can include components by supplying the `--include` argument followed
by a list of tag-names (separated by spaces and surrounded by quotes).

```bash
npx hxoht/components ./path/to/output.js \
  --include 'content-dialog content-tabs profile-image'
```

### BOOTSTRAP STYLES
You can generate a CSS file that includes the optional base styles.

```bash
npm hxoht/components --css ./test/output.css
```

# DEVELOPMENT

```bash
npm install
npm run build && npm run dev
```

# TEST

```bash
npm run test:manual
```
