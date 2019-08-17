const checkUtil = require("../../utils/checkUtil.js");
import { data } from '../../utils/data.js';
import { Account } from '../../utils/entify/Account.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwordLogo: true,
    accountNumber: '13435200189',
    password: 'a*123456',
    phoneNumber: '',
    verficationCode: '',
    errorPrompt: '',
    rememberPW: false,
    verPrompt: '获得验证码',
    showSMS: false,
    reallyVerCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    wx.getStorage({
      key: 'account',
      success: function(res) {
        let rememberPw = false;
        if (res.data.password != '')
          rememberPw = true
        self.setData({
          accountNumber: res.data.accountNumber,
          password: res.data.password,
          rememberPW: rememberPw
        })
      }
    })
  },

  /**
   * 修改登录方式
   */
  logoMethodChange(e) {
    let logoMethod = e.currentTarget.dataset.text;
    let passwordLogo = false;
    if (logoMethod == "passwordLogo")
      passwordLogo = true;
    this.setData({
      passwordLogo: passwordLogo
    })
  },

  /**
   * 账号绑定
   */
  saveAccountNumber(e) {
    this.setData({
      accountNumber: e.detail.value
    })
  },

  /**
   * 密码绑定
   */
  savePassword(e) {
    this.setData({
      password: e.detail.value
    })
  },

  /**
   * 手机号码绑定
   */
  savePhoneNumber(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },

  /**
   * 验证码绑定
   */
  saveVerifcationCode(e) {
    this.setData({
      verficationCode: e.detail.value
    })
  },
  
  /**
   * 账号密码登录处理
   */
  passwordLogoSumbit(e) {
    let accountNumber = this.data.accountNumber;
    let password = this.data.password;
    let errorPrompt = "";
    let self = this;
    if (accountNumber == '') {
      errorPrompt = "账号不能为空!"
    }
    else if (password == '') {
      errorPrompt = "密码不能为空!";
    }
    else if (data.hasAccount(accountNumber, password)) {
      if (self.data.rememberPW) {
        let account = { "accountNumber": accountNumber, "password": password };
        wx.setStorage({
          key: 'account',
          data: account
        })
      } else {
        wx.setStorage({
          key: 'account',
          data: new Account(accountNumber, '')
        })
      }
      this.logoSuccessSwitchPage(accountNumber);
    }
    else {
      errorPrompt = "请检查号码是否输入有误，或者使用该号码注册新账号!";
    }
    this.setData({
      errorPrompt: errorPrompt,
    })
  },

  /**
   * 处理跳转，如果该账户有多个角色，就跳转切换角色页面
   * 否则，该职业是老师，跳转老师端首页
   * 否则，跳转首页
   */
  logoSuccessSwitchPage(accountNumber) {
    let roleList = data.getRoleList(accountNumber);
    if (roleList.length > 1)
      wx.navigateTo({
        url: '/pages/switch_roles/index'
      })
    else if (roleList[0].getCareer() == "老师")
      wx.reLaunch({
        url: "/pages/client_teacher/campus/index"
      })
    else if (roleList[0].getCareer() == "家长") {
      wx.switchTab({
        url: "/pages/index/index"
      })
    }
  },

  /**
   * 取消提示
   */
  cancel() {
    this.setData({
      errorPrompt: ''
    })
  },

  /**
   * 跳转注册页面
   */
  registered() {
    wx.navigateTo({
      url: '/pages/registered/index'
    })
  },

  /**
   * 记住密码
   */
  rememberPW() {
    let rememberPW = this.data.rememberPW;
    this.setData({
      rememberPW: !rememberPW
    })
  },

  /**
   * 获取验证码
   */
  obtainVerification() {
    let phoneNumber = this.data.phoneNumber;
    let verPrompt = this.data.verPrompt;
    if (verPrompt == "获得验证码" || verPrompt == "重发验证码") {
      if (!checkUtil.isPhoneNumber(phoneNumber))
        this.setData({
          errorPrompt: "请填写正确的手机号"
        })
      else {
        this.setData({ //打开短信组件
          showSMS: true
        })
        this.setData({ //设置秒数
          verPrompt: 60
        })
        let intervalID = setInterval(this.secondDecrement, 1000);
        this.setData({
          intervalID: intervalID
        })
      }
    }
  },

  /**
   * 验证码发送后秒数递减
   */
  secondDecrement() {
    let verPrompt = this.data.verPrompt;
    if (verPrompt > 1) {
      this.setData({
        verPrompt: --verPrompt
      })
    } else {
      clearInterval(this.data.intervalID);
      this.setData({
        verPrompt: '重发验证码'
      })
    }
  },

  /**
   * 获取产生的验证码
   */
  reallyVerCode(reallyVerCode) {
    this.setData({
      reallyVerCode: reallyVerCode.detail
    })
  },

  /**
   * 验证码登录
   */
  verCodeLogo() {
    let accountNumber = this.data.phoneNumber;
    if (data.hasAccount(accountNumber) && 
      this.data.reallyVerCode == this.data.verficationCode) {
      wx.setStorage({
        key: 'account',
        data: new Account(accountNumber , '')
      })
      this.logoSuccessSwitchPage(accountNumber);
    }
  }
})