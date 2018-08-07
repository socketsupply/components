# ContentTabs
The component `ContentTabs` creates a menu that activates sections when clicked on.

## Demo

<table class="example">
  <thead>
    <tr>
      <th>Example</th>
      <th>Description</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <content-tabs group="profile">
          <a href="#" data-tab-name="one" class="selected">One</a>
          <a href="#" data-tab-name="two">Two</a>
          <a href="#" data-tab-name="three">Three</a>
        </content-tabs>
        <section data-tab-group="profile" data-tab-name="one" class="show">
          Content One
        </section>
        <section data-tab-group="profile" data-tab-name="two">
          Content Two
        </section>
        <section data-tab-group="profile" data-tab-name="three">
          Content Three
        </section>
      </td>
      <td>Default Tab Menu</td>
      <td>
        <icon-container src="./sprite.svg#code"></icon-container>
      </td>
    </tr>
  </tbody>
</table>


## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `id` | *string* | Adds the `id` attribute | |
| `name` | *string* | Adds the `name` attribute | |
| `tabs` | *array* | Lists the clickable tabs | |

### Static Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |

### Instance Methods & Members

| Method | Description |
| :--- | :--- |
| `methodName()` | Description |
