import { request } from "../../request/index.js"
Page({

  data: {
    // 左侧菜单数据
    leftMenuList:[],
    // 右侧商品数据
    rightList:[]
  },
  cates:[],
  onLoad: function (options) {
    this.getCate()
  },
  getCate(){//请求分类数据
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
    }).then(res => {
      console.log(res)
      if(res.data.meta.status !== 200)return
      this.cates = res.data.message
      this.data.leftMenuList = this.cates.map(item => item.cat_name)
      console.log(this.data.leftMenuList)
    })
  }
})