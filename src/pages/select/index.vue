<!-- 首页 -->
<template>
  <div class="olpcgaf-homepage">
    <div class="olpcgaf-homepage-header">
     <img src="../../assets/LOGO@3x.png" class="olpcgaf-homepage-header-logo" alt="">
     <div class="olpcgaf-homepage-header-btn">
       我的钱包
     </div>
    </div>
    <div class="olpcgaf-homepage-largelogo">
      <img src="../../assets/LOGO@3x.png" alt="">
    </div>
    <p class="olpcgaf-homepage-largetext">OLPC-TRX LP</p>
    <p class="olpcgaf-homepage-text">质押OLPC/TRX LP获取更多OLPC</p>
    <div class="sizedbox-height-80"></div>
    <div class="olpcgaf-homepage-shadowcard">
       <img src="../../assets/gary_logo_1@2x.png" class="olpcgaf-homepage-shadowcard-logo" alt="">
       <div class="olpcgaf-homepage-shadowcard-title">0.000</div>
       <p class="olpcgaf-homepage-shadowcard-text">待获取 GAF</p>
       <p class="olpcgaf-homepage-shadowcard-text" v-if="needDoubleApprove">待授权</p>

       <div class="olpcgaf-homepage-shadowcard-btn" @click="onApprove(pieAddress.single,tokenAddress.GAFP)" v-if="needGafpApprove">授权</div>
       <div class="olpcgaf-homepage-shadowcard-btn">质押</div>
       <div class="olpcgaf-homepage-shadowcard-btn">收获</div>
    </div>
    <div class="olpcgaf-homepage-shadowcard">
      <div class="olpcgaf-homepage-shadowcard-logos">
         <img src="../../assets/gary_logo.png" class="olpcgaf-homepage-shadowcard-logo" alt=""> 
         <span>+</span> 
         <img src="../../assets/gary_logo_1@2x.png" class="olpcgaf-homepage-shadowcard-logo" alt=""> 
      </div>
       <div class="olpcgaf-homepage-shadowcard-title">0.000</div>
       <p class="olpcgaf-homepage-shadowcard-text">待获取 OLPC+GAF</p>
       <p class="olpcgaf-homepage-shadowcard-text" v-if="needDoubleApprove">待授权</p>
       <div class="olpcgaf-homepage-shadowcard-btn" v-if="needDoubleApprove">授权</div>
       <div class="olpcgaf-homepage-shadowcard-btn">质押</div>
       <div class="olpcgaf-homepage-shadowcard-btn">收获</div>
    </div>
    <div class="olpcgaf-homepage-shadowcard">
      <img src="../../assets/gary_logo_1@2x.png" class="olpcgaf-homepage-shadowcard-logo" alt="">
       <div class="olpcgaf-homepage-shadowcard-title">0.000</div>
       <p class="olpcgaf-homepage-shadowcard-text">OLPC-TRX LP 已质押</p>
        <p class="olpcgaf-homepage-shadowcard-text" v-if="needOlpcApprove">待授权</p>
       <div class="olpcgaf-homepage-shadowcard-btn" v-if="needOlpcApprove">授权</div>
       <div class="olpcgaf-homepage-shadowcard-btn">质押</div>
       <div class="olpcgaf-homepage-shadowcard-btn">收获</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { useRouter } from 'vue-router';
import * as routerPaths from '@/constants/app_routes_path';
import {  SinglePie, tokenAddress, pieAddress, tronWebApprove, MultiPie } from '@/tronlink/index';
import * as utils from '@/utils/index';
import { onMounted, ref } from 'vue';
export default {
    name: 'home_page',
    setup() {
      const router = useRouter();
      const needGafpApprove = ref<boolean>(true);
      const needOlpcApprove = ref<boolean>(true);
      const needDoubleApprove = ref<boolean>(true);
      const singlePie = new SinglePie();
      const multiPie = new MultiPie();
      const onRouter = (path: string) => {
        router.push(path)
      }

      onMounted(async () => {
        onGetApproveStatus();
      })
      
      /** 判断代币是否授权 */
      const onGetApproveStatus = async () => {
        try {
          const [res1, res2, res3, res4] = await Promise.all([
            singlePie.getTokenAllownceAmount(tokenAddress.GAFP),
            singlePie.getTokenAllownceAmount(tokenAddress.OLPP),
            multiPie.getTokenAllownceAmount(tokenAddress.GAFP),
            multiPie.getTokenAllownceAmount(tokenAddress.OLPP)
          ]);
          console.log(res1, res2, res3, res4);
          needGafpApprove.value = res1;
          needDoubleApprove.value = res2;
          needOlpcApprove.value = res3 && res4;
         } catch(err) {
           utils.toast(err || err.message);
         }
      }
      
      const onApprove = async (address: string, token: string) => {
        try {
          utils.loading('授权中');
          await tronWebApprove(token, address);
          onGetApproveStatus();
         } catch(err) {
           utils.toast(err || err.message);
         }
        
      }

      return {routerPaths, needGafpApprove,needDoubleApprove, needOlpcApprove, tokenAddress,pieAddress, onApprove, onRouter} 
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>