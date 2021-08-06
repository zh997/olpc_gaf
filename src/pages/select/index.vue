<!-- 首页 -->
<template>
  <div class="olpcgaf-select">
    <div class="olpcgaf-select-header">
     <img src="../../assets/3.png" class="olpcgaf-select-header-logo" alt="">
     <div class="olpcgaf-select-header-btn" @click="onGetWellet" v-if="!wellet_address">
       我的钱包
     </div>
     <div class="olpcgaf-select-header-address" v-else>
       {{wellet_address}}
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
           <img src="../../assets/gary_logo_1@2x.png" class="olpcgaf-select-shadowcard-logo" alt="">
        </div>
      
       <div  class="olpcgaf-select-shadowcard-title-wrap" v-if="needGafpApprove">
          <!-- <div class="olpcgaf-select-shadowcard-title-label">收益</div> -->
          <div class="olpcgaf-select-shadowcard-title-value">{{singleUserIncome}}</div>
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
       <div class="olpcgaf-select-shadowcard-btn" v-if="needGafpApprove" @click="onShowPopup('GAFP', 'REDEEM')">赎回</div>
    </div>
    <div class="olpcgaf-select-shadowcard">
      <div class="olpcgaf-select-shadowcard-logos">
         <img src="../../assets/4.png" class="olpcgaf-select-shadowcard-logo" alt=""> 
         <span>+</span> 
         <img src="../../assets/gary_logo_1@2x.png" class="olpcgaf-select-shadowcard-logo" alt=""> 
      </div>
       <div  class="olpcgaf-select-shadowcard-title-wrap" v-if="needDoubleApprove">
          <!-- <div class="olpcgaf-select-shadowcard-title-label">收益</div> -->
          <div class="olpcgaf-select-shadowcard-title-value">{{doubleUserIncome}}</div>
       </div>
        <!-- <div  class="olpcgaf-select-shadowcard-title-wrap" v-if="needDoubleApprove">
          <div class="olpcgaf-select-shadowcard-title-label">GAF 数量</div>
          <div class="olpcgaf-select-shadowcard-title-value">{{doubleAmountA}}</div>
       </div>
        <div  class="olpcgaf-select-shadowcard-title-wrap" v-if="needDoubleApprove">
          <div class="olpcgaf-select-shadowcard-title-label">OLPP 数量</div>
          <div class="olpcgaf-select-shadowcard-title-value">{{doubleAmountB}}</div>
       </div> -->
       <p class="olpcgaf-select-shadowcard-text" v-if="!needDoubleApprove">待授权</p>
        <p class="olpcgaf-select-shadowcard-text" v-if="needDoubleApprove">待收获 OLPC</p>
       <div class="olpcgaf-select-shadowcard-btn" @click="onApproveDuoble" v-if="!needDoubleApprove">授权</div>
       <div class="olpcgaf-select-shadowcard-btn" v-if="needDoubleApprove" @click="onShowPopup('GAFP+OLPP','PLEDGE')">质押</div>
       <div class="olpcgaf-select-shadowcard-btn" v-if="needDoubleApprove" @click="onShowPopup('GAFP+OLPP','HARVEST')">收获</div>
       <div class="olpcgaf-select-shadowcard-btn" v-if="needDoubleApprove"  @click="onShowPopup('GAFP+OLPP','REDEEM')">赎回</div>
    </div>
    <div class="olpcgaf-select-shadowcard">
      <div class="olpcgaf-select-shadowcard-logos">
           <img src="../../assets/4.png" class="olpcgaf-select-shadowcard-logo" alt="">
      </div>
    
         <div  class="olpcgaf-select-shadowcard-title-wrap" v-if="needOlpcApprove">
          <!-- <div class="olpcgaf-select-shadowcard-title-label">收益</div> -->
          <div class="olpcgaf-select-shadowcard-title-value">{{singleUserIncome}}</div>
       </div>
        <!-- <div  class="olpcgaf-select-shadowcard-title-wrap" v-if="needOlpcApprove">
          <div class="olpcgaf-select-shadowcard-title-label">数量</div>
          <div class="olpcgaf-select-shadowcard-title-value">{{singleAmount}}</div>
       </div> -->
        <p class="olpcgaf-select-shadowcard-text" v-if="!needOlpcApprove">待授权</p>
         <p class="olpcgaf-select-shadowcard-text" v-if="needOlpcApprove">待收获 OLPC</p>
       <div class="olpcgaf-select-shadowcard-btn"  @click="onApprove(pieAddress.single,tokenAddress.OLPP)" v-if="!needOlpcApprove">授权</div>
       <div class="olpcgaf-select-shadowcard-btn" v-if="needOlpcApprove"  @click="onShowPopup('OLPP', 'PLEDGE')">质押</div>
       <div class="olpcgaf-select-shadowcard-btn" v-if="needOlpcApprove"  @click="onShowPopup('OLPP', 'HARVEST')">收获</div>
        <div class="olpcgaf-select-shadowcard-btn" v-if="needOlpcApprove"  @click="onShowPopup('OLPP', 'REDEEM')">赎回</div>
    </div>
  </div>
  <van-popup v-model:show="visible" @close="onPopupClose" position="bottom">
      <div class="popup-form-wrap">
        <div class="popup-form-title">{{OperTypeText[operType]}} {{operType !== 'HARVEST' ? 'OSK-TRX ' + pledgeType : 'OLPC'}}</div>
        <van-field v-model="olppAmount" v-if="pledgeType === 'OLPP' || (pledgeType === 'GAFP+OLPP' && operType !== 'HARVEST')" class="popup-form-item" type="number" :placeholder="`请输入${operType === 'HARVEST' ? 'OLPC' :'OLPP'} ${OperTypeText[operType]}数量`">
          <template #button>
            <div class="popup-form-item-unit" v-if="operType !== 'HARVEST'">OSK-TRX OLPP <span @click="onSetAll">最大</span></div>
            <div class="popup-form-item-unit" v-else>OLPC <span @click="onSetAll">最大</span></div>
          </template>
        </van-field>
        <div class="popup-form-count" v-if="pledgeType === 'GAFP+OLPP' && operType === 'PLEDGE'"><span>{{multiTotalAmountB}}</span> OSK-TRX OLPP可用</div>
        <div class="popup-form-count" v-if="pledgeType === 'GAFP+OLPP' && operType === 'REDEEM'"><span>{{doubleAmountB}}</span> OSK-TRX OLPP可用</div>
        <van-field v-model="gafpAmount" v-if="pledgeType === 'GAFP' || (pledgeType === 'GAFP+OLPP' && operType !== 'HARVEST')" class="popup-form-item" type="number" :placeholder="`请输入${operType === 'HARVEST' ? 'OLPC' :'GAFP'} ${OperTypeText[operType]}数量`" >
          <template #button>
            <div class="popup-form-item-unit" v-if="operType !== 'HARVEST'">OSK-TRX GAFP <span @click="onSetAll">最大</span></div>
            <div class="popup-form-item-unit" v-else>OLPC <span @click="onSetAll">最大</span></div>
          </template>
        </van-field>
         <van-field v-model="doubleIncomeAmount" v-if="pledgeType === 'GAFP+OLPP' && operType === 'HARVEST'" class="popup-form-item" type="number" :placeholder="`请输入OLPC ${OperTypeText[operType]}数量`" >
          <template #button>
            <div class="popup-form-item-unit">OLPC <span @click="onSetAll">最大</span></div>
          </template>
        </van-field>
        <div class="popup-form-count" v-if="pledgeType === 'GAFP+OLPP' && operType === 'PLEDGE'"><span>{{multiTotalAmountA}}</span> OSK-TRX GAFP可用</div>
        <div class="popup-form-count" v-if="(pledgeType === 'GAFP' || pledgeType === 'OLPP') && operType === 'PLEDGE'"><span>{{singleTotalAmount}}</span> OSK-TRX {{pledgeType}}可用</div>
        <div class="popup-form-count" v-if="pledgeType === 'GAFP+OLPP' && operType === 'REDEEM'"><span>{{doubleAmountA}}</span> OSK-TRX GAFP可用</div>
        <div class="popup-form-count" v-if="(pledgeType === 'GAFP' || pledgeType === 'OLPP') && operType === 'REDEEM'"><span>{{singleAmount}}</span> OSK-TRX {{pledgeType}}可用</div>
        <div class="popup-form-count" v-if="(pledgeType === 'GAFP' || pledgeType === 'OLPP') && operType === 'HARVEST'"><span>{{singleUserIncome}}</span> OLPC可收获</div>
        <div class="popup-form-count" v-if="pledgeType === 'GAFP+OLPP' && operType === 'HARVEST'"><span>{{doubleUserIncome}}</span> OLPC可收获</div>
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
import { onMounted, ref } from 'vue';
import { Toast, Popup,Field,Button } from 'vant';
import Decimal from 'decimal.js';
import { pow } from '@/constants/index';
import { useGlobalHooks } from '@/hooks';
import * as routerPaths from '@/constants/app_routes_path';
import {  SinglePie, tokenAddress, pieAddress, tronWebApprove, MultiPie } from '@/tronlink/index';
import * as utils from '@/utils/index';

