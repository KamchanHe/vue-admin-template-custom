<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb v-if="$store.state.settings.breadCrumb" id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item hover-effect" />
      </template>
      <div class="user-name">
        <el-avatar class="avatar" size="small" :src="avatar" />
        <span class="name">{{ name }}</span>
      </div>
      <div class="lock-screen" @click="handleLockScreen">
        <i class="el-icon-lock" />
        <span class="lock-screen-text">锁屏</span>
      </div>
      <div class="change-password" @click="handleChangePassword">
        <i class="el-icon-key" />
        <span class="change-password-text">修改密码</span>
      </div>
      <div class="logout" @click="logout">
        <img class="logout-icon" src="@/assets/images/exit.svg" alt="">
        <span class="logout-text">退出</span>
      </div>
    </div>
    <ChangePasswordDialog ref="ChangePasswordDialog" @handleConfirm="handleConfirmChangePassword" />
    <SetLockScreenPasswordDialog ref="SetLockScreenPasswordDialog" @handleConfirm="handleConfirmSetLockScreenPassword" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import ChangePasswordDialog from './ChangePasswordDialog/index.vue'
import SetLockScreenPasswordDialog from './SetLockScreenPasswordDialog/index.vue'
import { changeCurrentUserPassword as apiChangeCurrentUserPassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    ChangePasswordDialog,
    SetLockScreenPasswordDialog
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    /**
     * 锁屏
     * @param {void}
     * @return {void}
     */
    handleLockScreen() {
      this.$refs.SetLockScreenPasswordDialog.open()
    },
    /**
     * 修改密码
     * @param {void}
     * @return {void}
     */
    handleChangePassword() {
      this.$refs.ChangePasswordDialog.open()
    },
    /**
     * 修改密码确认
     * @param {object} formData
     * @return {void}
     */
    handleConfirmChangePassword(formData) {
      const { oldPassword: oldPwd, password: newPwd } = formData
      this.$withLoading(apiChangeCurrentUserPassword)({
        oldPwd,
        newPwd
      }).then(res => {
        this.$message.success(res.data.message || '修改成功')
        this.$refs.ChangePasswordDialog.close()
      })
    },
    /**
     * 设置锁屏密码确认
     * @param {object} formData
     * @return {void}
     */
    handleConfirmSetLockScreenPassword(formData) {
      const { password } = formData
      this.$store.dispatch('app/setLockScreen', password)
      this.$refs.SetLockScreenPasswordDialog.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30px;
    font-size: 16px;
    font-weight: normal;
    color: #282828;

    &:focus {
      outline: none;
    }
    .right-menu-item {
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .user-name {
      display: flex;
      align-items: center;
      justify-content: center;
      .name {
        margin-left: 10px;
      }
    }
    .change-password,
    .lock-screen {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 20px;
      &-text {
        margin-left: 5px;
      }
    }
    .logout {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 20px;
      &-icon {
        width: 16px;
        height: 18px;
      }
      &-text {
        margin-left: 5px;
      }
    }
  }
}
</style>
