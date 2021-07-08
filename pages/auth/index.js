import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js"
import { login } from '../../utils/asyncWX.js'
Page({

  data: {
    // 登录参数
    loginParams:{}
  },
  async handleGetUserInfo(e){
    // console.log(e)
    try {
      const {encryptedData,rawData,iv,signature} = e.detail
      const {code} = await login()
      // console.log(code)
      let loginParams = {encryptedData,rawData,iv,signature,code}
      console.log(loginParams)
      this.setData({
        loginParams
      })


      //接口失效 
      // const {token} = await request({
      //   url:"/users/wxlogin",
      //   method:"Post",
      //   data:this.loginParams
      // })
      let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      wx.setStorageSync('token', token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error)
    }
  }
})