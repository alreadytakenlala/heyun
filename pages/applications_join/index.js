Page({

  /**
   * 页面的初始数据
   */
  data: {
    district: '',
    bj: '',
    errorPrompt: ''
  },

  /**
   * 跳转选择城市页面
   */
  onSelectCity() {
    wx.navigateTo({
      url: "/pages/choose_city_bj/index?listType=" + 0
    })
  },

  /**
   * 跳转选择班级页面
   */
  onSelectBj() {
    let city = this.data.district.split(' ')[0];
    if (city) {
      wx.navigateTo({
        url: "/pages/choose_city_bj/index?listType=" + 2 + "&district=" + city
      })
    } else {
      this.setData({
        errorPrompt: "请先选择市区"
      })
    }
  },

  /**
   * 跳转我的班级页面
   */
  onApplicationsJoinClass() {
    let array = this.data.bj.split(' ');
    wx.navigateTo({
      url: "/pages/my_class/index?school=" + array[0] + "&bj=" + array[1]
    })
  }
})