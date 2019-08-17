Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navModu: [{ "title": "校园", "activeIco": "/image/xiaoyuan_check.png", "defaultIco": "/image/xiaoyuan_default.png" }, 
    { "title": "消息", "activeIco": "/image/msg_check.png", "defaultIco": "/image/msg_default.png" }, 
      { "title": "我", "activeIco": "/image/me_check.png", "defaultIco": "/image/me_default.png" }]
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
     * 切换标题栏模块
     */
    selected(e) {
      let index = e.currentTarget.dataset.text;
      if (index != this.data.selected)
        this.loadNavPage(index);
    },

    /**
     * 导航栏页面路径
     */
    navUrl(index) {
      let url;
      if (index == 0)
        url = "pages/client_teacher/campus/index";
      else if (index == 1)
        url = "pages/client_teacher/message/index"
      else if (index == 2)
        url = "pages/client_teacher/me/index";
      return url;
    },

    /**
     * 如果已经打开页面，则返回到该页面，否则新打开这个页面
     */
    loadNavPage(index) {
      let url = this.navUrl(index);
      let pages = getCurrentPages();
      let isHas = false; //是否已经打开了该页面
      pages.forEach((item, i) => {
        if (item.route == url) { //如果已经打开了页面，就返回到该页面
          isHas = true;
          wx.navigateBack({
            delta: pages.length - i - 1
          })
        }
      })
      if (!isHas) { //如果还没有打开页面
        wx.navigateTo({
          url: '/' + url
        })
      }
    }
  }
})
