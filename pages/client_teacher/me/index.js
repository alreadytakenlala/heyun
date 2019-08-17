Page({

  /**
   * 页面的初始数据
   */
  data: {
    modules: [{ 'title': '成长值商城', 'icoUrl':'/image/new_cents_icon.png','switchUrl':''},
      { 'title': '业务协办', 'icoUrl': '/image/new_business_icon.png', 'switchUrl': ''},
      { 'title': '活动', 'icoUrl': '/image/menu_activities.png', 'switchUrl': ''},
      { 'title': '切换角色', 'icoUrl': '/image/new_change_role_icon.png', 'switchUrl': '/pages/switch_roles/index' },
      { 'title': '问题反馈', 'icoUrl': '/image/new_online_icon.png', 'switchUrl': '' },
      { 'title': '分享给好友', 'icoUrl': '/image/new_share_icon.png', 'switchUrl': '' },
      { 'title': '教师问卷', 'icoUrl': '/image/new_questionnaire_icon.png', 'switchUrl': '' },
      { 'title': '使用帮助', 'icoUrl': '/image/user_manual_icon.png', 'switchUrl': '' },
      { 'title': '设置', 'icoUrl': '/image/new_icon_setting.png', 'switchUrl': '/pages/setting/index' }],
    selectedNav: 2, //导航栏第三个页面
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let self = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        self.setData({
          userInfo: res.data
        })
      }
    })
    wx.hideLoading();
  },

  /**
   * 处理个个模块的跳转
   */
  selectedModules(e) {
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  }
})