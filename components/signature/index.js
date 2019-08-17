Component({
  /**
   * 组件的属性列表
   */
  properties: {
    signatureList: {
      type: Array,
      value: []
    },
    showSign: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 选中落款选项
     */
    seleted(e) {
      let seleted = Number(e.currentTarget.dataset.text);
      if (seleted != Number(this.data.selected)) {
        this.triggerEvent("onChanSele", this.data.signatureList[seleted]);
      }
      this.setData({
        selected: seleted
      })
    },

    /**
     * 隐藏组件
     */
    hideComponent(e) {
      if (e.target.dataset.target == "self")
        this.triggerEvent("onHideSign");
    }
  }
})
