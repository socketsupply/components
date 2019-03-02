const { qs, qsa } = require('qs')

class TonicAccordion extends Tonic { /* global Tonic */
  defaults () {
    return {
      dataAllowMultiple: false
    }
  }

  stylesheet () {
    return `
      tonic-accordion {
        margin-top: 1px;
        display: block;
        border: 1px solid var(--border);
      }
    `
  }

  click (e) {
    const allowMultiple = this.root.hasAttribute('data-allow-multiple')
    const trigger = Tonic.match(e.target, '.tonic--accordion-header')

    if (trigger) {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true'
      const id = trigger.getAttribute('aria-controls')

      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false')
        const currentPanel = qs(`#${id}`)
        currentPanel.setAttribute('hidden', '')
      }

      if (!isExpanded) {
        if (!allowMultiple) {
          const triggers = qsa('.tonic--accordion-header')
          const panels = qsa('.tonic--accordion-panel')

          triggers.forEach(trigger => {
            trigger.setAttribute('aria-expanded', 'false')
          })
          panels.forEach(panel => {
            panel.setAttribute('hidden', '')
          })
        }

        trigger.setAttribute('aria-expanded', 'true')
        const currentPanel = qs(`#${id}`)
        currentPanel.removeAttribute('hidden')
      }
      e.preventDefault()
    }
  }

  keydown (e) {
    const key = e.which.toString()
    const ctrlModifier = (e.ctrlKey && key.match(/33|34/))
    const trigger = Tonic.match(e.target, 'button.tonic--title')

    if (trigger) {
      const triggers = qsa('button.tonic--title')

      if (key.match(/38|40/) || ctrlModifier) {
        const index = triggers.indexOf(e.target)
        const direction = (key.match(/34|40/)) ? 1 : -1
        const length = triggers.length
        const newIndex = (index + length + direction) % length

        triggers[newIndex].focus()
        e.preventDefault()
      }
      if (key.match(/35|36/)) {
        switch (key) {
          case '36':
            triggers[0].focus()
            break
          case '35':
            triggers[triggers.length - 1].focus()
            break
        }
        e.preventDefault()
      }
    }
  }

  render () {
    const {
      dataAllowMultiple,
      theme
    } = this.props

    if (theme) this.root.classList.add(`tonic--theme--${theme}`)
    if (dataAllowMultiple) this.root.setAttribute('data-allow-multiple', '')

    return this.html`
      ${this.children}
    `
  }
}

Tonic.add(TonicAccordion)

class TonicAccordionSection extends Tonic {
  stylesheet () {
    return `
      tonic-accordion-section {
        display: block;
        border-bottom: 1px solid var(--border);
      }

      tonic-accordion-section h4 {
        margin: 0;
      }

      tonic-accordion-section button {
        width: 100%;
        font-size: 14px;
        text-align: left;
        padding: 20px;
        position: relative;
        border: 0;
        -webkit-appearance: none;
        outline: none;
      }

      tonic-accordion-section button:focus {
        outline: none;
      }

      tonic-accordion-section button:focus .tonic--label {
        border-bottom: 3px solid Highlight;
      }

      tonic-accordion-section [hidden] {
        display: none;
      }

      tonic-accordion-section .tonic--accordion-panel {
        padding: 10px 50px 20px 20px;
      }

      tonic-accordion-section .tonic--accordion-header .tonic--arrow {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 50px;
      }

      tonic-accordion-section .tonic--accordion-header .tonic--arrow:before {
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

      tonic-accordion-section .tonic--accordion-header[aria-expanded="true"] .tonic--arrow:before {
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
        class="tonic--accordion-header"
        id="tonic--accordion-header-${id}"
        name="${name}"
        role="heading"
        aria-expanded="false"
        aria-controls="tonic--accordion-panel-${id}">
        <button class="tonic--title">
          <span class="tonic--label">${label}</span>
          <span class="tonic--arrow"></span>
        </button>
      </h4>
      <div
        class="tonic--accordion-panel"
        id="tonic--accordion-panel-${id}"
        aria-labelledby="tonic--accordion-header-${id}"
        role="region"
        hidden>
        ${this.children}
      </div>
    `
  }
}

Tonic.add(TonicAccordionSection)
