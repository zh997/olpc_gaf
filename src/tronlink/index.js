const TronWeb = require('tronweb');
const { main_net } = require('@/config');
const FarmOneAsset = require('./FarmOneAsset.json');
const FarmTwoAsset = require('./FarmTwoAsset.json');
const ITRC20 = require('./ITRC20.json');
console.log(main_net);
/** provider链接网络 */
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider(main_net);
const solidityNode = new HttpProvider(main_net);
const eventServer = new HttpProvider(main_net);
const privateKey = '';

/** 代币地址 */
const tokenAddress = {
    OLPC:'TA15uPAzkwbXUtzK8cUvrLKUjcjiEY99RS',
    GAFP:'TB2sHydUmp31vEiQyfRxxnA3dbd4CreCUz',
    OLPP:'TANvziYPGfYkY1nfuXgH2tTTq4ZmzZ8mcT'
}

/** 矿池地址 */
const pieAddress = {
    single: 'TLn8Ekq1tVShsqmp33mGbNfhx73WA7nSZR',
    multi: 'TCDr3xKF28LZ7M7k8sXStkmRQBd5QxHWLx' 
}

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer
);

/** 授权 */
export const tronWebApprove = () => {
    return new Promise((resolve, reject) => {
        (async() => {
            try {
                /** 用户钱包地址 */
                const address = window.tronWeb.defaultAddress.base58
                /** 授权数量 直接授权一个亿 第二次投资的时候 可以查询授权数量还有 就不用再次授权 */
                const amount = 100000000 * Math.pow(10,18);
                const contract = await tronWeb.contract(ITRC20.abi).at(tokenAddress.GAFP);
                const res = contract.approve('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', amount).send();
                console.log(res);
                window.contract = contract;
                resolve(window)
            } catch(err) {
                console.log(err);
                reject(err);
            }
        })();
    })
}

// /**
//  * 初始化contract
//  */
// export const initContract = () => {
//     return new Promise((resolve, reject) => {
//         (async() => {
//             try {
//                 const address = window.tronWeb.defaultAddress.base58
//                 const oneContractPromise = tronWeb.contract(FarmOneAsset.abi).at(address);
//                 const twoContractPromise = tronWeb.contract(FarmTwoAsset.abi).at(address);
//                 const [oneContract, twoContract] = await Promise.all([oneContractPromise, twoContractPromise]);
//                 window.oneContract = oneContract;
//                 window.twoContract = twoContract;
//                 resolve(window)
//             } catch(err) {
//                 console.log(err);
//                 reject(err);
//             }
//         })();
//     })
// }

export class SinglePie {

    /** 用户钱包地址 */
    address = window.tronWeb.defaultAddress.base58

    /** 获取矿池总质押数量 */
    getTotalAmount() {
        return window.oneContract.getTotalAmount()
    }
    /** 获取矿池总质押数量 */
    userIncome() {
        return window.oneContract.userIncome().call();
    }
    /** 获取用户质押数量 */
    getUserStakeAsset() {
        return window.oneContract.getUserStakeAsset(this.address).call();
    }
    /** 进行资产质押 */
    updateOneAsset(amount) {
        return window.oneContract.updateOneAsset(this.address, amount * Math.pow(10,18)).send();
    }

} 


/** 代币地址 */
const atAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

var timer = null;
var pullCount = 1;
var maxPullCount = 5;

export async function getTronlinkAddress() {
    clearInterval(timer);
    return new Promise((resolve, reject) => {
        timer = setInterval(() => {
            pullCount += 1;
            if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
                clearInterval(timer);
                const defaultAddress = window.tronWeb.defaultAddress.base58;
                console.log('--------------');
                console.log(defaultAddress);
                console.log('--------------');
                localStorage.setItem('address', defaultAddress);
                resolve(defaultAddress)
            }
            if (pullCount >= maxPullCount) {
                clearInterval(timer);
                reject('自动登录失败,请先安装TronLink并登录');
            }
        }, 1000)
    })
}

// 充值
export async function transaction(amount, address) {

    console.log(address, amount);
    let contract = await window.tronWeb.contract().at(atAddress);
    // awaiting
    return contract.transfer(
        address,
        window.tronWeb.toHex(amount)
    ).send({
        feeLimit: 10000000
    })
}