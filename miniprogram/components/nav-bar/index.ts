const image = getApp().globalData.images
const icons = [
  `${image}comm/go-back-black.png`,
  `${image}comm/go-back-white.png`,
]

const leftIconObject: {
  [key: string]: string
} = {
  black: `${image}comm/go-back-black.png`,
  white: `${image}comm/go-back-white.png`,
}

const homeIconObject: {
  [key: string]: string
} = {
  black: `${image}comm/home.png`,
  white: `${image}comm/home-white.png`,
}

Component({
  options: {
    multipleSlots: true,
  },
  externalClasses: [
    't-class',
    't-class-title',
    't-class-left-icon',
    't-class-home-icon',
    't-class-capsule',
    'left-icon-wrapper',
    'left-home-wrapper',
  ],
  properties: {
    title: {
      type: String,
      default: '',
    },
    // 是否显示主页按钮
    showHome: {
      type: String,
      default: '',
    },
    // 返回按钮颜色 // black or white
    leftIconColor: {
      type: String,
      observer(data) {
        this.setData({ icon: leftIconObject[data] || leftIconObject['black'] })
      },
    },
    // home 按钮颜色 // black or white
    homeIconColor: {
      type: String,
      observer(data) {
        this.setData({
          homeIcon: homeIconObject[data] || homeIconObject['black'],
        })
      },
    },
    background: {
      type: String,
      default: '',
    },
    delta: {
      type: Number,
      default: 1,
    },
  },
  data: {
    icon: '',
    homeIcon: '',
  },
  methods: {
    onGoBack() {
      const pages = getCurrentPages().length
      const delta = this.data.delta
      if (delta !== 1) {
        wx.navigateBack({
          delta,
        })
      } else {
        wx.navigateBack({
          delta: pages,
        })
      }
    },
    onGoHome() {
      wx.reLaunch({
        url: '/pages/home/index',
      })
    },
  },
})
