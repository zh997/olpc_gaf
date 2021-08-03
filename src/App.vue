<template>
   <div class="safe-area">
     <router-view v-if="isShowRouter"></router-view>
   </div>
   <!-- <TabbarPage v-if="isShowTabbar"/> -->
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { useGlobalHooks } from '@/hooks';
import { getTronlinkAddress } from '@/tronlink/index';
import * as services from '@/services'; 
import * as utils from '@/utils/index';

export default {
   components: {
  },
  setup(){
    const { isShowTabbar, onGetMoneyConfig } = useGlobalHooks();
    const isShowRouter = ref<boolean>(true);
    const isShowButton = ref<boolean>(false);
    const doLogin = async () => {
      /** 获取钱包地址登录 */
      try {
        utils.loading('登录中');
        const query = utils.getUrlQuery(window.location.hash)
        const address = await getTronlinkAddress();
        const response = await services.authLogin({name: address, code: query.code});
        localStorage.setItem('token', response.data.token);
        utils.loadingClean()
        isShowButton.value = false;
        isShowRouter.value = true;
        onGetMoneyConfig();
      } catch(err) {
        console.log(err);
        isShowButton.value = true;
        isShowRouter.value = false;
        utils.toast(err);
      }
    }
    onMounted(async () => {
        // doLogin()
    })
    return {isShowTabbar, isShowRouter, isShowButton, doLogin}
  }
}
</script>

<style>
.center-button{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -160%);
}
.safe-area{
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: border-box;
}
</style>
