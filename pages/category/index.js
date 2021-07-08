import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
    // 左侧菜单数据
    leftMenuList:[],
    // 右侧商品数据
    rightList:[],
    // 默认下标
    currentIndex:0,
    // 竖向滚动条滚动位置
    backTop:0
  },
  // 存放接口请求总数据
  cates:[],
  onLoad: function (options) {
    // 获取存放的数据
    const Cates = wx.getStorageSync('cates')
    if(!Cates){//没有cates缓存数据
      this.getCate()
    }else{//有cates数据
      if((Date.now() - Cates.time)>5000){//大于5s，重新获取数据
        this.getCate()
      }else{
        this.cates = Cates.data
        let leftMenuList = this.cates.map(item => item.cat_name)
        let rightList = this.cates[0].children
        this.setData({
          leftMenuList,
          rightList
        })
        console.log('小于5s')
      }
    }
  },
  async getCate(){//请求分类数据
    const res = await request({url:'/categories'})
    if(res.data.meta.status !== 200)return
    this.cates = res.data.message
    // 存储数据
    wx.setStorageSync('cates', {time:Date.now(),data:this.cates});

    let leftMenuList = this.cates.map(item => item.cat_name)
    let rightList = this.cates[0].children
    // console.log(leftMenuList)
    this.setData({
      leftMenuList,
      rightList
    })
  },
  handleTap(e){//点击左侧菜单获得对应数据
    const { index } = e.currentTarget.dataset
    let rightList = this.cates[index].children
    this.setData({
      currentIndex : index,
      rightList,
      backTop:'0'
    })
  }
})