![logo](https://raw.githubusercontent.com/hxoht/tonic/addimage/readme-tonic.png)

# SYNOPSIS
A collection of components built with [Tonic](https://github.com/hxoht/tonic).

# USAGE
This repo demonstrates how to bundle multiple components, a single component
could be an npm module.

```bash
npm install @conductorlab/tonic @conductorlab/components
```

```js
const Tonic = require('tonic')
const components = require('components')(Tonic)
```

### THEME
Tonic uses CSS variables (which work in all major browsers) to theme components.
The following variables are observed but are not required.

#### FONTS
```css
body {
  --body: 'Avenir-Light', sans-serif; // Body font
  --header: 'Avenir-Light', sans-serif; // Header font
  --subheader: 'Avenir-Medium', sans-serif; // Accent font
  --monospace: 'IBM Plex Mono', monospace; // Monospace font
}
```

#### LIGHT THEME (DEFAULT)

```css
body, *[theme="light"] {
  --window: rgba(255, 255, 255, 1); // Base window color
  --primary: rgba(54, 57, 61, 1); // Primary font and contrast
  --disabled: rgba(152, 161, 175, 1);
  --secondary: rgba(232, 232, 228, 1);
  --medium: rgba(153, 157, 160, 1);
  --accent: rgba(240, 102, 83, 1); // Accent color
  --button: rgba(54, 57, 61, 1); // Button color
  --border: rgba(232, 232, 228, 1); // Border color
  --background: rgba(247, 247, 245, 1);
  --error: rgba(240, 102, 83, 1); // Error color
  --notification: rgba(240, 102, 83, 1); // Notification Badge Color
  --danger: rgba(240, 102, 83, 1); // Alert: Caution
  --success: rgba(133, 178, 116, 1); // Alert: Success
  --warning: rgba(249, 169, 103, 1); // Alert: Warning
  --info: rgba(153, 157, 160, 1); // Alert: Warning
}
```

#### DARK THEME

```css
body.theme-dark, *[theme="dark"] {
  --window: rgba(45, 47, 49, 1); // Base window color
  --primary: rgba(255, 255, 255, 1); // Primary font and contrast
  --disabled: rgba(170, 170, 170, 1); // Primary font and contrast
  --secondary: rgba(195, 195, 195, 1);
  --medium: rgba(153, 157, 160, 1);
  --accent: rgba(240, 102, 83, 1); // Accent color
  --button: rgba(255, 255, 255, 1); // Button color
  --border: rgb(107, 107, 107); // Border color
  --background: rgba(60, 60, 60, 1);
  --error: rgba(240, 102, 83, 1); // Error color
  --notification: rgba(240, 102, 83, 1); // Notification Badge Color
  --caution: rgba(240, 102, 83, 1); // Alert: Caution
  --success: rgba(133, 178, 116, 1); // Alert: Success
  --warn: rgba(249, 169, 103, 1); // Alert: Warning
}
```

# DEVELOPMENT

```bash
npm install
npm run dev
```
