import { boot } from 'quasar/wrappers';
import axios from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof axios;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
});

export { axios };
