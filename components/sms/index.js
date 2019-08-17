Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showSMS: {
      type: Boolean,
      value: false,
      observer: 'occurred'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    verCode: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 5秒后，或者点击复制后1秒隐藏短信
     */
    occurred() {
      if (this.data.showSMS == true) {
        let verCode = this.sixDigitRandom();
        this.setData({
          verCode: verCode
        })
        this.triggerEvent("getVerCode", verCode);
        setTimeout(this.shutSMS, 8000, this);
      }
    },

    /**
     * 隐藏错误信息
     */
    shutSMS(self) {
      if (self.data.showSMS == true)
        self.setData({
          showSMS: false
        })
    },

    /**
     * 复制事件处理
     */
    copyEvent() {
      wx.setClipboardData({
        data: this.data.verCode
      })
      setTimeout(this.shutSMS, 1000, this);
    },

    /**
     * 生成6位随机数
     */
    sixDigitRandom() {
      let random = '';
      for (let i = 0; i < 6; i++) {
        random += Math.floor(Math.random() * 10)
      }
      return random;
    }
  }
})
