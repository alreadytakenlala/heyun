const checkUtil = require("../../utils/checkUtil.js");
import { data } from '../../utils/data.js';
import { Role } from '../../utils/entify/Role.js';
import { Account } from '../../utils/entify/Account.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorPrompt: '',
    phoneNumber: '',
    verCode: '',
    reallyVerCode: '',
    password: '',
    repeatPw: '',
    alreadySendVer: false,
    showPromptPW: false,
    showSMS: false,
    verPrompt: '获得验证码',
    intervalID: ''
  },

  /**
   * 绑定手机号码
   */
  phoneNumberInput(e) {
    let phoneNumber = e.detail.value;
    if (phoneNumber != undefined)
      this.setData({
        phoneNumber: phoneNumber
      })
  },

  /**
   * 绑定验证码
   */
  verCodeInput(e) {
    let verCode = e.detail.value;
    if (verCode != undefined)
      this.setData({
        verCode: verCode
      })
  },

  /**
   * 绑定密码
   */
  passwordInput(e) {
    let password = e.detail.value;
    if (password != undefined)
      this.setData({
        password: password
      })
  },

  /**
   * 绑定确认密码
   */
  repeatPwInput(e) {
    let repeatPw = e.detail.value;
    if (repeatPw != undefined)
      this.setData({
        repeatPw: repeatPw
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
   * 显示密码提示
   */
  showPromptPW() {
    if (!this.data.showPromptPW) {
      this.setData({
        showPromptPW: true
      })
    }
  },

  /**
   * 注册处理
   */
  registered() {
    let phoneNumber = this.data.phoneNumber;
    let verCode = this.data.verCode;
    let password = this.data.password;
    let repeatPW = this.data.repeatPw;
    if (phoneNumber == '') {
      this.releaseErrorPrompt("手机号码不能为空");
      return;
    }
    if (!checkUtil.isPhoneNumber(phoneNumber)) {
      this.releaseErrorPrompt("手机号码错误，请重新输入!");
      return;
    }
    if (!verCode || verCode != this.data.reallyVerCode) {
      this.releaseErrorPrompt("验证码错误，请确认后再次输入!");
      return;
    }
    if (password == '') {
      this.releaseErrorPrompt("请填写密码!");
      return;
    }
    if (password.length < 8) {
      this.releaseErrorPrompt("密码长度必须大于8位数");
      return;
    }
    if (!checkUtil.isPassword(password)) {
      this.releaseErrorPrompt("密码格式不正确");
      return;
    }
    if (repeatPW == '') {
      this.releaseErrorPrompt("请填写确认密码!");
      return;
    }
    if (repeatPW != password) {
      this.releaseErrorPrompt("确认密码不正确!");
      return;
    }
    data.addAccount(phoneNumber, password);
    data.addRole(phoneNumber, null, "家长");
    wx.setStorage({
      key: 'userInfo',
      data: new Role(phoneNumber, null, '家长', null, null, null)
    })
    wx.setStorage({
      key: 'account',
      data: new Account(phoneNumber, '')
    })
    wx.navigateTo({
      url: "/pages/join_class/index"
    })
  },

  /**
   * 发布错误提示
   */
  releaseErrorPrompt(errorPrompt) {
    this.setData({
      errorPrompt: errorPrompt
    })
  },

  /**
   * 获取产生的验证码
   */
  reallyVerCode(reallyVerCode) {
    this.setData({
      reallyVerCode: reallyVerCode.detail
    })
  }
})