// import { wxPay } from '../service/comm/comm'

// // https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestPayment.html

// const wxPayHandler = (params: { orderId: string }, callback?: () => void) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const data = await wxPay<WechatMiniprogram.RequestPaymentOption>(params)
//       wx.requestPayment({
//         signType: 'MD5',
//         ...data,
//         success: resolve,
//         fail: reject,
//         complete: () => {
//           callback && callback()
//         },
//       })
//     } catch (error) {
//       reject(error)
//     }
//   })
// }

// export default wxPayHandler
