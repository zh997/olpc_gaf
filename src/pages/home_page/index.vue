<!-- 首页 -->
<template>
  <div class="olpcgaf-homepage">
    <div class="olpcgaf-homepage-header">
     <img src="../../assets/3.png" class="olpcgaf-homepage-header-logo" alt="">
      <!-- <div class="olpcgaf-homepage-header-btn" @click="onGetWellet" v-if="!encryption_wellet_address">
       我的钱包
     </div> -->
     <div class="olpcgaf-homepage-header-address">
       {{encryption_wellet_address}}
     </div>
    </div>
    <div class="olpcgaf-homepage-largelogo">
      <img src="../../assets/3.png" alt="">
    </div>
    <p class="olpcgaf-homepage-text">打造去中心化DEFI体育板块生态,</p>
    <p class="olpcgaf-homepage-text">质押OLPC/TRX LP获取更多OLPC</p>
    <div class="sizedbox-height-80"></div>
    <div class="olpcgaf-homepage-card">
       <div class="olpcgaf-homepage-card-title">OLPC总供应量</div>
       <div class="olpcgaf-homepage-card-price">{{maxSupply}}</div>
       <div class="olpcgaf-homepage-card-footer">
         <span>最大总供应量</span>
         <span>{{maxSupply}} OLPC</span>
        </div>
    </div>
    <div class="olpcgaf-homepage-card">
       <div class="olpcgaf-homepage-card-title">我的OLPC余额</div>
       <div class="olpcgaf-homepage-card-price">{{allIcomeAmount}}</div>
       <div class="olpcgaf-homepage-card-footer">仅有60天的挖矿时间，马上开始挖吧</div>
    </div>
    <div class="olpcgaf-homepage-darkcard">
       <div class="olpcgaf-homepage-darkcard-wrap">
          <img src="../../assets/LOGO@3x.png" class="olpcgaf-homepage-darkcard-logo" alt="">
          <div class="olpcgaf-homepage-darkcard-content">
            <div class="olpcgaf-homepage-text text-left">我们为您提供10%的OLPC推荐奖励。复制下面的推荐链接立即分享并获得奖励。</div>
            <input class="recomend-link" placeholder="请输入钱包地址" v-model="code" >
            <span style="position: fixed; top: -100px" id="copy">{{recommed_link}}</span>
            <div class="olpcgaf-homepage-darkcard-btn" data-clipboard-target="#copy">复制推荐链接</div>
          </div>
       </div>
       <div class="olpcgaf-homepage-darkcard-footer">
         <span>最大总供应量</span>
         <span>{{maxSupply}}  OLPC</span>
       </div>
    </div>
     <div class="olpcgaf-homepage-tencentlogo">
      <img src="../../assets/Tencent_Conference_icon.png" alt="">
    </div>
    <div class="olpcgaf-homepage-tencentform">
       <input type="text" class="olpcgaf-homepage-tencentform-input" placeholder="请输入个人会议号">
       <div class="olpcgaf-homepage-tencentform-btn" @click="onOpenWemmet">确定</div>
    </div>
    <div class="olpcgaf-homepage-shadowcard">
       <img src="../../assets/4.png" class="olpcgaf-homepage-shadowcard-logo" alt="">
       <div class="olpcgaf-homepage-shadowcard-title">GAF-TRX LP</div>
       <p class="olpcgaf-homepage-text">质押GAF-TRX LP</p>
       <p class="olpcgaf-homepage-text">赚取{{maxSupply}} OLPC</p>
       <p class="olpcgaf-homepage-link" @click="onCheckToken">查看合约</p>
       <p class="olpcgaf-homepage-shadowcard-text">{{allIcomeAmount}} OLPC准备收获</p>
       <div class="olpcgaf-homepage-shadowcard-btn" @click="onRouter(routerPaths.select_page)">选择</div>
    </div>
   
     <div class="olpcgaf-homepage-address">
        <div class="olpcgaf-homepage-address-title">OLPC Token  地址：</div>
        <div class="olpcgaf-homepage-address-content">{{tokenAddress.OLPC}}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { useRouter, useRoute } from 'vue-router';
