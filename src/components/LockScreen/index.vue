<!--
 * @Description: 锁屏功能
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
-->
<template>
  <div class="lock-screen">
    <div class="content">
      <div class="avatar">
        <el-avatar :src="avatar" :size="150" />
      </div>
      <div class="name">
        <span> {{ name }} 屏幕已锁定</span>
      </div>
      <div class="icon">
        <i class="el-icon-lock" />
      </div>
      <div class="form">
        <el-form ref="UnLockForm" :model="unLockForm" :rules="unLockFormRules">
          <el-form-item required prop="password">
            <el-input v-model="unLockForm.password" type="password" placeholder="请输入" />
          </el-form-item>
          <el-form-item align="right">
            <el-button type="primary" @click="handleUnLock">解锁</el-button>
            <el-button type="danger" @click="handleLogout">退出登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LockScreen',
  data() {
    // 密码校验
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 18) {
        callback(new Error('长度在6-18位'))
      } else {
        callback()
      }
    }
    return {
      // 表单
      unLockForm: {
        password: null // 密码
      },
      // 表单规则
      unLockFormRules: {
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'name'
    ])
  },
  methods: {
    /**
     * 解锁屏幕
     * @param {void}
     * @return {void}
     */
    handleUnLock() {
      this.$refs.UnLockForm.validate((valid) => {
        if (valid) {
          const { unLockForm } = this
          const { password } = unLockForm
          const lockScreen = this.$store.state.app.lockScreen
          if (password === lockScreen) {
            this.$store.dispatch('app/setLockScreen', false)
          } else {
            this.$message.warning('密码错误')
          }
        } else {
          return false
        }
      })
    },
    /**
     * 退出登录
     * @param {void}
     * @return {void}
     */
    handleLogout() {
      this.$confirm('当前页面数据将会丢失,确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.lock-screen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1002;
  background: rgba(0, 0, 0, 0.8);
}
.content {
  position: absolute;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  width: 600px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  padding: 30px;
  .icon {
    margin-top: 15px;
    font-size: 36px;
  }
  .name {
    margin-top: 15px;
    font-size: 18px;
  }
  .form {
    width: 100%;
    margin-top: 15px;
  }
}
</style>
