const throttleClick = (value) => ({
  inserted(el, binding) {
    const delay = binding.value || value || 2000
    el.addEventListener('click', (e) => {
      el.classList.add('is-disabled')
      el.disabled = true
      setTimeout(() => {
        el.disabled = false
        el.classList.remove('is-disabled')
      }, delay)
    })
  }
})
const install = function(Vue, value) {
  Vue.directive('throttle-click', throttleClick(value))
}

if (window.Vue) {
  window.throttleClick = throttleClick
  Vue.use(install); // eslint-disable-line
}

throttleClick.install = install
export default throttleClick
