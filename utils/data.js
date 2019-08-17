const arrayUtil = require('./arrayUtil.js');
import { Role } from '/entify/Role';
import { Account } from '/entify/Account';
import { AppModule } from '/entify/AppModule';
import { Group } from '/entify/Group';
import { Notification } from '/entify/Notification';
import { Work } from '/entify/Work';
import { Article } from '/entify/Article';
import { Topic } from '/entify/Topic';
import { City } from '/entify/City';
import { School } from '/entify/School';

class DataSource {
  constructor() {
    this.appTitle = new String();
    this.accountList = new Array();
    this.teacherAppModule = new Array();
    this.bjList = new Array();
    this.subject = new Array();
    this.roleList = new Array();
    this.parentAppModule = new Array();
    this.notificationList = new Array();
    this.teacherData = new Array();
    this.workList = new Array();
    this.topicList = new Array();
    this.articleList = new Array();
    this.cityList = [];
    this.schoolList = [];

    this.init();
  }

  init() {
    this.appTitle = "和云教育";
    this.accountList.push(new Account("13435200189", "a*123456"));
    let tam = this.teacherAppModule;
    tam.push(new AppModule('作业', '/image/modules/work.png'));
    tam.push(new AppModule('通知', '/image/modules/horn.png'));
    tam.push(new AppModule('班级圈', '/image/modules/class_chicle.png'));
    tam.push(new AppModule('学生表现', '/image/modules/flower.png'));
    tam.push(new AppModule('通讯录', '/image/modules/addressbook.png'));
    tam.push(new AppModule('评价', '/image/modules/evaluation.png'));
    tam.push(new AppModule('资讯', '/image/modules/fire.png'));
    tam.push(new AppModule('名师直播', '/image/modules/teacher_video.png'));
    tam.push(new AppModule('学习', '/image/modules/lean.png'));
    tam.push(new AppModule('课程表', '/image/modules/class_schedule.png'));
    tam.push(new AppModule('更多', '/image/modules/more.png'));
    let bjList = this.bjList;
    for (let i = 1; i < 10; i++) {
      bjList.push(new Group("初三(" + i + ")班", ["陈恩彤", "陈健", "陈荣锦", "陈上波", "陈杞柔"]));
    }
    this.subject = ["语文", "数学", "英语", "政治", "化学", "地理", "历史", "生物", "美术", "音乐", "体育", "德育考核", "劳动技术", "计算机", "物理实验", "化学实验", "生物实验", "综合", "科学"];
    let roleList = this.roleList;
    roleList.push(new Role("13435200189", "林碧英", "老师", "湛江市霞山职业高级中学（市十四中）", null, false));
    roleList.push(new Role("13435200189", "林碧英", "老师", "湛江四中", null, false));
    roleList.push(new Role("13435200189", "黄桢雅", "家长", "湛江四中", "初一(2)班", false));
    roleList.push(new Role("13435200189", "黄桢雅", "家长", "湛江25小", "小六(6)班_2018年毕业", true));
    let pam = this.parentAppModule;
    pam.push(new AppModule('通知', '/image/modules/horn.png', '学校老师通知'));
    pam.push(new AppModule('作业', '/image/modules/work.png', '各种家庭作业'));
    pam.push(new AppModule('班级圈', '/image/modules/class_chicle.png', '班级动态'));
    pam.push(new AppModule('智能安防', '/image/modules/znaf.png', '人脸识别考勤'));
    pam.push(new AppModule('学校健康', '/image/modules/health.png', '掌上健康管家'));
    pam.push(new AppModule('校园卡', '/image/modules/school_card.png', '掌握校园动态'));
    pam.push(new AppModule('名师直播', '/image/modules/teacher_video.png', '名师在你身边'));
    pam.push(new AppModule('更多', '/image/modules/more.png', '更多功能体验'));
    let nList = this.notificationList
    for (let i = 0; i < 20; i++) {
      nList.push(new Notification('陈小宁', '各位老师，你们好，总务处昨天参加完税局会议，关于个人所得税新政：1、实施时间为从2019年1月收入开始', '2018-12-29'))
    }
    let tData = this.teacherData;
    tData.push(new Group("学校管理员", ["中国移动和教育"]));
    tData.push(new Group("班主任", ["蔡光甫", "蔡文静", "蔡霞", "蔡浴婷", "陈爱华", "陈川", "陈凤至", "陈冠英"]));
    tData.push(new Group("后勤", ["蔡光甫", "蔡文静", "蔡霞", "蔡浴婷", "陈爱华", "陈川", "陈凤至", "陈冠英"]));
    tData.push(new Group("行政领导", ["蔡光甫", "蔡文静", "蔡霞", "蔡浴婷", "陈爱华", "陈川", "陈凤至", "陈冠英"]));
    tData.push(new Group("校长", ["蔡光甫", "蔡文静", "蔡霞", "蔡浴婷", "陈爱华", "陈川", "陈凤至", "陈冠英"]));
    tData.push(new Group("组级长", ["蔡光甫", "蔡文静", "蔡霞", "蔡浴婷", "陈爱华", "陈川", "陈凤至", "陈冠英"]));
    let workList = this.workList;
    for (let i = 0; i < 20; i++) {
      workList.push(new Work("高一(1)班", "语文", "初一（2）、（4）班语文周末作业：完成《书写练字本》，复习生字词；完成卷子《单元达标测试卷4》。请各位家长监督孩子完成，为期末考试做好充分准备，期末考试时间：语文1月14日。",null, "13435200189", "无要求", "潘老师", "2018-12-21", 0));
      workList.push(new Work("高二(9)班", "数学", "第15周语文周末作业：阅读以下童话故事（挑选4篇以上），下周一分享主题：说说这个故事哪里很夸张。《皇帝的新装》、《不动脑筋的故事》、《拇指姑娘》、《丑小鸭》、《海的女儿》、《灰姑娘》、《巨人的花园》、《父与子》。", null, "13435200189", "无要求", "莫老师", "2018-12-14", 1));
    }
    let tl = this.topicList;
    tl.push(new Topic("征文专栏",'/image/attention_column_default_bg.png', null, null, true));
    tl.push(new Topic("家长课堂", '/image/attention_column_default_bg.png', null, null, true));
    tl.push(new Topic("才艺培养", '/image/attention_column_default_bg.png', null, null, true));
    tl.push(new Topic("健康宝典", '/image/attention_column_default_bg.png', '561265', '推荐订阅', false));
    tl.push(new Topic("成长新净界", '/image/attention_column_default_bg.png', '546487', '推荐订阅', false));
    tl.push(new Topic("名师直播", '/image/attention_column_default_bg.png', '89039', '推荐订阅', false));
    tl.push(new Topic("教育政策", '/image/attention_column_default_bg.png', '384108', '推荐订阅', false));
    tl.push(new Topic("学校健康", '/image/attention_column_default_bg.png', '305334', '推荐订阅', false));
    tl.push(new Topic("我爱诗词", '/image/attention_column_default_bg.png', '294408', '推荐订阅', false));
    tl.push(new Topic("希望之星英语风采大赛", '/image/attention_column_default_bg.png', '322', '推荐订阅', false));
    tl.push(new Topic("择园经验", '/image/attention_column_default_bg.png', '4702', '幼儿园', false));
    tl.push(new Topic("育儿教育", '/image/attention_column_default_bg.png', '10933', '幼儿园', false));
    tl.push(new Topic("幼升小", '/image/attention_column_default_bg.png', '7177', '幼儿园', false));
    tl.push(new Topic("学科辅导", '/image/attention_column_default_bg.png', '47858', '小学', false));
    tl.push(new Topic("家庭教育", '/image/attention_column_default_bg.png', '37226', '小学', false));
    tl.push(new Topic("小升初", '/image/attention_column_default_bg.png', '18229', '小学', false));
    tl.push(new Topic("中考复习", '/image/attention_column_default_bg.png', '11561', '初中', false));
    tl.push(new Topic("报考动态", '/image/attention_column_default_bg.png', '8112', '初中', false));
    tl.push(new Topic("高考复习", '/image/attention_column_default_bg.png', '5112', '高中', false));
    tl.push(new Topic("专业选择", '/image/attention_column_default_bg.png', '4319', '高中', false));
    tl.push(new Topic("艺术生", '/image/attention_column_default_bg.png', '2559', '高中', false));
    let al = this.articleList;
    for (let i = 0; i < 20; i++) {
      al.push(new Article("中秋，和孩子一起来猜猜！", "中秋节，最美的中秋诗词和灯谜送给你~~", "我爱诗词", "2018-09-21", "/image/article/156078.jpg", "54282"));
      al.push(new Article("中秋节的来历和习俗", "你知几多？", "征文专栏", "2018-09-1" + i % 10, "/image/article/610040629371616.jpg", "31950"));
      al.push(new Article("2018,过一个不一样的中秋", "中秋灯笼高高挂！你的节目灯笼做好了吗？", "征文专栏", "2018-09-1" + i % 10, "/image/article/15332852552102170.jpg", "35713"));
      al.push(new Article("新学期，先抓习惯，再谈成绩", "家长必读！", "家庭教育", "2018-09-2" + i % 10, "/image/article/15332852563885252.jpg", "65490"));
    }
    let tempCityList = ["广州", "东莞", "佛山", "河源", "惠州", "江门", "揭阳", "茂名", "梅州", "清远", "汕尾", "汕头", "韶关", "深圳", "珠海", "湛江", "肇庆", "阳江", "中山", "云浮", "潮州"]
    let disList = ["白云", "北区", "从化", "东区", "番禺", "花都", "黄埔", "南沙", "天河", "西区", "越秀", "增城"];
    tempCityList.forEach(item => {
      this.cityList.push(new City(item, disList));
    })
    let schList = ["白云中学", "白云新科小学", "白云龙湖小学", "白云龙岗小学", "白云营溪小学", "白云滘心小学", "白云同和小学", "白云永溪小学", "白云龙江小学", "白云沙凤小学", "白云松溪小学", "白云头陂小学", "白云新都小学", "白云握山小学"];
    disList.forEach(dis => {
      schList.forEach(item => {
        this.schoolList.push(new School(item, dis, ["高一(1)班", "高一(2)班", "高一(3)班", "高一(4)班", "高一(5)班", "高一(6)班", "高一(7)班", "高一(8)班", "高一(9)班"]));
      })
    })
  }

