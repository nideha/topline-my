// 封装用户相关接口的请求函数模块
// 需要遵循一个原则：不要直接在组件中发请求，都封装成函数进行调用
import request from '@/utils/request'

// 定义并导出函数
export const login = user => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    // this.user 表示的是后台返回的数据
    data: user
  })
}
