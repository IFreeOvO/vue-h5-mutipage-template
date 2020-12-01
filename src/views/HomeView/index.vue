<template>
  <div class="home-view">
    <div class="title">测试</div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        type="number"
        maxlength="11"
        name="手机号"
        clearable
        placeholder="请输入手机号"
        label-width="80px"
        :error="false"
        :rules="[{ required: true, message: '请输入手机号' }, {pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号'}]"
      >
        <template #left-icon>
          <van-icon
            name="phone-o"
            class="form-icon"
          />
        </template>
      </van-field>

      <van-field
        v-model="code"
        name="验证码"
        placeholder="请输入验证码"
        :error="false"
        maxlength="6"
        clearable
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #left-icon>
          <van-icon
            name="envelop-o"
            class="code-icon form-icon"
          />
        </template>
        <template #button>
          <van-button
            v-if="showClock"
            size="small"
            plain
            class="count-box code-btn"
          >&nbsp;&nbsp;&nbsp;{{count}}s</van-button>
          <van-button
            v-else
            size="small"
            plain
            class="theme-plain-btn-color code-btn"
            @click="getCode"
          >获取验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          color="#21C9C6"
        >
          登 录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script type="text/ecmascript-6">
const CLOCK_INIT = 60

export default {
  data() {
    return {
      phone: '',
      code: '',
      count: CLOCK_INIT,
      showClock: false
    }
  },

  methods: {
    // 提交
    onSubmit() {
      console.log('提交')
      location.href = './EnrollView.html'
    },

    // 关闭倒计时
    closeClock() {
      this.showClock = false
      this.count = CLOCK_INIT
      clearInterval(this.timer)
      this.timer = null
    },

    // 开启倒计时
    openClock() {
      this.showClock = true
      this.timer = setInterval(() => {
        if (this.count === 0) {
          this.closeClock()
          return
        }
        this.count--
      }, 1000)
    },

    // 获取验证码
    getCode() {
      console.log('获取验证码', this.phone)
      if (!this.phone) {
        return
      }
      this._getMsgCode()
    },

    // 发送获取验证码请求
    async _getMsgCode() {
      this.openClock()
    }
  },

  beforeDestroy() {
    this.closeClock()

    if (this.loginTimer) {
      clearTimeout(this.loginTimer)
      this.loginTimer = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/global.scss";

.title {
  font-weight: bold;
  font-size: 50px;
  text-align: center;
  margin-top: 200px;
  margin-bottom: 200px;
}

.form-icon {
  margin-right: 10px;
  width: 45px;
}

.code-icon {
  margin-top: 9px;
}

.count-box {
  width: 156px;
  color: #cbcddb;
  border-color: #cbcddb;
}

.login-btn-wrap {
  margin: 116px 38px 0;
}
</style>
