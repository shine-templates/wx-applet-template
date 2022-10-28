export default () => {
  const openId = wx.getStorageSync('openId')

  return {
    openId,
    platform: '1',
  }
}
