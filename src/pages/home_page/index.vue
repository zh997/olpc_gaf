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
    <p class="olpcgaf-homepage-text">打造去中心化DEFI体育板块生态,</p>
    <p class="olpcgaf-homepage-text">质押OLPC/TRX LP获取更多OLPC</p>
    <div class="sizedbox-height-80"></div>
    <div class="olpcgaf-homepage-card">
       <div class="olpcgaf-homepage-card-title">OLPC总供应量</div>
       <div class="olpcgaf-homepage-card-price">10,000,000</div>
       <div class="olpcgaf-homepage-card-footer">
         <span>最大总供应量</span>
         <span>10,000,000  OLPC</span>
        </div>
    </div>
    <div class="olpcgaf-homepage-card">
       <div class="olpcgaf-homepage-card-title">我的OLPC余额</div>
       <div class="olpcgaf-homepage-card-price">999</div>
       <div class="olpcgaf-homepage-card-footer">仅有60天的挖矿时间，马上开始挖吧</div>
    </div>
    <div class="olpcgaf-homepage-darkcard">
       <div class="olpcgaf-homepage-darkcard-wrap">
          <img src="../../assets/LOGO@3x.png" class="olpcgaf-homepage-darkcard-logo" alt="">
          <div class="olpcgaf-homepage-darkcard-content">
            <div class="olpcgaf-homepage-text text-left">我们为您提供10%的OLPC推荐奖励。复制下面的推荐链接立即分享并获得奖励。</div>
            <div class="recomend-link">gfasgfjahflafasgfjahflafasgfjahflafa</div>
            <div class="olpcgaf-homepage-darkcard-btn">复制推荐链接</div>
          </div>
       </div>
       <div class="olpcgaf-homepage-darkcard-footer">
         <span>最大总供应量</span>
         <span>10,000,000  OLPC</span>
       </div>
    </div>
    <div class="olpcgaf-homepage-shadowcard">
       <img src="../../assets/gary_logo.png" class="olpcgaf-homepage-shadowcard-logo" alt="">
       <div class="olpcgaf-homepage-shadowcard-title">OLPC-TRX LP</div>
       <p class="olpcgaf-homepage-text">质押OLPC-TRX LP</p>
       <p class="olpcgaf-homepage-text">赚取10000000 OLPC</p>
       <p class="olpcgaf-homepage-link">查看合约</p>
       <p class="olpcgaf-homepage-shadowcard-text">0.00000 OLPC准备收获</p>
       <div class="olpcgaf-homepage-shadowcard-btn" @click="onRouter(routerPaths.select_page)">选择</div>
    </div>
    <div class="olpcgaf-homepage-tencentlogo">
      <img src="../../assets/Tencent_Conference_icon.png" alt="">
    </div>
    <div class="olpcgaf-homepage-tencentform">
       <input type="text" class="olpcgaf-homepage-tencentform-input" placeholder="请输入个人会议号">
       <div class="olpcgaf-homepage-tencentform-btn" @click="onOpenWemmet">确定</div>
    </div>
     <div class="olpcgaf-homepage-address">
        <div class="olpcgaf-homepage-address-title">OLPC Token  地址：</div>
        <div class="olpcgaf-homepage-address-content">gsdghaiughjkahglasgkaglagdfssfs</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { useRouter } from 'vue-router';
import * as routerPaths from '@/constants/app_routes_path';
import {  SinglePie } from '@/tronlink/index';
export default {
    name: 'home_page',
    setup() {
      const singlePie = new SinglePie();
      const router = useRouter();
      const onRouter = (path: string) => {
        router.push(path)
      }
      const onOpenWemmet = () => {
        window.location.href = 'wemeet://'
      }
      return {routerPaths, onRouter, onOpenWemmet} 
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>