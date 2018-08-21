class ContentFolds extends Tonic { /* global Tonic */
  defaults () {
    return {}
  }

  qs (s, p) {
    return (p || document).querySelector(s)
  }

  render () {
    const {
      id
    } = this.props

    const idAttr = id ? `id="${id}"` : ''

    const folds = this.root.innerHTML

    return `
      <div class="wrapper" ${idAttr}>
        ${folds}
      </div>
    `
  }
}

Tonic.add(ContentFolds)
