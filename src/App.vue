<template>
   <div class="safe-area">
     <router-view v-if="isShowRouter"></router-view>
   </div>
   <!-- <TabbarPage v-if="isShowTabbar"/> -->
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { getTronlinkAddress, tronWebApprove, initContract } from '@/tronlink/index';
// import * as services from '@/services'; 
import * as utils from '@/utils/index';

export default {
   components: {
  },
  setup(){
    const isShowRouter = ref<boolean>(false);
    const doLogin = async () => {
      /** 获取钱包地址登录 */
      try {
        utils.loading('初始化');
        await getTronlinkAddress();
        await initContract();
        utils.loadingClean();
        isShowRouter.value = true;
        // console.log(window);
      } catch(err) {
        console.log(err);
        utils.toast(err || err.message);
      }
    }
    onMounted(async () => {
        doLogin()
    })
    return { isShowRouter, doLogin}
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
