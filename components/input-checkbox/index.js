const Tonic = typeof require === 'function'
  ? require('tonic') : window.Tonic

class InputCheckbox extends Tonic {
  constructor () {
    super()
    this.stylesheet = `
      * {
        box-sizing: border-box;
      }
      input[type="checkbox"] {
        display: none;
      }
      `

    this.props = {
      checked: false,
      changed: false
    }

    this.defaults = {
      color: 'red',
      checked: false,
      width: '25px',
      height: '25px'
    }
  }

  click (e) {
    if (!e.target.matches('input-checkbox')) return
    this.setProps(props => ({
      ...this.props,
      checked: !props.checked
    }))
  }

  updated (oldProps) {
    if (oldProps.checked !== this.props.checked) {
      this.dispatchEvent(new window.Event('change'))
    }
  }

  render () {
    const {
      color,
      id,
      checked,
      width,
      name,
      height
    } = { ...this.defaults, ...this.props }

    const state = checked ? 'on' : 'off'
    const checkedProperty = checked ? 'checked' : ''
    const nameProperty = name ? `name="${name}"` : ''

    return `
      <div class="wrapper">
        <input id="${id}" ${nameProperty} type="checkbox" ${checkedProperty}/>
        <label for="${id}">
          ${InputCheckbox._svg[state]({ width, height, color })}
        </label>
      </div>
    `
  }
}

InputCheckbox._svgProps = `version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"`
InputCheckbox._svg = {}
InputCheckbox._svg.on = ({ width, height, color }) => `
  <svg ${InputCheckbox._svgProps} x="0px" y="0px" width="${width}" height="${height}" viewBox="0 0 100 100" xml:space="preserve">
   <path fill="${color}" d="M49.5,64.2c0.1,0.1,0.2,0.1,0.4,0.1s0.3-0.1,0.4-0.1l12.4-12.4c0.1-0.1,0.1-0.2,0.1-0.4s-0.1-0.3-0.1-0.4l-2.1-2.1
    	c-0.2-0.2-0.5-0.2-0.7,0l-7.9,7.9V27c0-0.3-0.2-0.5-0.5-0.5h-3c-0.3,0-0.5,0.2-0.5,0.5v29.8L40,48.9c-0.1-0.1-0.2-0.1-0.4-0.1
    	s-0.3,0.1-0.4,0.1l-2.1,2.1c-0.2,0.2-0.2,0.5,0,0.7L49.5,64.2z"/>
      <path fill="${color}" d="M68.9,69h-38c-0.3,0-0.5,0.2-0.5,0.5v3c0,0.3,0.2,0.5,0.5,0.5h38c0.3,0,0.5-0.2,0.5-0.5v-3C69.4,69.2,69.2,69,68.9,69z"/>
  </svg>
`

InputCheckbox._svg.off = ({ width, height, color }) => `
  <svg ${InputCheckbox._svgProps} x="0px" y="0px" width="${width}" height="${height}" viewBox="0 0 100 100" xml:space="preserve">
    <path fill="${color}" d="M80.7,22.6l-3.5-3.5c-0.1-0.1-0.3-0.1-0.4,0L50,45.9L23.2,19.1c-0.1-0.1-0.3-0.1-0.4,0l-3.5,3.5c-0.1,0.1-0.1,0.3,0,0.4
    	l26.8,26.8L19.3,76.6c-0.1,0.1-0.1,0.3,0,0.4l3.5,3.5c0,0,0.1,0.1,0.2,0.1s0.1,0,0.2-0.1L50,53.6l25.9,25.9c0.1,0.1,0.3,0.1,0.4,0
    	l3.5-3.5c0.1-0.1,0.1-0.3,0-0.4L53.9,49.8l26.8-26.8C80.8,22.8,80.8,22.7,80.7,22.6z"/>
   </svg>
`

Tonic.add(InputCheckbox, { shadow: true })
