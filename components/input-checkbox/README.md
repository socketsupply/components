# InputCheckbox
Description

## Demo

<input-checkbox
  id="input-checkbox-example">
</input-checkbox>

<label id="input-checkbox-example-label">unchecked</label>

<script>
{
  const checkbox = document.getElementById('input-checkbox-example')
  const label = document.getElementById('input-checkbox-example-label')

  checkbox.addEventListener('change', e => {
    console.log('CHANGE!!!!!!!!!!!!')
    label.textContent = checkbox.props.checked ? 'checked' : 'unchecked'
  })
}
</script>