  getAppTitle() {
    return this.appTitle;
  }

  getAccountList() {
    return this.accountList;
  }

  addAccount(accountNumber, password) {
    let account = new Account(accountNumber, password);
    this.accountList.push(account);
  }

  getTeacherAppModule() {
    return this.teacherAppModule;
  }

  getBjList() {
    return this.bjList;
  }

  getSubject() {
    return this.subject;
  }

  getRoleList(accountNumber) {
    let array = new Array();
    this.roleList.forEach(item => {
      if (item.getAccountNumber() == accountNumber)
        array.push(item);
    })
    return array;
  }

  addRole(accountNumber, name, career, school, bj, graduation) {
    let role = new Role(accountNumber, name, career, school, bj, graduation);
    this.roleList.push(role);
  }

  updataRole(accountNumber, name, school, bj, graduation, gender) {
    let roleList = this.getRoleList(accountNumber);
    if (roleList.length == 1) {
      let role = roleList[0];
      role.setName(name);
      role.setGender(gender);
      role.setSchool(school);
      role.setBj(bj);
      role.setGraduation(graduation);
    }
  }

  getRoleTeacherList(accountNumber) {
    let roleList = this.getRoleList(accountNumber);
    let rtl = [];
    roleList.forEach(item => {
      if (item.getCareer() == "老师") { //获取职业是老师的角色
        let hasSign = false;
        rtl.forEach(sign => { //排除重复名字
          if (sign.getName() == item.getName())
            hasSign = true;
        })
        if (!hasSign) {
          rtl.push(item);
        }
      }
    })
    return rtl;
  }

