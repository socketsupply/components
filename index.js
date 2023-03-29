import Tonic from '@socketsupply/tonic'

import { TonicAccordion, TonicAccordionSection } from './accordion'
import { TonicBadge } from './badge'
import { TonicButton } from './button'
import { TonicChart } from './chart'
import { TonicCheckbox } from './checkbox'
import { TonicDialog } from './dialog'
import { TonicForm } from './form'
import { TonicIcon } from './icon'
import { TonicInput } from './input'
import { TonicLoader } from './loader'
import { TonicPanel } from './panel'
import { TonicPopover } from './popover'
import { TonicProfileImage } from './profile-image'
import { TonicProgressBar } from './progress-bar'
import { TonicRange } from './range'
import { TonicRelativeTime } from './relative-time'
import { TonicRouter } from './router'
import { TonicSelect } from './select'
import { TonicSprite } from './sprite'
import { TonicSplit, TonicSplitLeft, TonicSplitRight, TonicSplitTop, TonicSplitBottom } from './split'
import { TonicTabs, TonicTab, TonicTabPanel } from './tabs'
import { TonicTextarea } from './textarea'
import { TonicTooltip } from './tooltip'
import { TonicToasterInline } from './toaster-inline'
import { TonicToaster } from './toaster'
import { TonicToggle } from './toggle'

const version = Tonic.version
const major = version ? version.split('.')[0] : '0'

if (version && parseInt(major, 10) < 12) {
  console.error('Out of date dependency. Try `npm install @socketsupply/tonic@12`.')
  throw new Error('Invalid Tonic version. requires at least v12')
}

let once = false
// For supporting unpkg / dist / jsfiddle.
Components.Tonic = Tonic

//
// An example collection of components.
//
export function Components (Tonic) {
  if (once) {
    return
  }
  once = true

  Tonic.add(TonicAccordion, 'tonic-accordion')
  Tonic.add(TonicAccordionSection, 'tonic-accordion-section')
  Tonic.add(TonicBadge, 'tonic-badge')
  Tonic.add(TonicButton, 'tonic-button')
  Tonic.add(TonicChart, 'tonic-chart')
  Tonic.add(TonicCheckbox, 'tonic-checkbox')
  Tonic.add(TonicDialog, 'tonic-dialog')
  Tonic.add(TonicForm, 'tonic-form')
  Tonic.add(TonicInput, 'tonic-input')
  Tonic.add(TonicIcon, 'tonic-icon')
  Tonic.add(TonicLoader, 'tonic-loader')
  Tonic.add(TonicPanel, 'tonic-panel')
  Tonic.add(TonicPopover, 'tonic-popover')
  Tonic.add(TonicProfileImage, 'tonic-profile-image')
  Tonic.add(TonicProgressBar, 'tonic-progress-bar')
  Tonic.add(TonicRange, 'tonic-range')
  Tonic.add(TonicRelativeTime, 'tonic-relative-time')
  Tonic.add(TonicRouter, 'tonic-router')
  Tonic.add(TonicSelect, 'tonic-select')
  Tonic.add(TonicSprite, 'tonic-sprite')
  Tonic.add(TonicSplit, 'tonic-split')
  Tonic.add(TonicSplitLeft, 'tonic-split-left')
  Tonic.add(TonicSplitRight, 'tonic-split-right')
  Tonic.add(TonicSplitTop, 'tonic-split-top')
  Tonic.add(TonicSplitBottom, 'tonic-split-bottom')
  Tonic.add(TonicTabPanel, 'tonic-tab-panel')
  Tonic.add(TonicTab, 'tonic-tab')
  Tonic.add(TonicTabs, 'tonic-tabs')
  Tonic.add(TonicTextarea, 'tonic-textarea')
  Tonic.add(TonicTooltip, 'tonic-tooltip')
  Tonic.add(TonicToasterInline, 'tonic-toaster-inline')
  Tonic.add(TonicToaster, 'tonic-toaster')
  Tonic.add(TonicToggle, 'tonic-toggle')
}

export default Components
