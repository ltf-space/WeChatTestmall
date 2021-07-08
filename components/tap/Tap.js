// components/tap/Tap.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tap:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e){
      const {index} = e.currentTarget.dataset
      // 向父组件传递handleTapItem事件
      this.triggerEvent('handleTapItem',{index})
    }
  }
})
