import storage from '@/utils/storage'

const state = {
  sidebar: {
    opened: storage.localGet('sidebarStatus') ? !!+storage.localGet('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: storage.localGet('size') || 'medium',
  lockScreen: storage.localGet('lockScreen') || false
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      storage.localSet('sidebarStatus', 1)
    } else {
      storage.localSet('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    storage.localSet('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    storage.localSet('size', size)
  },
  SET_LOCK_SCREEN: (state, lockScreen) => {
    state.lockScreen = lockScreen
    storage.localSet('lockScreen', lockScreen)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  setLockScreen({ commit }, lockScreen) {
    commit('SET_LOCK_SCREEN', lockScreen)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
