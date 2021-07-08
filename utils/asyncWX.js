export const getSetting = () => {//点击后出现是否选择该收获地址
  return new Promise((resolve,reject) => {
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail:(err) => {
        reject(err)
      } 
    });
  })
}
export const chooseAddress = () => {//得到收货地址
  return new Promise((resolve,reject) => {
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail:(err) => {
        reject(err)
      } 
    });
  })
}
export const openSetting = () => {//打开位置权限
  return new Promise((resolve,reject) => {
    wx.openSetting({
      success: (result)=>{
        resolve(result)
      },
      fail:(err) => {
        reject(err)
      } 
    });
  })
}
export const showModal = (content) => {//弹出是否确定删除弹窗
  return new Promise((resolve,reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success:(res) => {
        resolve(res)
      },
      fail:(err) => {
        reject(err)
      }
    })
  })
}
export const showToast = (content) => {//点击结算时显示弹窗
  return new Promise((resolve,reject) => {
    wx.showToast({
      title: content,
      icon: 'none',
      duration: 1500
    });
  })
}
export const login = () => {//点击结算时显示弹窗
  return new Promise((resolve,reject) => {
    wx.login({
      timeout:10000,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        console.log(err)
      }
    });
  })
}