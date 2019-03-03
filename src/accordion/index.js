const Tonic = require('@conductorlab/tonic')
const { qs, qsa } = require('qs')

class Accordion extends Tonic {
  defaults () {
    return {
      dataAllowMultiple: false
    }
  }

  stylesheet () {
    return `
      accordion {
        margin-top: 1px;
        display: block;
      }
    `
  }

  click (e) {
    const trigger = Tonic.match(e.target, '.accordion-header')
    if (!trigger) return

    e.preventDefault()

    const allowMultiple = this.root.hasAttribute('data-allow-multiple')
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true'

    if (!isExpanded && !allowMultiple) {
      const triggers = qsa('.accordion-header', this.root)
      const panels = qsa('.accordion-panel', this.root)

      triggers.forEach(trigger => {
        trigger.setAttribute('aria-expanded', 'false')
      })

      panels.forEach(panel => {
        panel.setAttribute('hidden', '')
      })
    }

    const id = trigger.getAttribute('aria-controls')

    if (isExpanded) {
      trigger.setAttribute('aria-expanded', 'false')
      const currentPanel = qs(`#${id}`)
      currentPanel.setAttribute('hidden', '')
    } else {
      trigger.setAttribute('aria-expanded', 'true')
      const currentPanel = qs(`#${id}`)
      currentPanel.removeAttribute('hidden')
    }
  }

  keydown (e) {
    const trigger = Tonic.match(e.target, 'button.title')
    if (!trigger) return

    const CTRL = e.ctrlKey
    const PAGEUP = e.code === 'PageUp'
    const PAGEDOWN = e.code === 'PageDown'
    const UPARROW = e.code === 'ArrowUp'
    const DOWNARROW = e.code === 'ArrowDown'
    const END = e.metaKey && e.code === 'ArrowDown'
    const HOME = e.metaKey && e.code === 'ArrowUp'

    const ctrlModifier = CTRL && (PAGEUP || PAGEDOWN)
    const triggers = qsa('button.title', this.root)

    if ((UPARROW || DOWNARROW) || ctrlModifier) {
      const index = triggers.indexOf(e.target)
      const direction = (PAGEDOWN || DOWNARROW) ? 1 : -1
      const length = triggers.length
      const newIndex = (index + length + direction) % length

      triggers[newIndex].focus()
      e.preventDefault()
    }

    if (HOME || END) {
      switch (e.key) {
        case HOME:
          triggers[0].focus()
          break
        case END:
          triggers[triggers.length - 1].focus()
          break
      }
      e.preventDefault()
    }
  }

  render () {
    const {
      dataAllowMultiple
    } = this.props

    if (dataAllowMultiple) this.root.setAttribute('data-allow-multiple', '')

    return this.html`
      ${this.children}
    `
  }
}

Tonic.add(Accordion)

class AccordionSection extends Tonic {
  stylesheet () {
    return `
      accordion-section {
        display: block;
        border-bottom: 1px solid var(--border);
      }

      accordion-section h4 {
        margin: 0;
      }

      accordion-section .accordion-header {
        display: flex;
      }

      accordion-section button {
        font-size: 14px;
        text-align: left;
        padding: 20px;
        position: relative;
        border: 0;
        -webkit-appearance: none;
        outline: none;
      }

      accordion-section button:focus {
        outline: none;
      }

      accordion-section button:focus .label {
        border-bottom: 3px solid Highlight;
      }

      accordion-section [hidden] {
        display: none;
      }

      accordion-section .accordion-panel {
        padding: 10px 50px 20px 20px;
      }

      accordion-section .accordion-header .arrow {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 50px;
      }

      accordion-section .accordion-header .arrow:before {
        content: "";
        width: 8px;
        height: 8px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%) rotate(135deg);
        border-top: 1px solid var(--primary);
        border-right: 1px solid var(--primary);
      }

      accordion-section .accordion-header[aria-expanded="true"] .arrow:before {
        transform: translateY(-50%) translateX(-50%) rotate(315deg);
        margin-top: 3px;
      }
    `
  }

  render () {
    const {
      id,
      name,
      label
    } = this.props

    return this.html`
      <h4
        class="accordion-header"
        id="accordion-header-${id}"
        name="${name}"
        role="heading"
        aria-expanded="false"
        aria-controls="accordion-panel-${id}">
        <button class="title">
          <span class="label">${label}</span>
          <span class="arrow"></span>
        </button>
      </h4>
      <div
        class="accordion-panel"
        id="accordion-panel-${id}"
        aria-labelledby="accordion-header-${id}"
        role="region"
        hidden>
        ${this.children}
      </div>
    `
  }
}

Tonic.add(AccordionSection)
