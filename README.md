# SYNOPSIS
A bundle of example components built with [Tonic](https://github.com/hxoht/tonic).

![](https://github.com/optoolco/components/workflows/ci/badge.svg)

# USAGE
To use this repo, install the following dependencies, then require the components
module once from your bundle. This will attach all the components to Tonic. Then,
require tonic wherever you want to use it.

```bash
npm install @optoolco/tonic
npm install @optoolco/components
```

#### INCLUDE INDIVIDUAL COMPONENTS

```js
const Tonic = require('@optoolco/tonic')
const { TonicInput } = require('@optoolco/components/input')
const { TonicIcon } = require('@optoolco/components/icon')

Tonic.add(TonicInput)
Tonic.add(TonicIcon)
```

#### INCLUDE COMPONENT COLLECTION

```js
const Tonic = require('@optoolco/tonic')
const bundle = require('@optoolco/components')

bundle(Tonic)
```

### THEME
Tonic uses CSS variables (which work in all major browsers) to theme components.
The following variables are observed but are not required.

#### FONTS
```css
body {
  --tonic-body: 'Avenir-Light', sans-serif; // Body font
  --tonic-header: 'Avenir-Light', sans-serif; // Header font
  --tonic-subheader: 'Avenir-Medium', sans-serif; // Accent font
  --tonic-monospace: 'IBM Plex Mono', monospace; // Monospace font
}
```

#### LIGHT THEME (DEFAULT)

```css
body, *[theme="light"] {
  --tonic-window: rgba(255, 255, 255, 1);
  --tonic-primary: rgba(54, 57, 61, 1);
  --tonic-disabled: rgba(152, 161, 175, 1);
  --tonic-secondary: rgba(232, 232, 228, 1);
  --tonic-medium: rgba(153, 157, 160, 1);
  --tonic-accent: rgba(240, 102, 83, 1);
  --tonic-button: rgba(54, 57, 61, 1);
  --tonic-border: rgba(232, 232, 228, 1);
  --tonic-background: rgba(247, 247, 245, 1);
  --tonic-error: rgba(240, 102, 83, 1);
  --tonic-notification: rgba(240, 102, 83, 1);
  --tonic-danger: rgba(240, 102, 83, 1);
  --tonic-success: rgba(133, 178, 116, 1);
  --tonic-warning: rgba(249, 169, 103, 1);
  --tonic-info: rgba(153, 157, 160, 1);
}
```

#### DARK THEME

```css
*[theme="dark"] {
  --tonic-window: rgba(45, 47, 49, 1);
  --tonic-primary: rgba(255, 255, 255, 1);
  --tonic-disabled: rgba(170, 170, 170, 1);
  --tonic-secondary: rgba(195, 195, 195, 1);
  --tonic-medium: rgba(153, 157, 160, 1);
  --tonic-accent: rgba(240, 102, 83, 1);
  --tonic-button: rgba(255, 255, 255, 1);
  --tonic-border: rgb(107, 107, 107);
  --tonic-background: rgba(60, 60, 60, 1);
  --tonic-error: rgba(240, 102, 83, 1);
  --tonic-notification: rgba(240, 102, 83, 1);
  --tonic-caution: rgba(240, 102, 83, 1);
  --tonic-success: rgba(133, 178, 116, 1);
  --tonic-warn: rgba(249, 169, 103, 1);
}
```

# DEVELOPMENT

```bash
npm install
npm run dev
```

Go to:

```
https://localhost:8080/
```


# TEST

```bash
npm run build:test
npm run dev
```

Go to:

```
https://localhost:8080/test.html
```
