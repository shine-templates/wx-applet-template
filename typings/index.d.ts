/// <reference path="./types/index.d.ts" />
/// <reference path="../node_modules/mobx-miniprogram/lib/mobx.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo
    getValues: (value: WechatMiniprogram.BaseEvent) => {}
    baseUrl: string
    images: string
  }

  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
}

declare const __wxConfig: {
  envVersion: 'develop' | 'trial' | 'release'
}

declare module 'tdesign-miniprogram/*'
declare module 'mobx-miniprogram-bindings'
declare module 'mobx-miniprogram'

declare namespace API {
  interface ResData<T> {
    code: string
    data: T
    msg: string
  }

  interface ListData<T> {
    records: T[]
    total: number
    [key: string]: any
  }

  interface queryParams {
    page: number
    pageSize: number
  }
}
