import tableFix from './tableFix'

const install = function(Vue) {
  Vue.directive('tableFix', tableFix)
}

if (window.Vue) {
  window['tableFix'] = tableFix
  Vue.use(install); // eslint-disable-line
}

tableFix.install = install
export default tableFix
