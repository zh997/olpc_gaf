const FarmOneAsset = require('./FarmOneAsset.json');
const FarmTwoAsset = require('./FarmTwoAsset.json');
const ITRC20 = require('./ITRC20.json');

/** 代币地址 */
export const tokenAddress = {
    OLPC: 'TA15uPAzkwbXUtzK8cUvrLKUjcjiEY99RS',
    GAFP: 'TB2sHydUmp31vEiQyfRxxnA3dbd4CreCUz',
    OLPP: 'TANvziYPGfYkY1nfuXgH2tTTq4ZmzZ8mcT'
}

/** 矿池地址 */
export const pieAddress = {
    single: 'TLn8Ekq1tVShsqmp33mGbNfhx73WA7nSZR',
    multi: 'TCDr3xKF28LZ7M7k8sXStkmRQBd5QxHWLx'
}

/** 
 * 代币对合约授权 
 * @param token 代币地址
 * @param address 合约地址/矿池地址
 * */
export const tronWebApprove = (token, address) => {
    return new Promise((resolve, reject) => {
        (async() => {
            try {
                /** 授权数量 直接授权å一个亿 第二次投资的时候 可以查询授权数量还有 就不用再次授权 */
                const amount = 100000000 * Math.pow(10, 18);
                const contract = await window.tronWeb.contract(ITRC20.abi).at(token);
                const res = await contract.approve(address, window.tronWeb.toHex(amount)).send();
                resolve(res);
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })();
    })
}


/**
 * 初始化矿池实例
 */
export const initContract = () => {
    return new Promise((resolve, reject) => {
        (async() => {
            try {
                const singlePieContractPromise = window.tronWeb.contract(FarmOneAsset.abi).at(pieAddress.single);
                const multiContractPromise = window.tronWeb.contract(FarmTwoAsset.abi).at(pieAddress.multi);
                const [singlePieContract, multiPieContract] = await Promise.all([singlePieContractPromise, multiContractPromise]);
                window.singlePieContract = singlePieContract;
                window.multiPieContract = multiPieContract;
                resolve(window)
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })();
    })
}

export class SinglePie {

    /** 用户钱包地址 */
    wellet_address = window.tronWeb.defaultAddress.base58

    /** 获取矿池总质押数量 */
    getTotalAmount() {
            return window.singlePieContract.getTotalAmount()
        }
        /** 获取用户可质押数量 */
    getUserWalletAsset(token) {
        return window.singlePieContract.getUserWalletAsset(token, this.wellet_address)
    }

    /** 获取用户收益 */
    userIncome() {
            return window.singlePieContract.userIncome(this.wellet_address).call();
        }
        /** 获取用户质押数量 */
    getUserStakeAsset() {
            return window.singlePieContract.getUserStakeAsset(this.wellet_address).call();
        }
        /** 进行资产质押 */
    updateOneAsset(amount) {
            return window.singlePieContract.updateOneAsset(this.wellet_address, window.tronWeb.toHex(amount)).send();
        }
        /** 用户解除挖矿 */
    withdrawOneAsset(amount) {
            return window.singlePieContract.withdrawOneAsset(this.wellet_address, window.tronWeb.toHex(amount)).send();
        }
        /** 用户提取收益 */
    claim(amount) {
            return window.singlePieContract.claim(this.wellet_address, window.tronWeb.toHex(amount)).send();
        }
        /** 获取用户是否需要对当前币种进行授权 */
    getTokenAllownceAmount(token) {
        return window.singlePieContract.getTokenAllownceAmount(this.wellet_address, token).call();
    }

}

export class MultiPie {

    /** 用户钱包地址 */
    wellet_address = window.tronWeb.defaultAddress.base58

    /** 矿池内两币种的质押总量 */
    getTotalAmount() {
            return window.multiPieContract.getTotalAmount()
        }
        /** 获取用户可质押数量 */
    getUserWalletAsset(token) {
            return window.multiPieContract.getUserWalletAsset(token, this.wellet_address)
        }
        /** 获取用户收益 */
    userIncome() {
            return window.multiPieContract.userIncome(this.wellet_address).call();
        }
        /** 获取用户两个币种的各自质押数量 */
    getUserStakeAsset() {
            return window.multiPieContract.getUserStakeAsset(this.wellet_address).call();
        }
        /** 用户进行两种币种质押 */
    provideTwoAsset(amountA, amountB) {
            return window.multiPieContract.provideTwoAsset(
                window.tronWeb.toHex(amountA),
                window.tronWeb.toHex(amountB),
                this.wellet_address,
            ).send();
        }
        /** 获取用户是否需要对当前币种进行授权 */
    getTokenAllownceAmount(token) {
            return window.multiPieContract.getTokenAllownceAmount(this.wellet_address, token).call();
        }
        /** 解除两种资产挖矿 */
    withdrawTwoAsset(amountA, amountB) {
            return window.oneContract.withdrawTwoAsset(
                this.wellet_address,
                window.tronWeb.toHex(amountA),
                window.tronWeb.toHex(amountB),
            ).send();
        }
        /** 用户提取挖矿收益 */
    claim(amount) {
        return window.multiPieContract.claim(this.wellet_address, window.tronWeb.toHex(amount)).call();
    }

}


/** 
 * 检测tronWeb是否挂载
 */
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