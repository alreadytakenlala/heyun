Component({
  /**
   * 组件的属性列表
   */
  properties: {
    topicList: {
      type: Array,
      value: []
    },
    searchValue: {
      type: String,
      vlaue: ''
    },
    articleList: {
      type: Array,
      value: []
    },
    articleIndex: {
      type: Number,
      value: 1
    },
    articleSize: {
      type: Number,
      value: 5
    },
    noData: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedTopic: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSearchInput(e) {
      let value = e.detail.value;
      this.triggerEvent("searchInput", value);
    },

    /**
     * 切换专栏
     */
    onSwitchTopic(e) {
      let index = e.currentTarget.dataset.index;
      this.triggerEvent("switchTopic", index);
      this.setData({
        selectedTopic: index
      })
    },

    /**
     * 跳转添加订阅页面
     */
    onAddSubscription() {
      this.triggerEvent("addSubscription");
    }
  }
})
