import dayjs from 'dayjs'

export const formatTime = (date: string, template: string) =>
  dayjs(date).format(template)

// 获取 bind:tap 点击事件的值
export const getValues = (value: WechatMiniprogram.BaseEvent) => {
  const { dataset } = value.currentTarget
  let object: any = {}
  Object.keys(dataset).forEach((item) => {
    const { [item]: value } = dataset
    if (Object.prototype.toString.call(value) === '[object Object]') {
      object = { ...value }
    } else {
      object[item] = value
    }
  })

  return object
}

// 获取位置授权
export const getWxLocation = (
  cb: (location: string) => void,
  failCallBack?: () => void,
) => {
  wx.getLocation({
    type: 'gcj02',
    isHighAccuracy: true,
    success(locRes) {
      const location = JSON.stringify({
        latitude: locRes.latitude,
        longitude: locRes.longitude,
      })
      cb(location)
    },
    fail: () => {
      wx.showModal({
        title: '提示',
        content: '请点击确定进入设置页授予位置消息权限',
        success: (res) => {
          if (res.confirm) {
            wx.openSetting({
              success: () => {
                getWxLocation(cb)
              },
              complete() {
                if (!failCallBack) return
                failCallBack()
              },
            })
          } else {
            failCallBack && failCallBack()
          }
        },
      })
    },
  })
}

export const geocoder = (location: string, key: string) => {
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'GET',
      url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${location}&key=${key}&poi_options=address_format=short;radius=100;policy=2`,
      success: resolve,
      fail: reject,
    })
  })
}

export const validateLogin =
  (callback: () => void) => (ctx: any, refresh?: () => void) => {
    const purchaserId = wx.getStorageSync('purchaserId')
    if (purchaserId) {
      callback()
    } else {
      ctx.selectComponent('#login').handleOpen(refresh)
    }
  }

/**
 *
 * 手机号码*加密函数
 * @param {string} phone 电话号
 * @returns
 */
export const phoneEncryption = (phone: string) => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 内置手机号正则字符串
const innerPhoneReg =
  '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'

/**
 * 手机号正则校验
 * @param phone 手机号
 * @param phoneReg 正则字符串
 * @returns true - 校验通过 false - 校验失败
 */
export const phoneRegCheck = (phone: string) => {
  const phoneRegExp = new RegExp(innerPhoneReg)
  return phoneRegExp.test(phone)
}

/**
 *
 * @param num 页面数，默认为1是当前页面，2是上一页面
 * @returns pages 页面对象
 */
export const getContext = (
  num = 1,
): WechatMiniprogram.Page.Instance<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
> => {
  const pages = getCurrentPages()
  return pages[pages.length - num]
}

export const pushMessage = (tmplIds: string[], callback?: () => void) =>
  new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds,
      success: resolve,
      fail: reject,
      complete: () => {
        callback && callback()
      },
    })
  })

export const formatLnglat = () => {
  try {
    const { latitude, longitude } = wx.getStorageSync('location')
    if (latitude) {
      return `${longitude},${latitude}`
    }
    return ''
  } catch (error) {
    return ''
  }
}

export function getRect(
  context: WechatMiniprogram.Component.TrivialInstance,
  selector: string,
) {
  return new Promise<WechatMiniprogram.BoundingClientRectCallbackResult>(
    (resolve) => {
      wx.createSelectorQuery()
        .in(context)
        .select(selector)
        .boundingClientRect()
        .exec((rect = []) => resolve(rect[0]))
    },
  )
}

export function getAllRect(
  context: WechatMiniprogram.Component.TrivialInstance,
  selector: string,
) {
  return new Promise<WechatMiniprogram.BoundingClientRectCallbackResult[]>(
    (resolve) => {
      wx.createSelectorQuery()
        .in(context)
        .selectAll(selector)
        .boundingClientRect()
        .exec((rect = []) => resolve(rect[0]))
    },
  )
}

export const formatRichText = (html: string): string => {
  let newContent = html.replace(/<img[^>]*>/gi, (match: string) => {
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '')
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '')
    match = match
      .replace(/height="[^"]+"/gi, '')
      .replace(/height='[^']+'/gi, '')
    return match
  })
  newContent = newContent.replace(/style="[^"]+"/gi, (match: string) => {
    match = match
      .replace(/width:[^;]+;/gi, 'max-width:100%;')
      .replace(/width:[^;]+;/gi, 'max-width:100%;')
    return match
  })
  newContent = newContent.replace(/<br[^>]*\/>/gi, '')
  newContent = newContent.replace(
    /\<img/gi,
    '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"',
  )
  return newContent
}
