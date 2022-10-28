import { getValues } from './utils/util'
import autoSelectLink, { images } from './utils/env'
import updateApplet from './utils/updateApplet'
import './lib/loadshFixed'

App<IAppOption>({
  globalData: {
    getValues,
    baseUrl: autoSelectLink(true),
    images,
  },
  onShow() {
    updateApplet()
  },
})