  getNoGraduationRoleList(accountNumber) {
    let array = new Array();
    this.getRoleList(accountNumber).forEach(item => {
      if (!item.getGraduation())
        array.push(item);
    })
    return array;
  }

  getGraduationRoleList(accountNumber) {
    let array = new Array();
    this.getRoleList(accountNumber).forEach(item => {
      if (item.getGraduation())
        array.push(item);
    })
    return array;
  }

  getParentAppModule() {
    return this.parentAppModule;
  }

  getNotificationList() {
    return this.notificationList;
  }

  getTeacherData() {
    return this.teacherData;
  }

  /**
   * 账户密码信息验证
   */
  hasAccount(accountNumber, password) {
    let has = false;
    this.accountList.forEach(item => {
      if (accountNumber == item.accountNumber &&
        password == item.password)
        has = true;
    })
    return has;
  }

  /**
   * 查询是否有这个账户
   */
  hasAccount(accountNumber) {
    let has = false;
    this.accountList.forEach(item => {
      if (accountNumber == item.accountNumber)
        has = true;
    })
    return has;
  }

  getWorkList(index, size) {
    return arrayUtil.pagination(index, size, this.workList);
  }

  getHasSubscription() {
    let array = [];
    this.topicList.forEach(item => {
      if (item.getHasSubscription()) {
        array.push(item);
      }
    })
    return array;
  }

  getTopicList(index, size, classification) {
    let array = [];
    this.topicList.forEach(item => {
      if (item.classification == classification) {
        array.push(item);
      }
    })
    if (!size) {
      return array;
    }
    return arrayUtil.pagination(index, size, array);
  }

  addSubscription(classification, objIndex, value) {
    let array = this.getTopicList(null, null, classification);
    let subscription = array[objIndex];
    subscription.setHasSubscription(value);
  }

  getClassification() {
    let array = [];
    this.topicList.forEach(item => {
      let has = false;
      array.forEach(obj => {
        if (obj == item.classification) {
          has = true;
        }
      })
      if (!has && item.classification) {
        array.push(item.classification);
      }
    })
    return array;
  }

  getArticleList(index, size) {
    return arrayUtil.pagination(index, size, this.articleList);
  }

  getCityList() {
    return JSON.stringify(this.cityList);
  }

  getSchoolList() {
    return JSON.stringify(this.schoolList);
  }

  addWork(work) {
    this.workList.push(work);
  }
}

let data = new DataSource();
export { data }