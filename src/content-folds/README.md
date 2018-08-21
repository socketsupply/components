# ContentFolds
The component `ContentFolds` creates an accordion menu of "folds" which each open when clicked on.

## Demo

%html%

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <content-folds id="fold-example" allow-multiple="false">
      <content-fold
        class="open"
        name="sample-fold-1">
        <!-- Content -->
      </content-fold>
    </content-folds>
  </div>
</div>

## Code

#### HTML
```html
<content-folds id="fold-example" allow-multiple="false">
  <content-fold
    class="open"
    name="sample-fold-1">
    <!-- Content -->
  </content-fold>
</content-folds>
```

## Api

### Properties

The following are properties for the parent `content-folds`

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds an `id` attribute. |  |

The following are properties for the child `content-fold`

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `name` | *string* | Adds a `name` attribute. |  |


### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `expand()` | Open the current fold. |
| `collapse()` | Close the current fold. |
| `collapseAll()` | Collapse all folds. |
| `expandAll()` | Expand all folds. |
