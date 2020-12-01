<template>
  <div class="nav-layout">
    <van-nav-bar
      safe-area-inset-top
      left-arrow
      :title="title"
      @click-left="onClickLeft"
    />
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',

  props: {
    title: String,
    clickLeft: Function // 返回事件
  },

  data() {
    return {
    }
  },

  methods: {
    onClickLeft() {
      if (this.clickLeft) {
        this.clickLeft()
      } else {
        history.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar .van-icon {
  color: #323233;
}
</style>
