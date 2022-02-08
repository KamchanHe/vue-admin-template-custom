<!--
 * @Description: 首页
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
-->
<template>
  <div class="dashboard">
    <el-image class="dashboard-bg" :src="require('@/assets/images/undraw_welcome.svg')" fit="contain" />
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  height: 100%;
}
::v-deep .dashboard-bg {
  width: 100%;
  height: 100%;
  padding: 15px;
  img {
    border-radius: 5px;
  }
}
</style>
