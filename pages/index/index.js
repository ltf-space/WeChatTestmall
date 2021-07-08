import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
// 获取应用实例
const app = getApp()

wx-Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存放轮播图数据
    swiperList:[],
    // 存放轮播图下方分类数据
    cateGory:[],
    // 存放楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求轮播图数据
    this.getSwiperList()
    // 请求轮播图下方分类导航数据
    this.getCateGory()
    // 请求楼层数据
    this.getFloorList()
  },
  async getSwiperList(){// 存放轮播图数据
    const res = await request({url:'/home/swiperdata'})
    if(res.data.meta.status !== 200)return
    this.setData({
      swiperList:res.data.message
    })
  },
  async getCateGory(){// 存放轮播图下方分类数据
    const res = await request({url:"/home/catitems"})
    if(res.data.meta.status !== 200)return
    this.setData({
      cateGory:res.data.message
    })
  },
  async getFloorList(){// 存放楼层数据
    const res = await request({url:"/home/floordata"})
    if(res.data.meta.status !== 200)return
    this.setData({
      floorList:res.data.message
    })
  }
})
