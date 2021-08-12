const FarmOneAsset = require('./FarmOneAsset.json');
const FarmTwoAsset = require('./FarmTwoAsset.json');
const ITRC20 = require('./ITRC20.json');
const Recommed = require('./Recommed.json');
const Olpc = require('./Olpc.json');
const { pow } = require('@/constants/index');

/** 代币地址 */
// export const tokenAddress = {
//         OLPC: 'TA15uPAzkwbXUtzK8cUvrLKUjcjiEY99RS',
//         GAFP: 'TVbRqw2oZTyD8sPojc9Gjb4q5aGR125hgx',
//         OLPC: 'TANvziYPGfYkY1nfuXgH2tTTq4ZmzZ8mcT'
//     }
export const tokenAddress = {
    GAFP: 'TVpN8X4FUAsDAW6J9m3c58v3dacJJgpH8N',
    OLPC: 'TYuhhCibRSuw3mECXcLbKrLK9XnubdAX1y'
}


/** 矿池地址 */
export const pieAddress = {
    single: 'TJnaM32oyo3PqkCUpQ2vGg1qZ2BnYrPfWG',
    multi: 'TF2x5a1vaEaNyDXY2p43eoeMQuPFwyKofd',
    reward: 'TCC5xkLQBXdfRFsUQWfDt4QdN5vxPZ8TfJ'
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
                const amount = 1000000000000000000000000000000000000000000000000000000 * pow;
                const contract = await window.tronWeb.contract(ITRC20.abi, token);
                const res = await contract.approve(address, window.tronWeb.toHex(amount)).send();
                resolve(res);
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })();
    })
}

/** 初始化OLPT代币实例, 用来获取最大供应量 */
export const initOlptContract = () => {
    return new Promise((resolve, reject) => {
        (async() => {
            try {
                const contract = await window.tronWeb.contract(Olpc.abi, 'TLggZp2ida3LgTuX3FdWKTXBp2dCzeb4Lt');
                window.olptContract = contract;
                resolve(contract);
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })();
    })
}

/** reward矿池实例 */
export const initRewardContract = () => {
    return new Promise((resolve, reject) => {
        (async() => {
            try {
                const contract = await window.tronWeb.contract(Recommed.abi, pieAddress.reward);
                window.rewardContract = contract;
                console.log(contract);
                resolve(contract);
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
                const singlePieContractPromise = window.tronWeb.contract(FarmOneAsset.abi, pieAddress.single);
                const multiContractPromise = window.tronWeb.contract(FarmTwoAsset.abi, pieAddress.multi);
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

export class RewardContract {
    /** 用户钱包地址 */
    wellet_address = window.tronWeb.defaultAddress.base58

    /** 生成推荐关系 */
    recommedCode(_recommed) {
            return window.rewardContract.recommedCode(_recommed).send();
        }
        /** 获取用户通过推荐获得的收益 */
    userIncome() {
            return window.rewardContract.userIncome(this.wellet_address).call();
        }
        /** 用户提取推荐收益 */
    claim(amount) {
            return window.rewardContract.claim(this.wellet_address, amount).send();
        }
        /** 获取用户的各项信息，1.质押数量（不用展示） 2.推荐算力 3.推荐人地址 4.用户负债（不用展示）5.用户收益（不用展示） */
    getUserInfo() {
        return window.rewardContract.getUserInfo(this.wellet_address).call();
    }
}

export class OlptContract {
    /** 用户钱包地址 */
    wellet_address = window.tronWeb.defaultAddress.base58

    /** 用来获取最大供应量 */
    maxSupply() {
        return window.olptContract.maxSupply().call();
    }
}

export class SinglePie {

    /** 用户钱包地址 */
    wellet_address = window.tronWeb.defaultAddress.base58

    /** 获取矿池总质押数量 */
    getTotalAmount() {
            return window.singlePieContract.getTotalAmount().call();
        }
        /** 获取用户可质押数量 */
    getUserWalletAsset(token) {
        return window.singlePieContract.getUserWalletAsset(token, this.wellet_address).call()
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
            return window.multiPieContract.getTotalAmount().call()
        }
        /** 获取用户可质押数量 */
    getUserWalletAsset(token) {
            return window.multiPieContract.getUserWalletAsset(token, this.wellet_address).call()
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
            return window.multiPieContract.withdrawTwoAsset(
                this.wellet_address,
                window.tronWeb.toHex(amountA),
                window.tronWeb.toHex(amountB),
            ).send();
        }
        /** 用户提取挖矿收益 */
    claim(amount) {
        return window.multiPieContract.claim(this.wellet_address, window.tronWeb.toHex(amount)).send();
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