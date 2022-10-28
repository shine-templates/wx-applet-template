const https = {
  develop: '',
  trial: '',
  release: '',
}

const autoSelectLink = (debug: boolean = false): string => {
  const env = __wxConfig.envVersion
  if (debug) {
    return https['release']
  } else {
    return https[env]
  }
}

export const images: string = `${https['release']}/hm_project/shop/`

export default autoSelectLink
