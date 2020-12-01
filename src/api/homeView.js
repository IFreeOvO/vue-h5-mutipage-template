import request from '@/utils/request'

// 获取验证码
export function getMsgCode(params) {
  return request.post('/xx', params)
}
