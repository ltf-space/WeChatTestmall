import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放部分商品详情数据
    goodsDetail:{}
  },
  //商品全部信息
  goods_info:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.getDetailList(goods_id)
  },
  async getDetailList(goods_id){//获取商品详情数据
    const res = await request({
      url: '/goods/detail',
      data: {goods_id}
    })
    if(res.data.meta.status !== 200)return
    console.log(res)
    this.goods_info = res.data.message
    this.setData({
      goodsDetail:{
        goods_name:res.data.message.goods_name,
        goods_price:res.data.message.goods_price,
        // goods_introduce里面的图片以.webp结尾，可能在ios端无法正常显示，
        // 通常与后台沟通改为.jpg等普通格式
        // 也可以前台暂时用.jpg替换
        goods_introduce:res.data.message.goods_introduce.replace(/\.webp/,'.jpg'),
        pics:res.data.message.pics
      }
    })
  },
  handleSwiperImage(e){//点击轮播图，预览大图
    console.log(e)
    // 构造需要预览的图片http链接列表数组
    let urls = this.data.goodsDetail.pics.map(v => v.pics_mid)
    let current = e.currentTarget.dataset.url
    console.log(urls,current)
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  handleCartAdd(){//点击加入购物车
    // 拿到缓存的cart,第一次为空
    let cart = wx.getStorageSync('cart') || [];
    // 找到goods_id相同的索引
    let index = cart.findIndex(v => v.goods_id === this.goods_info.goods_id)
    if(index === -1){//没有找到
      this.goods_info.num = 1
      this.goods_info.checked = true
      cart.push(this.goods_info)
    }else{
      cart[index].num++
    }
    // 存入缓存区
    wx.setStorageSync('cart',cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 1500,
      mask: true
    });
  }
})