import { areaData } from '../config/pca'
const addressParse = (
  provinceName: string,
  cityName: string,
  countryName: string,
) => {
  return new Promise((resolve, reject) => {
    try {
      const province: any = areaData.find((v) => v.name === provinceName)
      const { code: provinceCode } = province
      const city = province.children.find(
        (v: { name: string }) => v.name === cityName,
      )
      const { code: cityCode } = city
      const country = city.children.find(
        (v: { name: string }) => v.name === countryName,
      )
      const { code: districtCode } = country
      resolve({
        provinceCode,
        cityCode,
        districtCode,
      })
    } catch (error) {
      reject('地址解析失败')
    }
  })
}

export default addressParse
