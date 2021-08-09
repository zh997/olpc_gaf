GAFT lpToken地址：TVpN8X4FUAsDAW6J9m3c58v3dacJJgpH8N
OLPT lpToken地址：TYuhhCibRSuw3mECXcLbKrLK9XnubdAX1y

注：单币矿池使用GAFT进行挖矿并进行授权，双币矿池使用了GAFT和OLPT两种，都需要进行授权进行挖矿

矿池地址：TJnaM32oyo3PqkCUpQ2vGg1qZ2BnYrPfWG
单币矿池如下：
//获取矿池总质押数量
getTotalAmount()public view returns (uint256 amountA)
//获取用户收益
function userIncome(address _user) public view returns(uint256 income)
//获取用户质押数量
function getUserStakeAsset(address customer) public view returns (uint256 amount)
//进行资产质押
function updateOneAsset(address customer,uint256 amount) public
//用户解除挖矿
function withdrawOneAsset(address customer,uint256 amount) public
//用户提取收益
function claim(address customer,uint256 amount) public
//获取用户是否需要对当前币种进行授权
function getTokenAllownceAmount(address customer,address token) public view returns(bool)
//获取用户钱包里有多少币可以用来质押
function getUserWalletAsset(address token,address customer) public view returns(uint256)



矿池地址：TAa3Gw2rAPnfN4czsWcGRNKFDjPsmdKoJW
双币矿池如下：
//矿池内两币种的质押总量
function getTotalAmount()public view returns (uint256 amountA,uint256 amountB)
//获取用户收益
function userIncome(address _user) public view returns(uint256 income)
//获取用户两个币种的各自质押数量,前者是OLPT lpToken的数量，后者是GAFT lpToken的数量
function getUserStakeAsset(address customer) public view returns (uint256 amountA,uint256 amountB)
//用户进行两种币种质押,前者是OLPT lpToken的数量，后者是GAFT lpToken的数量
function provideTwoAsset(uint256 amountA,uint256 amountB,address customer) public
//获取用户是否需要对当前币种进行授权
function getTokenAllownceAmount(address customer,address token) public view returns(bool)
//解除两种资产挖矿,前者是OLPT lpToken的数量，后者是GAFT lpToken的数量
function withdrawTwoAsset(address customer,uint256 amountA,uint256 amountB) public
//用户提取挖矿收益
function claim(address customer,uint256 amount) public
//获取用户钱包里有多少币可以用来质押
function getUserWalletAsset(address token,address customer) public view returns(uint256)



reward池：TTCDSKBXz44xiWfJvBYDTFX8CvkrDLtpy2
//用户填写推荐人钱包地址在链上生成推荐关系
function recommedCode(address _recommed,address _customer) public
//获取用户通过推荐获得的收益
function userIncome(address _user) public view returns(uint256 income)
//用户提取推荐收益
function claim(address customer,uint256 amount) public
//获取用户的各项信息，1.质押数量（不用展示） 2.推荐算力 3.推荐人地址 4.用户负债（不用展示）5.用户收益（不用展示）
function getUserInfo(address _customer) public view returns(uint256 _stake,uint256 _ability,address _recommed,uint256 _debt,uint256 _reward)

用来获取最大供应量
OLPT地址：TLggZp2ida3LgTuX3FdWKTXBp2dCzeb4Lt
function maxSupply() public view returns(uint256);
