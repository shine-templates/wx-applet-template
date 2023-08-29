import autoSelectLink, { images } from './utils/env'
import updateApplet from './utils/updateApplet'
import './lib/loadshFixed'

App<IAppOption>({
  globalData: {
    baseUrl: autoSelectLink(true),
    images,
  },
  onShow() {
    updateApplet()
  },
})
