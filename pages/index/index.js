import { request } from "../../request/index.js"
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
  getSwiperList(){// 存放轮播图数据
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
    .then(res => {
      // console.log(res)
      if(res.data.meta.status !== 200)return
        this.setData({
          swiperList:res.data.message
        })
    })
  },
  getCateGory(){// 存放轮播图下方分类数据
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    .then(res => {
      // console.log(res)
      if(res.data.meta.status !== 200)return
        this.setData({
          cateGory:res.data.message
        })
    })
  },
  getFloorList(){// 存放楼层数据
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"})
    .then(res => {
      // console.log(res)
      if(res.data.meta.status !== 200)return
        this.setData({
          floorList:res.data.message
        })
    })
  }
})
