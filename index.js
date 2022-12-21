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

  Tonic.add(TonicAccordion)
  Tonic.add(TonicAccordionSection)
  Tonic.add(TonicBadge)
  Tonic.add(TonicButton)
  Tonic.add(TonicChart)
  Tonic.add(TonicCheckbox)
  Tonic.add(TonicDialog)
  Tonic.add(TonicForm)
  Tonic.add(TonicInput)
  Tonic.add(TonicIcon)
  Tonic.add(TonicLoader)
  Tonic.add(TonicPanel)
  Tonic.add(TonicPopover)
  Tonic.add(TonicProfileImage)
  Tonic.add(TonicProgressBar)
  Tonic.add(TonicRange)
  Tonic.add(TonicRelativeTime)
  Tonic.add(TonicRouter)
  Tonic.add(TonicSelect)
  Tonic.add(TonicSprite)
  Tonic.add(TonicSplit)
  Tonic.add(TonicSplitLeft)
  Tonic.add(TonicSplitRight)
  Tonic.add(TonicSplitTop)
  Tonic.add(TonicSplitBottom)
  Tonic.add(TonicTabPanel)
  Tonic.add(TonicTab)
  Tonic.add(TonicTabs)
  Tonic.add(TonicTextarea)
  Tonic.add(TonicTooltip)
  Tonic.add(TonicToasterInline)
  Tonic.add(TonicToaster)
  Tonic.add(TonicToggle)
}
