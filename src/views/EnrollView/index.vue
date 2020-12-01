<template>
  <div>
    <nav-layout :title="pageTitle"></nav-layout>
  </div>
</template>

<script type="text/ecmascript-6">
import NavLayout from '@/components/Layout/NavLayout'

export default {
  name: '',

  components: {
    NavLayout
  },

  data() {
    return {
      pageTitle: ''
    }
  },

  methods: {
  },

  mounted() {
    this.pageTitle = document.title
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/global.scss";
</style>
