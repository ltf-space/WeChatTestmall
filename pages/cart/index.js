import { getSetting,chooseAddress,openSetting,showModal,showToast } from '../../utils/asyncWX.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    // 存放地址信息
    address:{},
    // 购物车商品信息
    shopInfo:[],
    // 是否全选
    allChecked:false,
    // 商品总价格
    totalPrice:0,
    // 总数量
    totalNum:0
  },
  onLoad: function (options) {
  },
  onShow: function(){
    let address = wx.getStorageSync('address');
    const shopInfo = wx.getStorageSync('cart')||[];
    // every数组方法，每一项都为true时返回true，否则返回false
    // const allChecked = shopInfo.length?shopInfo.every(item => item.checked):false
    this.setData({address})
    this.setCart(shopInfo)
    
  },

  // 1假设用户点击收货地址的提示框 确定 按钮 authSetting[scope.address]=true,直接调用 获取收货地址
  // 2假设用户没有点击收货地址的提示框 authSetting[scope.address]=undefined,直接调用 获取收货地址
  // 3假设用户点击收货地址的提示框 取消 按钮authSetting[scope.address]=false,
      // 诱导用户 自己打开授权页面(show.openSetting) 获取收货地址
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
  handleItemChange(e){//点击复选框触发
    console.log(e)
    let id = e.currentTarget.dataset.id
    let {shopInfo} = this.data
    let index = shopInfo.findIndex(item => item.goods_id === id)
    shopInfo[index].checked = !shopInfo[index].checked
    // const allChecked = shopInfo.every(item => item.checked)
    this.setCart(shopInfo)
  },
  setCart(shopInfo){//把总数量，总价格放到公共函数里
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    shopInfo.forEach(item => {
      if(item.checked){
        totalPrice += item.num * item.goods_price
        totalNum += item.num
      }else{
        allChecked = false
      }
    });
    // 判断数组是否为空
    allChecked = shopInfo.length!=0?allChecked:false
    this.setData({
      totalPrice,
      totalNum,
      shopInfo,
      allChecked
    })
    wx.setStorageSync('cart',shopInfo)
  },
  handleAllChange(){//点击全选按钮全选或者全部取消购物车列表
    const shopInfo = wx.getStorageSync('cart')||[]
    let {allChecked} = this.data
    if(allChecked){
      allChecked = !allChecked
      shopInfo.forEach(item => item.checked = false)     
      this.setCart(shopInfo)
    }else{
      allChecked = !allChecked
      shopInfo.forEach(item => item.checked = true)     
      this.setCart(shopInfo)
    }
    this.setData({allChecked,shopInfo})
    wx.setStorageSync('cart',shopInfo)
  },
  async handleNumEdit(e){//点击加号 减号改变商品num属性
    let { id,operation } = e.currentTarget.dataset
    console.log(id,operation)
    let {shopInfo} = this.data
    let index = shopInfo.findIndex(item => item.goods_id === id)
    if(shopInfo[index].num===1&&operation===-1){
      const res = await showModal('是否确定删除')
      if(res.confirm){//用户点击确定按钮
        shopInfo.splice(index,1)
        this.setCart(shopInfo)
      }else if(res.cancel){
        return
      }
    }
    shopInfo[index].num += operation
    this.setCart(shopInfo)
  },
  handlePrice(){//点击结算按钮
    const {address} = this.data
    const {totalNum} = this.data
    // 没有收货地址
    if(!address.userName){
      return showToast('请添加收货地址')
    }
    if(totalNum === 0){
      return showToast('请添加商品')
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }

})