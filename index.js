let Tonic
try {
  Tonic = require('@optoolco/tonic')
} catch (err) {
  console.error('Missing dependency. Try `npm install @optoolco/tonic`.')
  throw err
}

const version = Tonic.version
const major = version ? version.split('.')[0] : '0'
const minor = version ? version.split('.')[1] : '0'
if (parseInt(major, 10) < 11) {
  console.error('Out of data dependency. Try `npm install @optoolco/tonic@11`.')
  throw new Error('Invalid Tonic version. requires at least v11')
}
if (parseInt(minor, 10) < 1) {
  console.error('Out of data dependency. Try `npm install @optoolco/tonic@11.1`.')
  throw new Error('Invalid Tonic version. requires at least v11.1')
}

const mode = require('./mode')

const { TonicAccordion, TonicAccordionSection } = require('./accordion')
const { TonicBadge } = require('./badge')
const { TonicButton } = require('./button')
const { TonicChart } = require('./chart')
const { TonicCheckbox } = require('./checkbox')
const { Dialog } = require('./dialog')
const { TonicForm } = require('./form')
const { TonicIcon } = require('./icon')
const { TonicInput } = require('./input')
const { Panel } = require('./panel')
const { TonicPopover } = require('./popover')
const { TonicProfileImage } = require('./profile-image')
const { TonicProgressBar } = require('./progress-bar')
const { TonicRange } = require('./range')
const { TonicRelativeTime } = require('./relative-time')
const { TonicRouter } = require('./router')
const { TonicSelect } = require('./select')
const { TonicSprite } = require('./sprite')
const { TonicTabs, TonicTabPanel } = require('./tabs')
const { TonicTextarea } = require('./textarea')
const { TonicToaster } = require('./toaster')
const { TonicToasterInline } = require('./toaster-inline')
const { TonicToggle } = require('./toggle')
const { TonicTooltip } = require('./tooltip')

//
// An example collection of components.
//
module.exports = components
// For supporting unpkg / dist / jsfiddle.
components.Tonic = Tonic

function components (Tonic, opts) {
  if (opts && opts.strict === true) {
    mode.strict = true
  }

  Tonic.add(TonicAccordion)
  Tonic.add(TonicAccordionSection)
  Tonic.add(TonicBadge)
  Tonic.add(TonicButton)
  Tonic.add(TonicChart)
  Tonic.add(TonicCheckbox)
  Tonic.addStyles(Dialog)
  Tonic.add(TonicForm)
  Tonic.add(TonicInput)
  Tonic.add(TonicIcon)
  Tonic.addStyles(Panel)
  Tonic.add(TonicPopover)
  Tonic.add(TonicProfileImage)
  Tonic.add(TonicProgressBar)
  Tonic.add(TonicRange)
  Tonic.add(TonicRelativeTime)
  Tonic.add(TonicRouter)
  Tonic.add(TonicSelect)
  Tonic.add(TonicSprite)
  Tonic.add(TonicTabs)
  Tonic.add(TonicTabPanel)
  Tonic.add(TonicTextarea)
  Tonic.add(TonicTooltip)
  Tonic.add(TonicToasterInline)
  Tonic.add(TonicToaster)
  Tonic.add(TonicToggle)
}
