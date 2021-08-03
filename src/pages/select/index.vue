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
       <div class="olpcgaf-homepage-shadowcard-btn">质押</div>
    </div>
    <div class="olpcgaf-homepage-shadowcard">
      <div class="olpcgaf-homepage-shadowcard-logos">
         <img src="../../assets/gary_logo.png" class="olpcgaf-homepage-shadowcard-logo" alt=""> 
         <span>+</span> 
         <img src="../../assets/gary_logo_1@2x.png" class="olpcgaf-homepage-shadowcard-logo" alt=""> 
      </div>
       <div class="olpcgaf-homepage-shadowcard-title">0.000</div>
       <p class="olpcgaf-homepage-shadowcard-text">待获取 OLPC+GAF</p>
       <div class="olpcgaf-homepage-shadowcard-btn">收获</div>
    </div>
    <div class="olpcgaf-homepage-shadowcard">
      <img src="../../assets/gary_logo_1@2x.png" class="olpcgaf-homepage-shadowcard-logo" alt="">
       <div class="olpcgaf-homepage-shadowcard-title">0.000</div>
       <p class="olpcgaf-homepage-shadowcard-text">OLPC-TRX LP 已质押</p>
       <div class="olpcgaf-homepage-shadowcard-btn">授权 OLPC-TRX LP</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { useRouter } from 'vue-router';
import * as routerPaths from '@/constants/app_routes_path';
export default {
    name: 'home_page',
    setup() {
      const router = useRouter();
      const onRouter = (path: string) => {
        router.push(path)
      }
      return {routerPaths, onRouter} 
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>