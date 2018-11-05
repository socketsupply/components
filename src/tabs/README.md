# Tabs
The `Tabs` component creates a menu that activates sections when clicked on.

## Demo

%html%

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <tonic-tabs group="profile" selected="two">
      <span data-tab-name="one">One</span>
      <span data-tab-name="two">Two</span>
      <span data-tab-name="three">Three</span>
    </tonic-tabs>
    <section data-tab-group="profile" data-tab-name="one">
      Content One
    </section>
    <section data-tab-group="profile" data-tab-name="two">
      Content Two
    </section>
    <section data-tab-group="profile" data-tab-name="three">
      Content Three
    </section>
  </div>
</div>

## Code

Tabs have two important concepts. The idea of a `group` and the idea of a `name`. Each tab in a tab group will have content that is associated by a `name`.

The structure inside the component is arbitrary: spans, links, links inside divs, they can all be different. You just need to add the `data-tab-name` property to the clickable item.

The default tab should be specified using the `selected` property.

#### HTML
```html
<tonic-tabs group="profile" selected="one">
  <span data-tab-name="one">One</span>
  <span data-tab-name="two">Two</span>
  <div class="special-tab">
    <img src="/three.png" data-tab-name="three"/>
  </div>
</tonic-tabs>
```

---

You can use any tag for the content — `section` is a nice one to use — and the tag containing the content can be located anywhere in your document.

#### HTML
```html
<section data-tab-group="profile" data-tab-name="one">
  Content One
</section>

<section data-tab-group="profile" data-tab-name="two">
  Content Two
</section>

<section data-tab-group="profile" data-tab-name="three">
  Content Three
</section>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the `id` attribute. | |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `click()` | Click event. |
