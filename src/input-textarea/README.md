# InputTextarea

The component `InputTextarea` creates a text area.

## Demo

<table class="example">
  <thead>
    <tr>
      <th>Example</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input-textarea></input-textarea></td>
      <td>
        <span id="textarea-tooltip-1">
          Default Text area
        </span>
      </td>
    </tr>
    <tr>
      <td><input-textarea resize="none"></input-textarea></td>
      <td>
        <span id="textarea-tooltip-2">
          Text area without resize
        </span>
      </td>
    </tr>
    <tr>
      <td><input-textarea placeholder="Type in me"></input-textarea></td>
      <td>
        <span id="textarea-tooltip-3">
          Default Text area with placeholder
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <input-textarea label="Label">-----BEGIN RSA PRIVATE KEY-----
MIIJKQIBAAKCAgEApbbV5/5tQihBemiceFEbBv7olUAnzwpTLQExUnmEF45XqPJO
xDnpNDqIYjkx/aHyc8OsBSyZWkNMLmoaMGDfZ7rPWEtUoXj8nK4PY4QcpYq9/Dtr
zXhcHsrZA1Sq8VE/FxqV8NsoKb+rAL3ZqfPZ2A41PJ0OND+vPaUQ/+z0FOMUWr/+
8uDrE0dZphVMNTrmrt/nbPLWh7IGLPxoy3Rrd5e+Nh660ndapjQU0XP71S6DVJ5B
iqclwg8aJP68sDqvLwbzUae5j0pAzPq/NTiESarxQMeBxHeePLPcxPoWC7+HVBKp
+fBBcogKeeGGa3XLO1cIJDmV4YeJj4VRgallkVzri4JAwSA2UArC5WfGmmBzKRE3
DQOpwmgVzh0l4D4WxEC+Zgg181JacsahBmgxZxtMVFZ4yT+nW5TMHRo1lSTS...
-----END RSA PRIVATE KEY-----</input-textarea>
      </td>
      <td>
        <span id="textarea-tooltip-4">
          Text area with label and content
        </span>
      </td>
    </tr>
    <tr>
      <td><input-textarea label="Disabled Text Area" disabled></input-textarea></td>
      <td>
        <span id="textarea-tooltip-5">
          Text area with <code>disabled</code> attribute and label
        </span>
      </td>
    </tr>
  </tbody>
</table>

%html%

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Text area with `id` attribute | |
| `name` | *string* | Text area with `name` attribute | |
| `placeholder` | *string* | Add placeholder to text area |  |
| `spellcheck` | *boolean* | Enable spellcheck | `true` |
| `disabled` | *boolean* | Text area with `disabled` attribute | `false` |
| `required` | *boolean* | Set text area to `required` | `false` |
| `readonly` | *boolean* | Set text area to `readonly` | `false` |
| `autofocus` | *boolean* | Enable `autofocus` on the text area | `false` |
| `resize` | *string* | Set to `none` to disable resize | |
| `rows` | *string* | Set number of rows |  |
| `cols` | *string* | Set number of columns |  |
| `minlength` | *string* | Set minimum character length |  |
| `maxlength` | *string* | Set maximum character length |  |
| `width` | *string* | Set width of text area |  |
| `height` | *string* | Set height of text area | `100%` |
| `radius` | *string* | Set radius of text area | `2px` |
| `theme` | *string* | Adds a theme color (`light`, `dark` or whatever is defined in your base CSS. | `light` |
