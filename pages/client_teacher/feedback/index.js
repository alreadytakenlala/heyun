Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "反馈要求",
    claim: ["无要求", "要求家长对本条作业进行语音回复"],
    selected: 0
  },

  /**
   * 勾选要求
   */
  selected(e) {
    let index = e.currentTarget.dataset.text;
    this.setData({
      selected: index
    })
  },

  /**
   * 缓存数据，返回上一层
   */
  determine() {
    const claim = String(this.data.claim[this.data.selected]);
    wx.getStorage({
      key: 'homeworkData',
      success: function(res) {
        let homewordData = res.data;
        homewordData.chooseClaim = claim;
        wx.setStorage({
          key: 'homeworkData',
          data: homewordData
        })
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   * 加载缓存
   */
  onLoad: function (options) {
    let self = this;
    wx.getStorage({
      key: 'homeworkData',
      success: function (res) {
        let chooseClaim = res.data.chooseClaim;
        self.data.claim.forEach((item, i) => {
          if (chooseClaim == item)
            self.setData({
              selected: i
            })
        })
      },
    })
  }
})