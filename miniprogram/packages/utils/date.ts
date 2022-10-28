export const formatDate = (time: Date) => {
  let m = ''
  let d = ''
  if (time.getMonth() + 1 >= 10) {
    m = time.getMonth() + 1 + ''
  } else {
    m = `0${time.getMonth() + 1}`
  }
  if (time.getDate() >= 10) {
    d = time.getDate() + ''
  } else {
    d = `0${time.getDate()}`
  }
  return `${time.getFullYear()}-${m}-${d}`
}
export const getHoursFormat = (time: Date) => {
  let h = ''
  let m = ''
  if (time.getHours() >= 10) {
    h = time.getHours() + ''
  } else {
    h = '0' + time.getHours()
  }
  if (time.getMinutes() >= 10) {
    m = time.getMinutes() + ''
  } else {
    m = time.getMinutes() + '0'
  }
  return `${h}:${m}`
}
