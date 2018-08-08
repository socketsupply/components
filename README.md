![logo](https://raw.githubusercontent.com/hxoht/tonic/addimage/readme-tonic.png)

# SYNOPSIS
A collection of components built with [Tonic](https://github.com/hxoht/tonic).

# USAGE
You can use `npx` to create build artifacts in your project.

```bash
npx hxoht/components --js ./path/for/js --css ./path/for/css
```

You can build a subset of componenets by supplying a list of
tag-names (separated by spaces).

```bash
npx hxoht/components \
  --js ./path/for/js --css ./path/for/css \
  content-dialog content-tabs profile-image
```

Alternatively, you can `npm install hxoht/components`. In a
`package.json` script, do this (which will be faster than using `npx`
if for example you have a fork and you need to re-build your components
frequently)...

```json
{
  "scripts": {
    "build": "components --js ./path/for/js --css ./path/fo/css"
  }
}
```

# DEVELOPMENT

```bash
npm install
npm run build && npm run dev
```

