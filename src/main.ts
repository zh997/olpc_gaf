import { createApp } from 'vue';
import { createRouter, createWebHashHistory} from 'vue-router';
import { ConfigProvider } from 'vant';
import { useRouter } from 'vue-router';
import 'lib-flexible/flexible';
import { Toast  } from 'vant';
import * as utils from '@/utils';
import routes from '@/routes/index';
import VueI18n from '@/i18n';
import App from './App.vue';
import { exclude_path } from './constants/app_exclude_path';
import { useGlobalHooks } from './hooks';
import './styles/reset_vantcss.less';
import './styles/common.less';

const app = createApp(App);

app.config.globalProperties.$appRouter = (path: string) => {
  const router = useRouter();
  if (!path) return utils.toast('暂未开放');
  router.push(path)
}

const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

/** 路由守卫 */
router.beforeEach((to, from, next) => {
  const { isShowTabbar, onShowTabbar } = useGlobalHooks();
  const tabbarIndex = exclude_path.indexOf(to.path)
  if(tabbarIndex === -1) {
    if (isShowTabbar.value) onShowTabbar(false, tabbarIndex);
  } else {
    onShowTabbar(true, tabbarIndex);
  }
  window.scrollTo({top: 0});
  next();
})

app.use(ConfigProvider);
app.use(router)
app.use(Toast);
app.use(VueI18n);


app.mount('#app');