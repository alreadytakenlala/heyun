Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showKeyBoard: 0,
    sendBarBottom: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onFocus(e) {
      console.log(e);
      let keyBoardHeight = e.detail.height;
      let showKeyBoard = false;
      if (keyBoardHeight > 0) {
        showKeyBoard = true;
      }
      this.setData({
        showKeyBoard: showKeyBoard,
        sendBarBottom: keyBoardHeight
      })
    },

    onBlur() {
      this.setData({
        sendBarBottom: 0
      })
    }
  }
})
