import { RouteRecordRaw } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import * as routePath from '@/constants/app_routes_path';

const HomePage = defineAsyncComponent(() => import('@/pages/home_page/index.vue'));
const OrepoolPage = defineAsyncComponent(() => import('@/pages/orepool_page/index.vue'));
const SelectPage = defineAsyncComponent(() => import('@/pages/select/index.vue'));
const MyPage = defineAsyncComponent(() => import('@/pages/my_page/index.vue'));

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: routePath.home_page,
        props: {
            isShowTabbar: true
        }
    },
    {
        path:  routePath.home_page,
        component: HomePage
    },
    {
        path:  routePath.orepool_page,
        component: OrepoolPage
    },
    {
        path:  routePath.select_page,
        component: SelectPage
    },
    {
        path:  routePath.my_page,
        component: MyPage
    }
]

export default routes;