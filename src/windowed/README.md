# Windowed
A component used for large lists of data.

## Demo

<div class="example">
  <div class="header">Example</div>
  <div class="content">
    <my-windowed debut="true">
    </my-windoed>
  </div>
</div>

%html%

<style>
  my-windowed .outer {
    height: 300px;
    width: 400px;
    overflow: auto;
  }

  my-windowed .inner {
    position: relative;
  }

  my-windowed .tr {
    height: 30px;
    overflow: hidden;
  }

  my-windowed .td {
    white-space: nowrap;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100px;
    font-family: var(--monospace);
    font-size: 14px;
  }

</style>
