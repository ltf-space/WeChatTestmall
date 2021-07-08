import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    // 横向导航
    tap:[
      {
        id:'0',
        value:'综合',
        isActive:true
      },
      {
        id:'1',
        value:'销量',
        isActive:false
      },
      {
        id:'2',
        value:'价格',
        isActive:false
      }
    ],
    // 存储商品数据
    goods_list:[]
  },
  // 请求参数数据
  DataParams:{
    // 关键字
    query:'',
    // 分类id
    cid:'',
    // 页码
    pagenum:1,
    // 页容量
    pagesize:10
  },
  // 存储总页面数
  totalPages:1,

  onLoad: function (options) {
    const {cat_id} = options
    this.DataParams.cid = cat_id
    // console.log(this.DataParams.cid)
    this.getGoodsList()
  },
  async getGoodsList(){//请求商品数据
    const res = await request({
      url:'/goods/search',
      data:this.DataParams
    })
    if(res.data.meta.status !== 200)return
    console.log(res)
    const goods_list = res.data.message.goods
    const total = res.data.message.total
    // 获取总页面数 Math.ceil 向上取整
    this.totalPages = Math.ceil( total/this.DataParams.pagesize)
    // console.log(this.totalPages)
    this.setData({
      // 将两个参数拼接到数组中
      goods_list:[...this.data.goods_list,...res.data.message.goods]
    })

    // 数据请求成功后，关闭刷新
    wx.stopPullDownRefresh()
  },
  handleTapItem(e){//点击横向导航触发
    // console.log(e)
    const {index} = e.detail
    let {tap} = this.data
    tap.forEach((v,i) => i === index?v.isActive=true:v.isActive=false);
    this.setData({
      tap
    })
    // console.log(index)
  },
  onReachBottom(){//页面滑倒底部触发
    console.log('已到底')
    // 如果当前页码大于总页面数，说明是最后一页
    if(this.DataParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '已经最后一页啦',
        duration: 1500,
        mask: false
      });
    }else{
      this.DataParams.pagenum++ 
      this.getGoodsList()
    }
  },

  onPullDownRefresh () {// 监控下拉刷新
    console.log('下拉刷新')
    this.setData({
      goods_list:[]
    })
    this.DataParams.pagenum = 1
    this.getGoodsList()
  }
})