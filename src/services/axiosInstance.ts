import axios, { AxiosResponse } from 'axios'
import config from 'config'

axios.defaults.baseURL = config.server

axios.interceptors.request.use(
  async function (conf) {
    try {
      let tokens
      if (typeof window !== 'undefined')
        tokens = JSON.parse(localStorage.getItem('tokens') || '')
      conf.headers!['AUTH_TOKEN'] = tokens
      console.log({ token: tokens })
      return conf
    } catch (errr) {
      console.error(errr)
      return conf
    }
  },
  function (err) {
    return Promise.reject(err)
  },
)

export default axios
