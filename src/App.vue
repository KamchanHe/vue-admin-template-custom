<template>
  <div id="app">
    <router-view />
    <LockScreen v-if="$store.state.app.lockScreen" />
  </div>
</template>

<script>
import LockScreen from '@/components/LockScreen'
export default {
  name: 'App',
  components: {
    LockScreen
  }
}
</script>

<style lang="scss">
#app {
  overflow-y: scroll;
}
.app-main {
  .header-search {
    .el-input__inner {
      width: 150px;
    }
    .el-range-editor.el-input__inner {
      width: 280px;
      padding-right: 0;
    }
  }
}
</style>
