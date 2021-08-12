<!-- 首页 -->
<template>
  <div class="olpcgaf-select">
    <div class="olpcgaf-select-header">
     <img src="../../assets/3.png" class="olpcgaf-select-header-logo" alt="">
     <div class="olpcgaf-select-header-btn" @click="onGetWellet" v-if="!encryption_wellet_address">
       我的钱包
     </div>
     <div class="olpcgaf-select-header-address" v-else>
       {{encryption_wellet_address}}
     </div>
    </div>
    <div class="olpcgaf-select-largelogo">
      <img src="../../assets/3.png" alt="">
    </div>
    <p class="olpcgaf-select-largetext">OLPC-TRX LP</p>
    <p class="olpcgaf-select-text">质押OLPC/TRX LP获取更多OLPC</p>
    <div class="sizedbox-height-80"></div>
    <div class="olpcgaf-select-shadowcard">
        <div class="olpcgaf-select-shadowcard-logos">
           <img src="../../assets/4.png" class="olpcgaf-select-shadowcard-logo" alt="">
        </div>
      
       <div  class="olpcgaf-select-shadowcard-title-wrap" v-if="needGafpApprove">
          <!-- <div class="olpcgaf-select-shadowcard-title-label">收益</div> -->
          <div class="olpcgaf-select-shadowcard-title-value">{{utils.toFixed(singleUserIncome, 4)}}</div>
       </div>
        <!-- <div  class="olpcgaf-select-shadowcard-title-wrap" v-if="needGafpApprove">
          <div class="olpcgaf-select-shadowcard-title-label">数量</div>
          <div class="olpcgaf-select-shadowcard-title-value">{{singleAmount}}</div>
       </div> -->
       <p class="olpcgaf-select-shadowcard-text" v-if="!needGafpApprove">待授权</p>
        <p class="olpcgaf-select-shadowcard-text" v-if="needGafpApprove">待收获 OLPC</p>
       <div class="olpcgaf-select-shadowcard-btn" @click="onApprove(pieAddress.single,tokenAddress.GAFP)" v-if="!needGafpApprove">授权</div>
       <div class="olpcgaf-select-shadowcard-btn" v-if="needGafpApprove" @click="onShowPopup('GAFP', 'PLEDGE')">质押</div>
       <div class="olpcgaf-select-shadowcard-btn" v-if="needGafpApprove" @click="onShowPopup('GAFP', 'HARVEST')">收获</div>
       <div class="olpcgaf-select-shadowcard-btn" v-if="needGafpApprove" @click="onShowPopup('GAFP', 'REDEEM')">解押</div>
    </div>
    <div class="olpcgaf-select-shadowcard">
      <div class="olpcgaf-select-shadowcard-logos">
         <img src="../../assets/4.png" class="olpcgaf-select-shadowcard-logo" alt=""> 
         <span>+</span> 
         <img src="../../assets/gary_logo.png" class="olpcgaf-select-shadowcard-logo" alt=""> 
      </div>
       <div  class="olpcgaf-select-shadowcard-title-wrap" v-if="needDoubleApprove">
          <!-- <div class="olpcgaf-select-shadowcard-title-label">收益</div> -->
          <div class="olpcgaf-select-shadowcard-title-value">{{utils.toFixed(doubleUserIncome, 4)}}</div>
       </div>
        <!-- <div  class="olpcgaf-select-shadowcard-title-wrap" v-if="needDoubleApprove">
          <div class="olpcgaf-select-shadowcard-title-label">GAF 数量</div>
          <div class="olpcgaf-select-shadowcard-title-value">{{doubleAmountA}}</div>
       </div>
        <div  class="olpcgaf-select-shadowcard-title-wrap" v-if="needDoubleApprove">
          <div class="olpcgaf-select-shadowcard-title-label">OLPC 数量</div>
          <div class="olpcgaf-select-shadowcard-title-value">{{doubleAmountB}}</div>
       </div> -->
       <p class="olpcgaf-select-shadowcard-text" v-if="!needDoubleApprove">待授权</p>
        <p class="olpcgaf-select-shadowcard-text" v-if="needDoubleApprove">待收获 OLPC</p>
       <div class="olpcgaf-select-shadowcard-btn" @click="onApproveDuoble" v-if="!needDoubleApprove">授权</div>
       <div class="olpcgaf-select-shadowcard-btn" v-if="needDoubleApprove" @click="onShowPopup('GAFP+OLPC','PLEDGE')">质押</div>
       <div class="olpcgaf-select-shadowcard-btn" v-if="needDoubleApprove" @click="onShowPopup('GAFP+OLPC','HARVEST')">收获</div>
       <div class="olpcgaf-select-shadowcard-btn" v-if="needDoubleApprove"  @click="onShowPopup('GAFP+OLPC','REDEEM')">解押</div>
    </div>
    <div class="olpcgaf-select-shadowcard">
      <div class="olpcgaf-select-shadowcard-logos">
           <img src="../../assets/gary_logo.png" class="olpcgaf-select-shadowcard-logo" alt="">
      </div>
    
         <div  class="olpcgaf-select-shadowcard-title-wrap" v-if="needOlpcApprove">
          <!-- <div class="olpcgaf-select-shadowcard-title-label">收益</div> -->
          <div class="olpcgaf-select-shadowcard-title-value">{{utils.toFixed(recommedUserIncome, 4)}}</div>
       </div>
        <!-- <div  class="olpcgaf-select-shadowcard-title-wrap" v-if="needOlpcApprove">
          <div class="olpcgaf-select-shadowcard-title-label">数量</div>
          <div class="olpcgaf-select-shadowcard-title-value">{{singleAmount}}</div>
       </div> -->
        <p class="olpcgaf-select-shadowcard-text" v-if="!needOlpcApprove">待授权</p>
         <p class="olpcgaf-select-shadowcard-text" v-if="needOlpcApprove">推荐收益 OLPC</p>
       <div class="olpcgaf-select-shadowcard-btn"  @click="onApprove(pieAddress.single,tokenAddress.OLPC)" v-if="!needOlpcApprove">授权</div>
       <!-- <div class="olpcgaf-select-shadowcard-btn" v-if="needOlpcApprove"  @click="onShowPopup('OLPC', 'PLEDGE')">质押</div> -->
       <div class="olpcgaf-select-shadowcard-btn" v-if="needOlpcApprove"  @click="onShowPopup('OLPC', 'HARVEST')">收获</div>
        <!-- <div class="olpcgaf-select-shadowcard-btn" v-if="needOlpcApprove"  @click="onShowPopup('OLPC', 'REDEEM')">解押</div> -->
        <p class="olpcgaf-select-shadowcard-text" v-if="needOlpcApprove">推荐算力: {{ability}}</p>
    </div>
  </div>
  <van-popup v-model:show="visible" @close="onPopupClose" position="bottom">
      <div class="popup-form-wrap">
        <div class="popup-form-title">{{OperTypeText[operType]}} {{operType !== 'HARVEST' ? (pledgeType === "GAFP" ? 'GAF-TRX ': 'OLPC-TRX ') + pledgeType : 'OLPC'}}</div>
         <van-field v-model="gafpAmount" v-if="pledgeType === 'GAFP' || (pledgeType === 'GAFP+OLPC' && operType !== 'HARVEST')" class="popup-form-item" type="number" :placeholder="`请输入${operType === 'HARVEST' ? 'OLPC' :'GAF-TRX LP'} ${OperTypeText[operType]}数量`" >
          <template #button>
            <div class="popup-form-item-unit" v-if="operType !== 'HARVEST'">GAF-TRX LP <span @click="onSetAll">最大</span></div>
            <div class="popup-form-item-unit" v-else>OLPC <span @click="onSetAll">最大</span></div>
          </template>
        </van-field>
         <van-field v-model="doubleIncomeAmount" v-if="pledgeType === 'GAFP+OLPC' && operType === 'HARVEST'" class="popup-form-item" type="number" :placeholder="`请输入OLPC ${OperTypeText[operType]}数量`" >
          <template #button>
            <div class="popup-form-item-unit">OLPC <span @click="onSetAll">最大</span></div>
          </template>
        </van-field>
        <div class="popup-form-count" v-if="pledgeType === 'GAFP+OLPC' && operType === 'PLEDGE'"><span>{{multiTotalAmountB}}</span> GAF-TRX LP可用</div>
        <div class="popup-form-count" v-if="(pledgeType === 'GAFP' || pledgeType === 'OLPC') && operType === 'PLEDGE'"><span>{{singleTotalAmount}}</span>{{pledgeType === "GAFP" ? 'GAF-TRX LP': 'OLPC-TRX LP'}}可用</div>
        <div class="popup-form-count" v-if="pledgeType === 'GAFP+OLPC' && operType === 'REDEEM'"><span>{{doubleAmountB}}</span> GAF-TRX LP可用</div>
        <div class="popup-form-count" v-if="(pledgeType === 'GAFP' || pledgeType === 'OLPC') && operType === 'REDEEM'"><span>{{singleAmount}}</span>{{pledgeType === "GAFP" ? 'GAF-TRX LP': 'OLPC-TRX LP'}} 可用</div>
        <div class="popup-form-count" v-if="pledgeType === 'GAFP'  && operType === 'HARVEST'"><span>{{singleUserIncome}}</span> OLPC可收获</div>
        <div class="popup-form-count" v-if="pledgeType === 'OLPC' && operType === 'HARVEST'"><span>{{recommedUserIncome}}</span> OLPC可收获</div>
        <div class="popup-form-count" v-if="pledgeType === 'GAFP+OLPC' && operType === 'HARVEST'"><span>{{doubleUserIncome}}</span> OLPC可收获</div>
        <van-field v-model="OLPCAmount" v-if="pledgeType === 'OLPC' || (pledgeType === 'GAFP+OLPC' && operType !== 'HARVEST')" class="popup-form-item" type="number" :placeholder="`请输入${operType === 'HARVEST' ? 'OLPC' :'OLPC-TRX LP'} ${OperTypeText[operType]}数量`">
          <template #button>
            <div class="popup-form-item-unit" v-if="operType !== 'HARVEST'">OLPC-TRX LP <span @click="onSetAll">最大</span></div>
            <div class="popup-form-item-unit" v-else>OLPC <span @click="onSetAll">最大</span></div>
          </template>
        </van-field>
        <div class="popup-form-count" v-if="pledgeType === 'GAFP+OLPC' && operType === 'PLEDGE'"><span>{{multiTotalAmountA}}</span> OLPC-TRX LP可用</div>
        <div class="popup-form-count" v-if="pledgeType === 'GAFP+OLPC' && operType === 'REDEEM'"><span>{{doubleAmountA}}</span> OLPC-TRX LP可用</div>
       
         <div class="popup-footer">
            <div class="popup-footer-btn border-btn" @click="onHidePopup">取消</div>
            <div class="sizedbox-width-100"></div>
            <div class="popup-footer-btn" @click="onConfirm">确认{{OperTypeText[operType]}}</div>
         </div>
         
      </div>
  </van-popup>