export default {
    name: 'select_page',
    components: {
      [Popup.name]: Popup,
      [Field.name]: Field,
      [Button.name]: Button
    },
    setup() {
      type TPledgeType = "GAFP" | "OLPP" | "GAFP+OLPP";
      type TOperType = "PLEDGE" | "HARVEST" | "REDEEM";
      const OperTypeText = {
         "PLEDGE": '质押',
         "HARVEST": '收获',
         "REDEEM": '赎回'
      }
      const { wellet_address, onGetWellet } = useGlobalHooks();
      const singlePie = new SinglePie();
      const multiPie = new MultiPie();
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
      const doubleAmountA = ref<number>(0);     // 双币矿池GAFP质押数量
      const doubleAmountB = ref<number>(0);     // 双币矿池OLPP质押数量
      const singleAmount = ref<number>(0);      // 单币质押数量
      const singleTotalAmount = ref<number>(0); // 单币可质押数量
      const multiTotalAmountA = ref<number>(0); // 双币GAFP可质押数量
      const multiTotalAmountB = ref<number>(0); // 双币GAFP可质押数量
      
      /** 表单字段 */
      const olppAmount = ref<string>('');
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
        if(pledgeType.value  === "OLPP" && operType.value === "PLEDGE") {
          olppAmount.value = singleTotalAmount.value.toString();
        }
        if(pledgeType.value  === "GAFP+OLPP" && operType.value === "PLEDGE") {
            gafpAmount.value = multiTotalAmountA.value.toString();
            olppAmount.value = multiTotalAmountB.value.toString();
        }

        if(pledgeType.value  === "GAFP" && operType.value === "HARVEST") {
           gafpAmount.value = singleUserIncome.value.toString();
        }
        if(pledgeType.value  === "OLPP" && operType.value === "HARVEST") {
           olppAmount.value = singleUserIncome.value.toString();
        }
        if(pledgeType.value  === "GAFP+OLPP" && operType.value === "HARVEST") {
          doubleIncomeAmount.value = doubleUserIncome.value.toString();
        }

        if(pledgeType.value  === "GAFP" && operType.value === "REDEEM") {
           gafpAmount.value = singleAmount.value.toString();
        }
        if(pledgeType.value  === "OLPP" && operType.value === "REDEEM") {
           olppAmount.value = singleAmount.value.toString();
        }
        if(pledgeType.value  === "GAFP+OLPP" && operType.value === "REDEEM") {
          gafpAmount.value = doubleAmountA.value.toString();
          olppAmount.value = doubleAmountB.value.toString();
        }
      }

      const onHidePopup = () => {
        visible.value = false;
      }

      onMounted(async () => {
        onGetApproveStatus();
      })
      
      /**  获取授权状态 */
      const onGetApproveStatus = async () => {
        try {
          utils.loading('正在获取数据');
          const [res1, res2, res3, res4] = await Promise.all([
            singlePie.getTokenAllownceAmount(tokenAddress.GAFP),
            singlePie.getTokenAllownceAmount(tokenAddress.OLPP),
            multiPie.getTokenAllownceAmount(tokenAddress.GAFP),
            multiPie.getTokenAllownceAmount(tokenAddress.OLPP)
          ]);
          console.log(res1, res2, res3, res4);
          needGafpApprove.value = res1;
          needDoubleApprove.value =  res3 && res4;
          needOlpcApprove.value = res2;
          /** 已授权，获取对应数据 */
          if (res1 || res2) {
            onGetUserIncome();
            onGetSingleUserStakeAsset();
            onGetSingleTotalAmount();
          }
          if (res3 && res4) {
            onGetDoubleUserIncome();
            onGetUserStakeAsset();
            onGetMultiTotalAmount()
          }
          utils.loadingClean();
         } catch(err) {
           utils.toast(err || err.message);
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
           utils.toast(err || err.message);
           utils.loadingClean();
        }
        
      }

      /** 双币授权 */
      const onApproveDuoble = async () => {
        try {
          utils.loading('授权中');
          await tronWebApprove(tokenAddress.GAFP, pieAddress.multi);
          await tronWebApprove(tokenAddress.OLPP, pieAddress.multi);
          Toast.success({message: '授权成功', onClose: () => {
            onGetApproveStatus();
          }});
         } catch(err) {
           utils.toast(err || err.message);
           utils.loadingClean();
         }
      }

      /** 获取单币用户收益 */
      const onGetUserIncome = async () => {
          try {
            const res = await singlePie.userIncome();
            const income:number = (window as any).tronWeb.toDecimal(res.income);
            console.log(Number(new Decimal(income).div(pow)),income)
            singleUserIncome.value = utils.toFixed(Number(new Decimal(income).div(pow)), 4); 
         } catch(err) {
           utils.toast(err || err.message);
           utils.loadingClean();
         }
      }

      /** 获取双币用户收益 */
      const onGetDoubleUserIncome = async () => {
          try {
            const res = await multiPie.userIncome();
            const income:number = (window as any).tronWeb.toDecimal(res.income);
            doubleUserIncome.value = utils.toFixed(Number(new Decimal(income).div(pow)), 4);
          } catch(err) {
           utils.toast(err || err.message);
           utils.loadingClean();
          }
      }
      
      /** 获取双币各自质押数量 */
      const onGetUserStakeAsset = async () => {
          try {
            const res = await multiPie.getUserStakeAsset();
            console.log(res);
            const amountA:number = (window as any).tronWeb.toDecimal(res.amountA);
            const amountB:number = (window as any).tronWeb.toDecimal(res.amountB);
            doubleAmountA.value = utils.toFixed(Number(new Decimal(amountA).div(pow)), 4) ;
            doubleAmountB.value = utils.toFixed(Number(new Decimal(amountB).div(pow)), 4);
          } catch(err) {
           utils.toast(err || err.message);
           utils.loadingClean();
          }
      }

      /** 获取单币质押数量 */
      const onGetSingleUserStakeAsset = async () => {
          try {
            const res = await singlePie.getUserStakeAsset();
            const amount:number = (window as any).tronWeb.toDecimal(res.amount)
            singleAmount.value =utils.toFixed( Number(new Decimal(amount).div(pow)), 4);
          } catch(err) {
           utils.toast(err || err.message);
           utils.loadingClean();
          }
      }

      /** 获取单币可质押数量 */
      const onGetSingleTotalAmount = async () => {
          try {
            const res = await singlePie.getUserWalletAsset(tokenAddress.GAFP);
            console.log(res);
            const amount:number = (window as any).tronWeb.toDecimal(res.amount)
            singleTotalAmount.value =utils.toFixed(Number(new Decimal(amount).div(pow)), 4);
          } catch(err) {
           utils.toast(err || err.message);
           utils.loadingClean();
          }
      }

      /** 获取双币可质押数量 */
      const onGetMultiTotalAmount = async () => {
          try {
            const [resA, resB] = await Promise.all([multiPie.getUserWalletAsset(tokenAddress.GAFP), 
            multiPie.getUserWalletAsset(tokenAddress.OLPP)]);
            const amountA:number = (window as any).tronWeb.toDecimal(resA.amount);
            const amountB:number = (window as any).tronWeb.toDecimal(resB.amount);
            multiTotalAmountA.value = utils.toFixed(Number(new Decimal(amountA).div(pow)), 4) ;
            multiTotalAmountB.value = utils.toFixed(Number(new Decimal(amountB).div(pow)), 4);
          } catch(err) {
           utils.toast(err || err.message);
           utils.loadingClean();
          }
      }
      
      /** 确认 */
      const onConfirm = async () => {
          if (!gafpAmount.value.trim() && (pledgeType.value === "GAFP" || pledgeType.value === "GAFP+OLPP")) {
              return utils.toast(`请输入GAFP${OperTypeText[operType.value]}数量`)
          }
          if (!olppAmount.value.trim() && (pledgeType.value === "OLPP" || pledgeType.value === "GAFP+OLPP")) {
              return utils.toast(`请输入OLPP${OperTypeText[operType.value]}数量`)
          }
      
          // if (!/[0-9]*[1-9][0-9]*$/.test(olppAmount.value.toString()) && (pledgeType.value === "OLPP" || pledgeType.value === "GAFP+OLPP")) {
          //   return utils.toast(`请输入正整数OLPP${OperTypeText[operType.value]}数量`)
          // }
          // if (!/[0-9]*[1-9][0-9]*$/.test(gafpAmount.value.toString()) && (pledgeType.value === "GAFP" || pledgeType.value === "GAFP+OLPP")) {
          //   return utils.toast(`请输入正整数GAFP${OperTypeText[operType.value]}数量`)
          // }
          /** 质押 */
          if (operType.value === "PLEDGE") {
              onPledge(); 
          }
          /** 收获 */
          if (operType.value === "HARVEST") {
              onHarverst(); 
          }
           /** 赎回 */
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
          if (pledgeType.value === "OLPP") {
            utils.loading('质押中');
            console.log(Number(olppAmount.value) * pow)
            const res = await singlePie.updateOneAsset(Number(olppAmount.value) * pow);
            console.log(res);
            Toast.success({message:'质押成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
          if (pledgeType.value === "GAFP+OLPP") {
            utils.loading('质押中');
            console.log(Number(olppAmount.value) * pow)
            const amountA = Number(gafpAmount.value) * pow;
            const amountB = Number(olppAmount.value) * pow;
            const res = await multiPie.provideTwoAsset(amountA,amountB);
            console.log(res);
            Toast.success({message:'质押成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
        } catch(err) {
          utils.toast(err || err.message);
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
          if (pledgeType.value === "OLPP") {
            utils.loading('收获中');
            console.log(Number(olppAmount.value) * pow)
            const res = await singlePie.claim(Number(olppAmount.value) * pow);
            console.log(res);
            Toast.success({message:'收获成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
          if (pledgeType.value === "GAFP+OLPP") {
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
          utils.toast(err || err.message);
        }
      }

      /** 赎回 */
      const onRedeem = async () => {
        try{
         if (pledgeType.value === "GAFP") {
            utils.loading('赎回中');
            console.log(Number(gafpAmount.value) * pow)
            const res = await singlePie.withdrawOneAsset(Number(gafpAmount.value) * pow);
            console.log(res);
              Toast.success({message:'赎回成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
          if (pledgeType.value === "OLPP") {
            utils.loading('赎回中');
            console.log(Number(olppAmount.value) * pow)
            const res = await singlePie.withdrawOneAsset(Number(olppAmount.value) * pow);
            console.log(res);
            Toast.success({message:'赎回成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
          if (pledgeType.value === "GAFP+OLPP") {
            utils.loading('赎回中');
            console.log(Number(doubleIncomeAmount.value) * pow)
            console.log(Number(olppAmount.value) * pow)
            const amountA = Number(gafpAmount.value) * pow;
            const amountB = Number(olppAmount.value) * pow;
            const res = await multiPie.withdrawTwoAsset(amountA, amountB);
            console.log(res);
            Toast.success({message:'赎回成功', onClose: () => {
              visible.value = false;
              onGetApproveStatus();
            }})
          }
        } catch(err) {
          utils.toast(err || err.message);
        }
      }
      
      
      /** 弹窗关闭，清空表单 */
      const onPopupClose = () => {
        gafpAmount.value = '';
        olppAmount.value = '';
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
        olppAmount,
        gafpAmount,
        doubleIncomeAmount,
        pledgeType,
        OperTypeText,
        operType,
        wellet_address,
        singleTotalAmount,
        multiTotalAmountA,
        multiTotalAmountB,
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