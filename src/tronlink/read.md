OLPC地址：TA15uPAzkwbXUtzK8cUvrLKUjcjiEY99RS
GAFP地址：TB2sHydUmp31vEiQyfRxxnA3dbd4CreCUz
OLPP地址：TANvziYPGfYkY1nfuXgH2tTTq4ZmzZ8mcT

矿池地址：TLn8Ekq1tVShsqmp33mGbNfhx73WA7nSZR
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


矿池地址：TCDr3xKF28LZ7M7k8sXStkmRQBd5QxHWLx
双币矿池如下：
//矿池内两币种的质押总量
function getTotalAmount()public view returns (uint256 amountA,uint256 amountB)
//获取用户收益
function userIncome(address _user) public view returns(uint256 income)
//获取用户两个币种的各自质押数量
function getUserStakeAsset(address customer) public view returns (uint256 amountA,uint256 amountB)
//用户进行两种币种质押
function provideTwoAsset(address tokenA,address tokenB,uint256 amountA,uint256 amountB,address customer) public
//获取用户是否需要对当前币种进行授权
function getTokenAllownceAmount(address customer,address token) public view returns(bool)
//解除两种资产挖矿
function withdrawTwoAsset(address customer,address tokenA,address tokenB,uint256 amountA,uint256 amountB) public
//用户提取挖矿收益
function claim(address customer,uint256 amount) public