</template>

<script lang='ts'>
import { useRouter } from 'vue-router';
import { onMounted, ref, onUnmounted, computed } from 'vue';
import { Toast, Popup,Field,Button } from 'vant';
import Decimal from 'decimal.js';
import { pow } from '@/constants/index';
import { useGlobalHooks } from '@/hooks';
import * as routerPaths from '@/constants/app_routes_path';
import {  SinglePie, tokenAddress, pieAddress, tronWebApprove, MultiPie, RewardContract } from '@/tronlink/index';
import * as utils from '@/utils/index';

export default {
    name: 'select_page',
    components: {
      [Popup.name]: Popup,
      [Field.name]: Field,
      [Button.name]: Button
    },
    setup() {
      let timer: number = 0;
      type TPledgeType = "GAFP" | "OLPC" | "GAFP+OLPC";
      type TOperType = "PLEDGE" | "HARVEST" | "REDEEM";
      const OperTypeText = {
         "PLEDGE": '质押',
         "HARVEST": '收获',
         "REDEEM": '解押'
      }
      const { encryption_wellet_address, onGetWellet } = useGlobalHooks();

      const isRequest = ref<boolean>(false);
      const singlePie = new SinglePie();
      const multiPie = new MultiPie();
      const rewardContract = new RewardContract();
      const router = useRouter();
      const visible = ref<boolean>(false);
      const pledgeType = ref<TPledgeType>("GAFP");
      const operType = ref<TOperType>("PLEDGE");
      const needGafpApprove = ref<boolean>(false);
      const needOlpcApprove = ref<boolean>(false);
      const needDoubleApprove = ref<boolean>(false);

      /** 数据展示 */
      const singleUserIncome = ref<number>(0);  // 单币矿池收益
      const doubleUserIncome = ref<number>(0);  // 双币矿池收益
      const recommedUserIncome = ref<number>(0);  // 用户推荐收益
      const doubleAmountA = ref<number>(0);     // 双币矿池OLPC质押数量
      const doubleAmountB = ref<number>(0);     // 双币矿池GAFP质押数量
      const singleAmount = ref<number>(0);      // 单币质押数量
      const singleTotalAmount = ref<number>(0); // 单币可质押数量
      const multiTotalAmountA = ref<number>(0); // 双币OLPC可质押数量
      const multiTotalAmountB = ref<number>(0); // 双币GAFP可质押数量
      const ability = ref<number>(0);          // 推荐算力
      
      /** 表单字段 */
      const OLPCAmount = ref<string>('');
      const gafpAmount = ref<string>('');
      const doubleIncomeAmount = ref<string>('');
    
      const onRouter = (path: string) => {
        router.push(path)
      }

      const onShowPopup = (type: TPledgeType, oper: TOperType) => {
        pledgeType.value = type;
        visible.value = true;
        operType.value = oper;
        onSetAll();
      }

      const onSetAll = () => {
        if(pledgeType.value === "GAFP" && operType.value === "PLEDGE") {
           gafpAmount.value = singleTotalAmount.value.toString();
        }
        if(pledgeType.value  === "OLPC" && operType.value === "PLEDGE") {
          OLPCAmount.value = singleTotalAmount.value.toString();
        }
        if(pledgeType.value  === "GAFP+OLPC" && operType.value === "PLEDGE") {
          OLPCAmount.value = multiTotalAmountA.value.toString();
          gafpAmount.value = multiTotalAmountB.value.toString();
        }

        if(pledgeType.value  === "GAFP" && operType.value === "HARVEST") {
           gafpAmount.value = singleUserIncome.value.toString();
        }
        if(pledgeType.value  === "OLPC" && operType.value === "HARVEST") {
           OLPCAmount.value = recommedUserIncome.value.toString();
        }
        if(pledgeType.value  === "GAFP+OLPC" && operType.value === "HARVEST") {
          doubleIncomeAmount.value = doubleUserIncome.value.toString();
        }

        if(pledgeType.value  === "GAFP" && operType.value === "REDEEM") {
           gafpAmount.value = singleAmount.value.toString();
        }
        if(pledgeType.value  === "OLPC" && operType.value === "REDEEM") {
           OLPCAmount.value = singleAmount.value.toString();
        }
        if(pledgeType.value  === "GAFP+OLPC" && operType.value === "REDEEM") {
          gafpAmount.value = doubleAmountA.value.toString();
          OLPCAmount.value = doubleAmountB.value.toString();
        }
      }

      const onHidePopup = () => {
        visible.value = false;
      }

      onMounted(async () => {
        onGetApproveStatus();
      })

      onUnmounted(() => {
        console.log('onUnmounted')
        clearInterval(timer);
      })
      
      /**  获取授权状态 */
      const onGetApproveStatus = async () => {
        try {
          utils.loading('正在获取数据');
          const [res1, res2, res3, res4] = await Promise.all([
            singlePie.getTokenAllownceAmount(tokenAddress.GAFP),
            singlePie.getTokenAllownceAmount(tokenAddress.OLPC),
            multiPie.getTokenAllownceAmount(tokenAddress.GAFP),
            multiPie.getTokenAllownceAmount(tokenAddress.OLPC)
          ]);
          console.log(res1, res2, res3, res4);
          needGafpApprove.value = res1;
          needDoubleApprove.value =  res3 && res4;
          needOlpcApprove.value = res2;
          /** 已授权，获取对应数据 */
          if (res1 || res2) {
            onGetSingleUserStakeAsset();
            onGetSingleTotalAmount();
            onGetUserInfo();
          }
          if (res3 && res4) {
            onGetUserStakeAsset();
            onGetMultiTotalAmount()
          }
          onPollIncome();
          utils.loadingClean();
         } catch(err) {
           console.log(err);
          //  utils.toast(err || err.message);
         }
      }
      
      /** 单币授权 */ 
      const onApprove = async (address: string, token: string) => {
        try {
          utils.loading('授权中');
          await tronWebApprove(token, address);
          Toast.success({message: '授权成功', onClose: () => {
            onGetApproveStatus();
          }});
        } catch(err) {
          console.log(err);
          //  utils.toast(err || err.message);
        }
        
      }

      /** 双币授权 */
      const onApproveDuoble = async () => {
        try {
          utils.loading('授权中');
          await tronWebApprove(tokenAddress.GAFP, pieAddress.multi);
          await tronWebApprove(tokenAddress.OLPC, pieAddress.multi);
          Toast.success({message: '授权成功', onClose: () => {
            onGetApproveStatus();
          }});
         } catch(err) {
           console.log(err);
          //  utils.toast(err || err.message);
         }
      }

      /** 获取单币用户收益 */
      const onGetUserIncome = async () => {
          try {
            const res = await singlePie.userIncome();
            const income:number = (window as any).tronWeb.toDecimal(res.income);
            singleUserIncome.value = Number(new Decimal(income).div(pow))
         } catch(err) {
           console.log(err);
          //  utils.toast(err || err.message);
         }
      }

      /** 获取双币用户收益 */
      const onGetDoubleUserIncome = async () => {
          try {
            const res = await multiPie.userIncome();
            const income:number = (window as any).tronWeb.toDecimal(res.income);
            doubleUserIncome.value = Number(new Decimal(income).div(pow))
          } catch(err) {
            console.log(err);
          //  utils.toast(err || err.message);
          }
      }

      /** 获取用户推荐收益 */
       const onGetRecommedUserIncome = async () => {
          try {
            const res = await rewardContract.userIncome();
            const income:number = (window as any).tronWeb.toDecimal(res.income);
            recommedUserIncome.value = Number(new Decimal(income).div(pow))
          } catch(err) {
            console.log(err);
          //  utils.toast(err || err.message);
          }
      }

      /** 轮询收益 */
      const onPollIncome = async () => {
         clearInterval(timer);
         onPromiseAll();
         timer = setInterval (() => {
            console.log('polling-select');
            onPromiseAll();
         }, 1000);
      }
      /** PromiseAll */
      const onPromiseAll = async () => {
        const requestqueue = [];
        if (needGafpApprove.value) requestqueue.push(onGetUserIncome());
        if (needDoubleApprove.value) requestqueue.push(onGetDoubleUserIncome());
        if (needOlpcApprove.value)requestqueue.push(onGetRecommedUserIncome());
        if (requestqueue.length > 0) {
          try {
            if (!isRequest.value) {
              isRequest.value = true;
              await Promise.all(requestqueue);
              isRequest.value = false;
            }
          } catch(err) {
            console.log(err);
          }
        }
      }

      /** 获取用户的各项信息 */
       const onGetUserInfo = async () => {
          try {
            const res = await rewardContract.getUserInfo();
            const _ability:number = (window as any).tronWeb.toDecimal(res._ability);
            ability.value = Number(new Decimal(_ability).div(pow))
          } catch(err) {
            console.log(err);
          //  utils.toast(err || err.message);
          }
      }
      
      /** 获取双币各自质押数量 */
      const onGetUserStakeAsset = async () => {
          try {
            const res = await multiPie.getUserStakeAsset();
            console.log(res);
            const amountA:number = (window as any).tronWeb.toDecimal(res.amountA);
            const amountB:number = (window as any).tronWeb.toDecimal(res.amountB);
            doubleAmountA.value = Number(new Decimal(amountA).div(pow));
            doubleAmountB.value = Number(new Decimal(amountB).div(pow));
          } catch(err) {
            console.log(err);
           utils.toast(err || err.message);
          }
      }

      /** 获取单币质押数量 */
      const onGetSingleUserStakeAsset = async () => {
          try {
            const res = await singlePie.getUserStakeAsset();
            const amount:number = (window as any).tronWeb.toDecimal(res._stake)
            singleAmount.value = Number(new Decimal(amount).div(pow));
          } catch(err) {
            console.log(err);
          //  utils.toast(err || err.message);
          }
      }

      /** 获取单币可质押数量 */
      const onGetSingleTotalAmount = async () => {
          try {
            const res = await singlePie.getUserWalletAsset(tokenAddress.GAFP);
            const amount:number = (window as any).tronWeb.toDecimal(res)
            singleTotalAmount.value = Number(new Decimal(amount).div(pow));
          } catch(err) {
            console.log(err);
          //  utils.toast(err || err.message);
          }
      }

      /** 获取双币可质押数量 */
      const onGetMultiTotalAmount = async () => {
          try {
            const [resA, resB] = await Promise.all([multiPie.getUserWalletAsset(tokenAddress.OLPC), 
            multiPie.getUserWalletAsset(tokenAddress.GAFP)]);
            const amountA:number = (window as any).tronWeb.toDecimal(resA);
            const amountB:number = (window as any).tronWeb.toDecimal(resB);
            multiTotalAmountA.value = Number(new Decimal(amountA).div(pow));
            multiTotalAmountB.value = Number(new Decimal(amountB).div(pow));
          } catch(err) {
            console.log(err);
          //  utils.toast(err || err.message);
          }
      }
      
      /** 确认 */
      const onConfirm = async () => {
          if (!doubleIncomeAmount.value.trim() && (operType.value === "HARVEST" && pledgeType.value === "GAFP+OLPC")) {
              return utils.toast(`请输入OLPC${OperTypeText[operType.value]}数量`)
          }
          if (!OLPCAmount.value.trim() && (operType.value === "HARVEST" && pledgeType.value === "OLPC")) {
              return utils.toast(`请输入OLPC${OperTypeText[operType.value]}数量`)
          }
          if (!gafpAmount.value.trim() && (operType.value === "HARVEST" && pledgeType.value === "GAFP")) {
              return utils.toast(`请输入OLPC${OperTypeText[operType.value]}数量`)
          }
          if (!OLPCAmount.value.trim() && (pledgeType.value === "OLPC" || pledgeType.value === "GAFP+OLPC") && operType.value !== "HARVEST") {
              return utils.toast(`请输入OLPC${OperTypeText[operType.value]}数量`)
          }
          if (!gafpAmount.value.trim() && (pledgeType.value === "GAFP" || pledgeType.value === "GAFP+OLPC") && operType.value !== "HARVEST") {
              return utils.toast(`请输入GAFP${OperTypeText[operType.value]}数量`)
          }

          /** 质押 */
          if (operType.value === "PLEDGE") {
              onPledge(); 
          }
          /** 收获 */
          if (operType.value === "HARVEST") {
              onHarverst(); 
          }
           /** 解押 */
          if (operType.value === "REDEEM") {
              onRedeem(); 
          }
          
      }

      /** 质押 */
      const onPledge = async () => {
        try{
         if (pledgeType.value === "GAFP") {
            utils.loading('质押中');
            console.log(Number(gafpAmount.value) * pow)
            const res = await singlePie.updateOneAsset(Number(gafpAmount.value) * pow);
            console.log(res);
              Toast.success({message:'质押成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
          if (pledgeType.value === "OLPC") {
            utils.loading('质押中');
            console.log(Number(OLPCAmount.value) * pow)
            const res = await singlePie.updateOneAsset(Number(OLPCAmount.value) * pow);
            console.log(res);
            Toast.success({message:'质押成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
          if (pledgeType.value === "GAFP+OLPC") {
            utils.loading('质押中');
            console.log(Number(OLPCAmount.value) * pow)
            const amountA = Number(OLPCAmount.value) * pow;
            const amountB = Number(gafpAmount.value) * pow;
            const res = await multiPie.provideTwoAsset(amountA,amountB);
            console.log(res);
            Toast.success({message:'质押成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
        } catch(err) {
          console.log(err);
          // utils.toast(err || err.message);
        }
      }

      /** 收获 */
      const onHarverst = async () => {
        try{
         if (pledgeType.value === "GAFP") {
            utils.loading('收获中');
            console.log(Number(gafpAmount.value) * pow)
            const res = await singlePie.claim(Number(gafpAmount.value) * pow);
            console.log(res);
              Toast.success({message:'收获成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
          if (pledgeType.value === "OLPC") {
            utils.loading('收获中');
            console.log(Number(OLPCAmount.value) * pow)
            const res = await rewardContract.claim(Number(OLPCAmount.value) * pow);
            console.log(res);
            Toast.success({message:'收获成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
          if (pledgeType.value === "GAFP+OLPC") {
            utils.loading('收获中');
            console.log(Number(doubleIncomeAmount.value) * pow)
            const amount = Number(doubleIncomeAmount.value) * pow;
            const res = await multiPie.claim(amount);
            console.log(res);
            Toast.success({message:'收获成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
        } catch(err) {
          console.log(err);
          // utils.toast(err || err.message);
        }
      }

      /** 解押 */
      const onRedeem = async () => {
        try{
         if (pledgeType.value === "GAFP") {
            utils.loading('解押中');
            console.log(Number(gafpAmount.value) * pow)
            const res = await singlePie.withdrawOneAsset(Number(gafpAmount.value) * pow);
            console.log(res);
              Toast.success({message:'解押成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
          if (pledgeType.value === "OLPC") {
            utils.loading('解押中');
            console.log(Number(OLPCAmount.value) * pow)
            const res = await singlePie.withdrawOneAsset(Number(OLPCAmount.value) * pow);
            console.log(res);
            Toast.success({message:'解押成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
          if (pledgeType.value === "GAFP+OLPC") {
            utils.loading('解押中');
            console.log(Number(doubleIncomeAmount.value) * pow)
            console.log(Number(OLPCAmount.value) * pow)
            const amountA = Number(OLPCAmount.value) * pow;
            const amountB = Number(gafpAmount.value) * pow;
            const res = await multiPie.withdrawTwoAsset(amountA, amountB);
            console.log(res);
            Toast.success({message:'解押成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
        } catch(err) {
          console.log(err);
          // utils.toast(err || err.message);
        }
      }

      const olpcAmountvalue = computed({
        get: () => {
          const value = new Decimal(Number(gafpAmount.value)).mul(15);
          if (pledgeType.value === "GAFP+OLPC" && operType.value === "PLEDGE" && Number(value) > multiTotalAmountA.value) {
            return multiTotalAmountA.value
          }
          return value;
        },
        set: () => {}
      })
      
      
      /** 弹窗关闭，清空表单 */
      const onPopupClose = () => {
        gafpAmount.value = '';
        OLPCAmount.value = '';
        doubleIncomeAmount.value = '';
      }

      return {
        routerPaths, 
        needGafpApprove,
        needDoubleApprove, 
        needOlpcApprove, 
        tokenAddress,
        pieAddress, 
        singleUserIncome,
        doubleUserIncome,
        doubleAmountA,
        doubleAmountB,
        singleAmount,
        visible,
        OLPCAmount,
        gafpAmount,
        doubleIncomeAmount,
        pledgeType,
        OperTypeText,
        operType,
        encryption_wellet_address,
        singleTotalAmount,
        multiTotalAmountA,
        multiTotalAmountB,
        recommedUserIncome,
        ability,
        utils,
        onGetWellet,
        onHidePopup,
        onConfirm,
        onApprove,
        onApproveDuoble, 
        onRouter,
        onShowPopup,
        onPopupClose,
        onSetAll
      } 
    }
  };
</script>
<style lang="less">
 @import url('./style.less');
</style>