import Decimal from 'decimal.js';
import { Toast, Dialog } from 'vant';
import ClipboardJS from 'clipboard';
import { pow } from '@/constants/index';
import * as utils from '@/utils/index';
import { useGlobalHooks } from '@/hooks';
import * as routerPaths from '@/constants/app_routes_path';
import {  SinglePie, MultiPie, RewardContract, OlptContract, pieAddress, tokenAddress } from '@/tronlink/index';
import { onMounted,ref, computed ,onUnmounted} from 'vue';
export default {
    name: 'home_page',
    setup() {
      let timer: number = 0;
      const isRequest = ref<boolean>(false);
      const { encryption_wellet_address, wellet_address } = useGlobalHooks();
      const singleUserIncome = ref<number>(0);  // 单币矿池收益
      const doubleUserIncome = ref<number>(0);  // 双币矿池收益
      const rewardUserIncome = ref<number>(0);  // 推荐收益
      const maxSupply = ref<number>(0); // 最大供应量
      const code = ref<string>(wellet_address); // 推荐人钱包地址
      const router = useRouter();
      const route = useRoute();
      const singlePie = new SinglePie();
      const rewardContract = new RewardContract();
      const olptContract = new OlptContract();
      const multiPie = new MultiPie();
      const onRouter = (path: string) => {
        router.push(path)
      }
      const onOpenWemmet = () => {
        window.location.href = 'wemeet://'
      }
       /** 获取单币用户收益 */
      const onGetUserIncome = async () => {
          try {
            const res = await singlePie.userIncome();
            const income:number = (window as any).tronWeb.toDecimal(res.income);
            singleUserIncome.value = utils.toFixed(Number(new Decimal(income).div(pow)), 4); 
         } catch(err) {
           console.log(err);
           utils.toast(err || err.message);
         }
      }

      /** 获取双币用户收益 */
      const onGetDoubleUserIncome = async () => {
          try {
            const res = await multiPie.userIncome();
            const income:number = (window as any).tronWeb.toDecimal(res.income);
            doubleUserIncome.value = utils.toFixed(Number(new Decimal(income).div(pow)), 4);
          } catch(err) {
            console.log(err);
           utils.toast(err || err.message);
          }
      }
      /** 获取用最大供应量 */
      const onGetMaxSupply = async () => {
          try {
            const res = await olptContract.maxSupply();
            const supply = (window as any).tronWeb.toDecimal(res);
            maxSupply.value = Number(new Decimal(supply).div(pow))
          } catch(err) {
            console.log(err);
           utils.toast(err || err.message);
          }
      }

      /** 获取通过推荐获得的收益 */
      const onGetRewardUserIncome = async () => {
          try {
            const res = await rewardContract.userIncome();
            const income = (window as any).tronWeb.toDecimal(res.income);
            rewardUserIncome.value = Number(new Decimal(income).div(pow))
          } catch(err) {
            console.log(err);
           utils.toast(err || err.message);
          }
      }

      /** 生成推荐关系 */
      const onRecommedCode = async () => {
          try {
            const { code  } = route.query;
            if (code) {
              await rewardContract.recommedCode(code);
            }
          } catch(err) {
           utils.toast(err || err.message);
          }
      }

       /** 轮询收益 */
      const onPollIncome = async () => {
         clearInterval(timer);
         onPromiseAll();
         timer = setInterval (() => {
           console.log('polling-home');
           onPromiseAll();
         }, 1000);
      }

      const onPromiseAll = async () => {
        try {
          if (!isRequest.value) {
            isRequest.value = true;
            await Promise.all([onGetUserIncome(), onGetDoubleUserIncome(), onGetRewardUserIncome()]);
            isRequest.value = false;
          }
          utils.loadingClean();
        } catch(err) {
          console.log(err);
        }
      }

      const onCheckToken = () => {
        Dialog.alert({
          title: '合约地址',
          message: pieAddress.single + '，' + pieAddress.multi + '，' + pieAddress.reward,
        }).then(() => {
          // on close
        });
      }

      const allIcomeAmount = computed({
            get: () => {
                const a = new Decimal(Number(singleUserIncome.value));
                const b = new Decimal(Number(doubleUserIncome.value));
                const c = new Decimal(Number(rewardUserIncome.value));
                return utils.toFixed(Number(a.add(b).add(c)), 4);
            },
            set: () => {

            }
        })

      const recommed_link = computed({
            get: () => {
                return 'http://olpc.vip/#/home?code=' + code.value
            },
            set: () => {

            }
        })
      

      onMounted(() => {
        onGetMaxSupply();
        onRecommedCode();
        onPollIncome();
        let ClipboardJSObj= new ClipboardJS('.olpcgaf-homepage-darkcard-btn')
            ClipboardJSObj.on('success', function(e) {
              Toast.success('复制成功');
              e.clearSelection();
            });
            ClipboardJSObj.on('error', function(e) {
                e.clearSelection();
            })
      })

      onUnmounted(() => {
        console.log('onUnmounted')
        clearInterval(timer);
      })

      return {routerPaths,encryption_wellet_address,maxSupply , rewardUserIncome,code,tokenAddress,recommed_link, onRouter,onCheckToken, onOpenWemmet, allIcomeAmount} 
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>