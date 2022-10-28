import type { DataOptions } from './type'

Page<DataOptions, WechatMiniprogram.Page.CustomOption>({
  data: {
    scrollTop: 0,
  },

  onPageScroll({ scrollTop }) {
    this.setData({
      scrollTop,
    })
  },
})
