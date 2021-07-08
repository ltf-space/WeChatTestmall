import { getSetting,chooseAddress,openSetting,showModal,showToast } from '../../utils/asyncWX.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
import {request} from '../../request/index'
Page({
  data: {
    // 存放地址信息
    address:{},
    // 购物车商品信息
    shopInfo:[],
    // 商品总价格
    totalPrice:0,
    // 总数量
    totalNum:0
  },
  onLoad: function (options) {
  },
  onShow: function(){
    let address = wx.getStorageSync('address');
    let shopInfo = wx.getStorageSync('cart')||[];
    // 只要被选中的商品
    shopInfo = shopInfo.filter(item => item.checked)
    this.setData({address})
    this.setCart(shopInfo)
    
  },
  async handleAddAddress(){//处理收货地址
    try{
      // 获取权限状态
      const res = await getSetting()
      let scopeAddress = res.authSetting['scope.address']
      // 判断权限状态
      if(scopeAddress === false){
        // 重新开启权限
        await openSetting()
      }
      // 调用获取收货地址的api
      const res2 = await chooseAddress()
      // 保存缓存
      wx.setStorageSync('address', res2);
    }catch(err){
      console.log(err)
    }
  },
  setCart(shopInfo){//把总数量，总价格放到公共函数里
    let totalPrice = 0
    let totalNum = 0
    shopInfo.forEach(item => {
      totalPrice += item.num * item.goods_price
      totalNum += item.num
    });
    this.setData({
      totalPrice,
      totalNum,
      shopInfo
    })
  },
  async handleOrderPay(){//点击支付
    const token = wx.getStorageSync('token')
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
    }
    // 将token加在header的Authorization中
    const header = {Authorization:token}
    // 获得总价格
    const order_price = this.data.totalPrice
    // 获得地址
    const consignee_addr = this.data.address
    const {shopInfo} = this.data
    // 订单数组
    let goods = []
    // 遍历出订单数组
    shopInfo.forEach(item => {
      goods.push({
        goods_id:item.goods_id,
        goods_number:item.num,
        goods_price:item.goods_price
      })
    })
    // 收集订单请求参数
    let orderParams = {order_price,consignee_addr,goods,header}
    console.log(orderParams)
    const res = await request({
      url:'/my/orders/create',
      method:'Post',
      data:orderParams
    })
    console.log(res)
  }

})