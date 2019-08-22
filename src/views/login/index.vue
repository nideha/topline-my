<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        center
        clearable
        v-validate="'required'"
        left-icon="phone-o"
        placeholder="请输入手机号"
        name="mobile"
        :error-message="errors.first('mobile')"
      />
      <van-field
        v-model="user.code"
        center
        clearable
        v-validate="'required'"
        left-icon="comment-o"
        placeholder="请输入验证码"
        name="code"
        :error-message="errors.first('code')"
      />
    </van-cell-group>
    <div class="login-bt">
      <van-button :loading="isLoginLoading" type="info" @click="onLogin">登 录</van-button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import request from '@/utils/request'
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      },
      isLoginLoading: false
    }
  },
  methods: {
    // 登录方法
    async onLogin () {
      try {
        // 表单自定提交验证(异步的)
        this.$validator.validate().then(async valid => {
          if (!valid) {
            return
          }
          // 提交表单让登录按钮显示 loading
          this.isLoginLoading = true

          const { data } = await login(this.user)
          // 输出结果数据
          console.log(data)
          this.isLoginLoading = false
          // 成功登录，跳转到首页
          // this.$router.push({ name: 'home' })
        })
      } catch (err) {
        // console.log(err)
        if (err.response && err.response.status === 400) {
          // 错误提示
          this.$toast.fail('手机号或验证码错误')
        }
        // 如果提交失败，停止 loading
        this.isLoginLoading = false
      }
    }
  }
}
</script>

<style scoped lang='less'>
.login-bt {
  padding: 20px;
  .van-button {
    width: 100%;
  }
}
</style>
