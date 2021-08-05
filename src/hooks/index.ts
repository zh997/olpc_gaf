import { IMoneyConfigResDTO } from '@/services/interface/response';
import { Ref, ref } from 'vue';
import * as services from '@/services/index';
import { IGlobalHooks } from './type';
import * as utils from '@/utils/index';

const olpc_gaf_wellet_address = localStorage.getItem('olpc_gaf_wellet_address');

/** 全局状态 */
export const isShowTabbar: Ref = ref(false);
export const tabbarIndex: Ref = ref(0);
export const money_config: Ref = ref<IMoneyConfigResDTO>();
export const wellet_address = ref<string | null>(olpc_gaf_wellet_address);

/** 维护全局状态 */
export const useGlobalHooks = (): IGlobalHooks => {
   
   /** 控制tabbar显示隐藏 */
   const onShowTabbar = (val: boolean, index?: number) => {
      console.log(val);
      isShowTabbar.value = val;
      if (index !== undefined && typeof index === 'number' ) tabbarIndex.value = index;
   }
   
   /** 获取所有配置 */
   const onGetMoneyConfig = async () => {
      const res = await services.money_config();
      money_config.value = res.data;
   }

   /** 获取钱包地址 */

   const onGetWellet = () => {
      if(!wellet_address.value) {
        utils.loading('正在链接钱包');
        setTimeout(() => {
          const w_address = (window as any).tronWeb.defaultAddress.base58;
          const startText = w_address.substring(0, 5);
          const endText = w_address.substring(w_address.length - 5, w_address.length);
          const address =  startText + '******' + endText
          localStorage.setItem('olpc_gaf_wellet_address', address);
          wellet_address.value = address;
          utils.loadingClean();
        }, 1000)
      }
    }

   /** 返回状态 */
   return { isShowTabbar, tabbarIndex, money_config, wellet_address,  onShowTabbar, onGetMoneyConfig, onGetWellet };

}