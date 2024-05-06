import axios from 'axios'
import config from '@/config'

const instance = axios.create({
  baseURL: config.api_url,
  timeout: 10000
})

class LookingGlassApi {
  static async getServerList() {
    return await instance.post('', buildParams([], 'server_list', ''))
  }
  static async executeBird(servers: Array<string>, command: string) {
    return await instance.post('', buildParams(servers, 'bird', command))
  }
  static async whois(value: 'string') {
    return await instance.post('', buildParams([], 'whois', value))
  }
  static async traceroute(servers: Array<string>, address: 'string') {
    return await instance.post('', buildParams(servers, 'traceroute', address), {
      timeout: 30000
    })
  }
}

function buildParams(servers: Array<string>, type: string, args: string) {
  return {
    servers: servers,
    type: type,
    args: args
  }
}

export default LookingGlassApi
