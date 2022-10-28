import headers from './headers'
const { baseUrl } = getApp().globalData

interface Props extends WechatMiniprogram.RequestOption {
  params?: string | {}
  prefix?: string
}

const resolveParams = (paramsObj: any) => {
  let params = ''
  if (paramsObj) {
    let check = Object.keys(paramsObj)[0]
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        const element = paramsObj[key]
        if (check === key) {
          params = params + `${key}=${element}`
        } else {
          params = params + `&${key}=${element}`
        }
      }
    }
  }
  return params ? '?' + params : ''
}

const fetch = <T>(config: Props): Promise<T> => {
  const params = resolveParams(config.params)
  const _url = `${baseUrl}${config.prefix}${config.url}${params}`
  return new Promise((resolve, reject) => {
    wx.request({
      ...config,
      timeout: 5000,
      url: _url,
      header: headers(),
      success: ({
        data: responese,
      }: WechatMiniprogram.RequestSuccessCallbackResult<API.ResData<T>>) => {
        const { code, data, msg } = responese
        switch (code) {
          case '00000':
            resolve(data)
            break
          case 'wallet006':
            reject(code)
            break
          default:
            reject(msg ?? '请求失败')
            break
        }
      },
      fail: reject,
    })
  })
}

export default fetch
