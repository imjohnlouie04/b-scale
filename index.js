import VueScale from "./VueScale";

// Install function executed by Vue.use()
function install(Vue, options) {
  if (install.installed) return;
  install.installed = true;

  const components = {
    scale: VueScale
  };

  // Declare all components when options is not set or array is empty
  // Or when the user explicitely specify it
  for (let component in components) {
    if (
      !options ||
      !options.components ||
      options.components.length === 0 ||
      options.components.includes(component)
    ) {
      Vue.component("b-" + component, components[component]);
    }
  }
}
// Create module definition for Vue.use()
const windowScaler = {
  install
};

// To auto-install when vue is found
/* global window global */
let GlobalVue = null;

if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(windowScaler);
}

// To allow use as module (npm/webpack/etc.) export components
export default windowScaler;