const { createClient } = require('@insforge/sdk');

// 从环境变量中读取配置
const BASE_URL = 'https://zd8jv2d5.us-east.insforge.app';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyMTUxNjd9.LN34lgoWtVnVNZDihwuy-FO7htj7xS1n8DZM2GawbKM';

const client = createClient({
  baseUrl: BASE_URL,
  anonKey: ANON_KEY,
});

const { database } = client;

// 非欧洲大学数据
const universitiesData = [
  // 南美洲
  {
    id: 'uadilfo-ibanez',
    region_id: 'south-america',
    name: 'Universidad Adolfo Ibáñez (UAI) - 阿道弗·伊瓦涅斯大学',
    location: 'Santiago, Chile',
    latitude: -33.4378,
    longitude: -70.6504,
    semester: '秋季学期（南半球春季）',
    favorite: '5块钱一斤的车厘子，当地人对华人比较感兴趣且友好',
    complaint: '南美洲实在太远了，在飞机上要花接近2天；智利学签申请流程非常长',
    recommended_course: '无特别推荐',
    special_thanks: '黄咏佩、刘凡',
    visa: '学生签证申请流程很长，大约要半年左右，包含资料提交和面签；比较推荐直接用B1/B2的美签，可以免签入境智利90天',
    preparation: '建议带常备药品',
    flight: '可以从美国转机',
    course_info: '如果是从免签国籍或美签入境，学期间可以出去两次周围的国家（像阿根廷、玻利维亚等），每次入境都能待90天',
    course_assessment: '无',
    credit_transfer: '无',
    learning_experience: '智利华人留学生非常少，因此会享受特别待遇，大家会对华人比较感兴趣且友好',
    items_needed: '常备药品',
    other_procedures: '智利在南半球，秋季的时候可以享受春夏的天气',
    accommodation: '建议找Las Condes的房子，是最安全的区域',
    accommodation_life: '以圣母山为分界线，面对着的是相对欠发达区域，背面是比较老钱风的Priovedencia和Las Condense',
    dining: '智利的旅游资源非常丰富，北边的阿塔卡马沙漠，中部的pucon，南部的蒙特港还有百内',
    bank: '当地官方语言为西语，英语普及率不高，但学校上课用英语完全ok',
    insurance: '无',
    others: '物价几乎是南美洲最高水平，换算成人民币吃饭大约100/顿，在比较安全的区域租房也会比北京上海略贵一些',
    clubs: '南美洲现在是很多中国企业出海的新战场',
    transportation: '有美签的话，去阿根廷、秘鲁、哥伦比亚都是免签的；玻利维亚也可以落地签',
    travel: '智利的旅游资源非常丰富，北边的阿塔卡马沙漠，中部的pucon，南部的蒙特港还有百内',
    entertainment: '如果你以后考虑创业，智利是很值得去的一个地方'
  },
  // 北美洲
  {
    id: 'ivey-western',
    region_id: 'north-america',
    name: 'Ivey Business School - 西安大略大学毅伟商学院',
    location: 'London, Canada',
    latitude: 42.9842,
    longitude: -81.2453,
    semester: '2024秋季：8.25开始一周Block Seminar，期间有组织去多伦多参观和小长假，学期从9.9-11.25那周',
    favorite: '虽然要contribution但整体课业压力不大，一周5天可以旅游，同学和老师的互动交流氛围很好，遇到的很多加拿大人都很热情',
    complaint: '小伦敦有点无聊+公交系统班次太不频繁了，出去玩一般得先坐三小时Bus到多伦多机场，比较折腾',
    recommended_course: 'Economy and Society（英国教授厉害且讲的很生动），Data Driven Management（教Excel最优化和概率/蒙特卡洛模拟），International Entrepreneurship，Macro Economic for Managers',
    special_thanks: '冯舟、陈思诺、唐郭梦',
    visa: '旅游签或学签均可，旅游签更快更方便185CAD，但在加拿大不能兼职（如送外卖）/实习，学签有被拒绝或很慢的风险',
    preparation: '转换插头，多带点夏秋衣服肯定用得上，加拿大完全没有想象中的冷',
    flight: '机票转机+1个23kg托运行李和手提单程约5k+元，可以提前两个月不同平台和方案比价看看',
    course_info: '秋季是1门必修+3门选修，老师们都挺厉害的，这里主要是IB/DM/BA三个msc项目，Ivey非常重视案例教学和课堂发言，每次上课都要带名牌',
    course_assessment: '大部分课没有考试，但一般contribution占比30-40%+，自己可以在选课时看下syllabus。Hardskill的课会有Midterm或Final，其他以Case为主的课一般是个人作业1-2个+1-2个小组作业',
    credit_transfer: '每门课7.5ECTs，除了必修外再选3门选修即可满足最低要求',
    learning_experience: '感觉体验比清华好，这里上课更沉浸，大部分课堂禁止用电子设备，同学也更投入在课堂贡献上，每节课按个人所需发言，Ivey视出勤但不参与课堂近似为absent，有时老师会cold call',
    items_needed: '转换插头，夏秋衣服',
    other_procedures: 'Ivey一般会在BlockSeminar的1-2个月之前开始安排选课、申请学校宿舍等事项',
    accommodation: '学校会提供住宿，整个学期一共5,000-6,000加币，有单独的卧室，和另外几个同学共用卫生间，有厨房，离Ivey有的近有的稍远',
    accommodation_life: '校外自己租房则性价比更高，推荐提前2-3个月开始了解信息，找到靠谱短租需要花时间',
    dining: 'Ivey的食堂略贵，一顿简餐三明治wrap up等12+CAD，学院内有星巴克。自己做饭就不推荐买meal plan，比meal plan划算很多',
    bank: '主要使用父母国内银行visa信用卡副卡，但过来后趁着开学前学生优惠办了RBC的debit card',
    insurance: '学费+国际生保险必须交，969CAD',
    others: '看到的价格一般是税前，Ontario税率13%，强烈推荐去班夫旅游的时候去Calgary购物天堂shopping！！5%的税很适合买加拿大鹅、始祖鸟、lulu等品牌',
    clubs: 'CEMS CLUB有挺多活动（pub crawl 2次可以看个人喜好体验下北美club和欧洲同学对club的热情；potluck；houseparty；桌游等）',
    transportation: '没有地铁，北美没车出行真的很不方便！！日常主要靠公交，一趟2-3加币，推荐blockseminar期间跟着在学校办一张BusPass，一个学期167加币无限坐',
    travel: '多伦多（尼亚加拉瀑布离得较近）、蒙特利尔&魁北克&渥太华一条线、温哥华&Victoria、Banff&Jasper自驾游五天（加拿大小新疆川西）',
    entertainment: '还可以去美国、南美等，没有美签可以去墨西哥和坎昆全包酒店度假！！黑五可以去outlet采购，力度很大'
  },
  {
    id: 'cornell-johnson',
    region_id: 'north-america',
    name: 'Cornell University-SC Johnson College of Business - 康奈尔大学约翰逊商学院',
    location: 'Ithaca, New York, USA',
    latitude: 42.4543,
    longitude: -76.4735,
    semester: '2023Fall。秋季学期：8月中旬至12月底（若无笔试12月初课程结束可溜）',
    favorite: '很安静，非常适合学习，校园绝美，边上都是National Park/瀑布，配合Campus历史感古建筑，强烈推荐秋季，红叶/黄叶胜地，秋天的伊萨卡简直是金色的梦境！',
    complaint: '位置比较偏，平时上课比较忙，活动比较多感觉还好，小城也算都有自给自足。但放假如果想出去玩的话，到大城市基本都是3个小时车程',
    recommended_course: 'Power&Politics in Organization，Negotiation Essentials，Foundations of Financial Modeling',
    special_thanks: '林霄阳、章雨祺',
    visa: '美签可官网预约，建议尽早做准备，需要的时间比较长。学生签相比旅游签通过概率会更高，且速度会快一些',
    preparation: '美国的东西都贵且不咋好看，大多都是中国制造。建议行李额度一定要用足！能多带从中国带任何东西过来都是划算的，过来价格至少翻三倍。特别是：冬季保暖的衣物（十一二月好冷）以及平时会用的、不好买的小物品（如隐形眼镜、美瞳）',
    flight: '越早越定价格越便宜，现在中美航线放开后，价格基本腰斩，非常划算。时间充裕可以考虑中途转机的航班价格更便宜，行李直挂且转机地不需要过境签的话，可以在转机地出机场玩一天',
    course_info: '课程类型很多可选，许多MBA的课质量很高（毕竟他们付的学费很贵），有超多的体育课',
    course_assessment: '大多课程都是报告大作业，基本没有选到有考试的。没有考试12月初就可以溜了很不错。基本不点名，不喜欢可以不去',
    credit_transfer: '12-15Cornell学分，一整学期的课2-3 Cornell学分，半学期的课1.5 学分',
    learning_experience: '好课真的很多，利用第一周退课、中期退课等时间，广泛试课选自己喜欢的吧。课后不太需要，但如果想好肯定都还是要看课前案例和课后复习',
    items_needed: '冬季保暖衣物、隐形眼镜、美瞳',
    other_procedures: '建议随身携带重要证件以及证明文件，以防不时之需。另外一定准备一张信用卡，学校很多地方已经不收现金了',
    accommodation: '学校不提供住宿，尽量在拿到录取通知书之后，马上在Facebook或者是Cornell华人学生会的小程序上开始找房子！地理位置很重要，强烈建议Collegetown',
    accommodation_life: 'Collegetown的附近餐厅很多，On-campus 的Cafe基本10刀左右一顿，各种三明治/自选白人饭为主',
    dining: '自己做饭的话生活品质大大提升！沃尔玛10刀可以买5块牛排，炫一周',
    bank: '到当地之后可以在Chase银行办银行卡，有护照就可以办。但只能办debit卡，不能办credit卡',
    insurance: '电话及流量建议可以找几个同学一起办一个family plan，比个人办便宜很多',
    others: '可以办一个沃尔玛+，每个邮箱可以免费使用一个月，可以直接从沃尔玛订东西送货到门口，不然去周边便利店很贵、去沃尔玛很远',
    clubs: '学校每周会给邮箱发一周活动汇总的邮件，非常重要！感兴趣的活动都可以直接去，五花八门各类都有。在club fest的时候，建议多加几个感兴趣的社团',
    transportation: '学校比较hilly多上下坡，秋季前几个月天气好的时候可以考虑买一辆电助力的自行车，穿梭校园会非常惬意。或可搭公交不用钱，靠中心位置大约15min一班，但准点率堪忧',
    travel: '10月秋假，11月底感恩节假是两个五天长假。想出行可提早规划。交通可以选择和同学一起拼车或者是坐bus、飞机，伊萨卡直飞价格稍高',
    entertainment: '参加Outing Club去划皮划艇、去徒步！多利用好学校资源，参加感受各类感兴趣的活动。体育赛事很多，从橄榄球到冰球到马球'
  },
  // 亚洲
  {
    id: 'keio-university',
    region_id: 'asia',
    name: 'Keio University 日本庆应义塾大学',
    location: 'Tokyo/Yokohama, Japan',
    latitude: 35.6494,
    longitude: 139.5418,
    semester: '7、8月开放预定宿舍、选课，9月上旬开始Block Seminar, Skill Seminars和部分Keio Business School的课',
    favorite: 'i人、j人天堂，日本社会整体效率很高很准时；ACGN爱好者的购物天堂，美景多，适合旅游和圣地巡礼，生活方便，居民非常有礼貌',
    complaint: '蔬菜水果贵，与日本同学交流的机会较少，电子化程度较低，习惯使用信件/纸币/票据',
    recommended_course: 'Otaku Culture（御宅族文化），Decision Making，Brand Communication，Production Management in Japan',
    special_thanks: '黄平、黄张敏、吴泓毅',
    visa: '需要等~6月份，先由KEIO代办COE，收到邮件以后才可以申签证，流程比较简单，时间大概10天以内',
    preparation: '转换插头，电饭煲，洗漱用品小样(旅游时方便携带)，临时用电话卡',
    flight: '选择机票时注意托运的额度，可以选择托运两件大件行李+一件随身行李的机票。记得买到羽田Haneda，成田机场很远',
    course_info: '全英教学，有日语课提供，课上国际生比例较高。日吉（横滨）校区：KBS（商学院），KMD（媒体营销）。三田（东京）校区：KEC（经济）',
    course_assessment: '大多数是报告或者presentation结课，少有闭卷考试。有些课对于出勤有要求，部分课程支持zoom线上参与并且有回放，相对灵活自由',
    credit_transfer: '选课前需要把课程大纲发给学术主任确认可否转换',
    learning_experience: '如果不会日语完全没关系，但强烈建议大家提前学一下！在日本的体验会好很多。教授们的英语都挺好的，顺畅听课无压力',
    items_needed: '转换插头，电饭煲，洗漱用品小样，临时用电话卡',
    other_procedures: '到日本以后要尽快办：区役所更新在留卡（需要有你的住址在居留卡上才算完成）、加入健康险、电话卡、银行卡',
    accommodation: '宿舍7-8万日元/月，包水电，基本拎包入住。床单枕头被褥等会提供基本的，不够可以去Nitori买',
    accommodation_life: '外食也很方便，但唯一的问题就是蔬菜水果贵',
    dining: '食堂一顿2.95欧，是自助；但非常不好吃。有的宿舍1楼有食堂，但注重环的话环境推荐TsunashimaSST',
    bank: '日本银行卡真的挺麻烦的（我没办也没有什么影响）',
    insurance: '宿舍hoas会建议买保险，但蛮贵的，我是没买',
    others: 'JASSO需要日本银行卡',
    clubs: '这边CEMS Club很小，一般只有10-20个人，而且几乎没有日本学生',
    transportation: '基本靠走路、电车，在小城市会坐巴士，日本打车太贵',
    travel: '东京周边有很多1-2天旅游的目的地，远的可以去关西、北海道、金泽、白马&上高地等',
    entertainment: '日区留子在小红书很活跃，可以多认识一些朋友'
  },
  {
    id: 'korea-university',
    region_id: 'asia',
    name: 'Korea University Business School (KUBS) - 高丽大学商学院',
    location: 'Seoul, South Korea',
    latitude: 37.5902,
    longitude: 127.0289,
    semester: '秋季：8月底-12月底，两个小学期中间有一周假期',
    favorite: 'K-Pop & 随处可见的咖啡厅',
    complaint: '学校地理位置有点偏，但还能接受；韩语不太好只说英语的话，生活略有不便',
    recommended_course: 'Global CEO Talk, Machine Learning Business Applications with Python I',
    special_thanks: '高义婷、刘文齐',
    visa: '高丽大是优秀认证大学，有很多材料都能免，按大使馆官网文件准备即可',
    preparation: '必需品都可以在大创和homeplus买，带一些药品和衣物即可',
    flight: '北京飞航班很多，有很多可以预订留学生机票免费两个行李额',
    course_info: '四个月分为两个小学期，每个小学期提供选择的有5门上下，注意skill seminar是mandatory的',
    course_assessment: '多以pre+考试形式进行。内容非常简单，都是入门级别',
    credit_transfer: '我是秋季学期来交换的，用了global ceo talk 转换学分',
    learning_experience: '难度：除了CEMS必修，都是和高丽的Global MBA学生一起上课，属于入门级别。课业量：作业不多',
    items_needed: '药品，衣物',
    other_procedures: '签证下来了就可以在HiKorea上申请登陆证，高丽大所在办事处如果避开高峰期一周就能拿到',
    accommodation: '我抢到了宿舍，是双人间在anam international，房间整体比较新，住宿费不到3000一个月',
    accommodation_life: '学校附近也很多中餐等，外卖点起来也很方便，圣水、弘大、汉南有一些漂亮饭也可以尝试',
    dining: '学生食堂都是自助式，但我吃不太惯',
    bank: '我没有办银行卡，因为学校附近银行不允许交换生办',
    insurance: '保险zfb随便买了一个',
    others: '韩娱人的天堂，超多con和各种周边',
    clubs: '我没有参加太多活动',
    transportation: '如果经常坐地铁公交，办一张气候卡很划算',
    travel: '节假日去釜山、济州岛也很方便，消费不高景色很美，离日本也很近机票很便宜',
    entertainment: '会基础的韩语，能认识某些单词对生活和交流有很大帮助'
  },
  {
    id: 'nus-singapore',
    region_id: 'asia',
    name: 'National University of Singapore(NUS) - 新加坡国立大学',
    location: 'Singapore',
    latitude: 1.2966,
    longitude: 103.7764,
    semester: '秋季学期：7.29-11月中旬；春季学期：1月初-4月底。每学期13个教学周',
    favorite: '食堂很多，物美价廉，中餐很好吃；校车很方便；天气很好，在utown享受阳光草坪真的很幸福；去其他东南亚国家旅游很方便',
    complaint: '宿宿舍基本申不上，租房非常非常贵！室内很冷！北方人觉得食物有点过油过甜，但好在有很多其他国家的美食',
    recommended_course: 'Game Theory for Managers, Managerial Economics, Digital Marketing, Asian Business Environment',
    special_thanks: '吴点疑、吴小莉、张佳慧、施鳗珈',
    visa: '收到NUS发的邮件后直接网申，申请完成后，可凭电子签证入境，NUS会组织线下换签',
    preparation: '自备物品推荐：泳衣、凉鞋、隐形眼镜、防蚊产品、蚂蚁药、药品（这边买药贼贵且不全）',
    flight: '去程可以提前15-30天购买，回程机票可以不用着急买',
    course_info: '管理类/金融类居多，可以选二外，有一些特色课程如家族企业管理',
    course_assessment: '几乎所有课程都有小组作业，考核方式不同课程不一样，有随堂quiz、期中/末考试、pre、论文等几种',
    credit_transfer: '与CEMS要求完全一致',
    learning_experience: 'NUS的Block Seminar体验较差，且给分低。几乎所有课程都有课堂参与分，需要多发言',
    items_needed: '泳衣、凉鞋、隐形眼镜、防蚊产品、蚂蚁药、药品',
    other_procedures: '45mm*35mm大小的新加坡签证照片（非必须）',
    accommodation: '校内住宿：经济实惠但是很难申请上。校外住宿：分Condo和组屋两种，前者价格一般在1500新以上',
    accommodation_life: '推荐住在Gràcia、Provença以及火车S1/S2沿线，去市中心or学校都很方便',
    dining: '学校内有多个食堂，品类丰富且水平在线。校外：推荐Frontier, YIH, UTownFlavors/Finefood',
    bank: '非必须，但是办了之后会很方便',
    insurance: '无需另外购置',
    others: '部分商超、餐厅可以用支付宝/微信支付',
    clubs: 'CEMSClub干部会邮件通知竞选',
    transportation: '新加坡公共交通设施非常完善，建议地铁/公交出行',
    travel: '推荐的本地景点：MarinaBay、四个动物园、推荐周边目的地：泰国、马来西亚、印尼、越南',
    entertainment: '国庆节大游行、烟花表演、春节晚宴、烟花表演、Deepavali印度教传统节日'
  },
  {
    id: 'hkust',
    region_id: 'asia',
    name: 'The Hong Kong University of Science and Technology - 香港科技大学',
    location: 'Clear Water Bay, Hong Kong',
    latitude: 22.3365,
    longitude: 114.2657,
    semester: '2025/08/18-12/19',
    favorite: '温暖的气候（整个交换时期基本不用过冬天）；图书馆大墙上面可以写写画画，学风感觉很自由；浓厚的基督教氛围和俱乐部',
    complaint: '坑口去商学院的小巴太难等；无校内住宿且学校地理位置偏远，准备好提前至少一小时从家出发的准备',
    recommended_course: 'Effective Negotiations',
    special_thanks: '丁梦荻、王腾汉、黄烨炯、黄匀龄',
    visa: '4-5月通过网申+邮递的方式向港科办公室提交材料',
    preparation: '不用带太多东西，香港当地购物方便',
    flight: '北京直飞香港，可以提前定好携程接机',
    course_info: '跟经管MiM课程的授课形式类似，每门课程只有半学期',
    course_assessment: '大部分管理类课程为课堂表现+小组Pre+个人报告。每节课均需刷学生卡记录考勤',
    credit_transfer: '每门课均为5 ECTS',
    learning_experience: '数据库权限很多，有彭博机、CEIC、Statista等。UST的职业发展做得特别好',
    items_needed: '无',
    other_procedures: '/',
    accommodation: '学校不提供宿舍，建议提前2-3个月寻找房源',
    accommodation_life: '校内各类食堂（中餐、西餐、韩餐等），快餐类食堂人均约30-60HKD',
    dining: '校外聚餐通常会选择铜锣湾、湾仔等地',
    bank: '香港银行卡非必须',
    insurance: '学校强制要求统一购买保险',
    others: '最好常备一些现金，有些小店不支持移动支付',
    clubs: '感兴趣的同学可参加CEMSCLUB',
    transportation: '地铁和巴士为最常见的交通工具',
    travel: '坐地铁就能到深圳，坐船或者巴士能去澳门，坐高铁去广州等周边城市',
    entertainment: '户外类：香港有天然地理优势，爬山、出海、皮划艇、徒步等都特别方便'
  },
  // 大洋洲
  {
    id: 'sydney-university',
    region_id: 'oceania',
    name: 'The University of Sydney(USYD) - 悉尼大学',
    location: 'Sydney, Australia',
    latitude: -33.8688,
    longitude: 151.1870,
    semester: '秋季学期：7.22-11.30，有期中假',
    favorite: '生活非常方便，气候宜人，很chill也很diverse',
    complaint: '任务量稍微有点多，学校很大，所以大家只跟来自自己国家的人玩',
    recommended_course: 'Business Tools in Management, Data Visualization, Brand Management',
    special_thanks: '代维镇、谭好佳、吴梓锐、夏千淞、邰小珈、向洪腾',
    visa: '澳洲签证很简单，网申，下签较快',
    preparation: '各种常用药品（记得写申报单）、充电宝、电子配件，本地买巨贵',
    flight: '建议提前买机票(留学生票)，澳洲廉航有捷星和维珍航空',
    course_info: '一般上两门必修、两门选修即可完成ECTS要求。除CEMS和MMGT课程外也提供了较多的悉大商学院课程',
    course_assessment: 'GlobalStrategy任务量为：小组pre，几个quiz和期末笔试。非CEMS课程一般任务数量多，但要求不算特别高',
    credit_transfer: '3ECT = 1清华学分，所有课程均为7.5ECTs',
    learning_experience: '整体而言课程难度不是很大，但任务量相对较多',
    items_needed: '常用药品、充电宝、电子配件',
    other_procedures: '无',
    accommodation: '学生宿舍均价$700-900，有家具，住宿条件还不错。和朋友合租均价$400-600',
    accommodation_life: '悉尼好吃的餐厅很多，点外卖也比较方便，但价格相对比较高',
    dining: '自己做饭会便宜很多，悉尼亚超也都能买到火锅底料等等中国的食材和调料',
    bank: '非必须，但是办了之后会很方便',
    insurance: '可以自己购买也可以按照学校官网提供的链接购买',
    others: '健身房收费模式为入会费+钥匙费+按周计费',
    clubs: 'CEMS活动很多，包括徒步、游艇party、gala、movie nights、cooking events',
    transportation: '悉尼公共交通非常方便，可以网上申请OpalConcession学生公交卡',
    travel: '悉尼附近：bondi beach、kiama、蓝山、歌剧院。境内旅游：墨尔本、圣灵群岛、黄金海岸、珀斯、塔州、布里斯班、堪培拉、乌鲁鲁',
    entertainment: '境外旅游：推荐去新西兰（推荐自驾）和斐济，非常漂亮'
  },
  // 非洲
  {
    id: 'uct-gsb',
    region_id: 'africa',
    name: 'University of Cape Town Graduate School of Business (UCT) - 开普敦大学商学院',
    location: 'Cape Town, South Africa',
    latitude: -33.9555,
    longitude: 18.4063,
    semester: '秋季（南半球春季）：8月底到12月中，实际上11月底结课',
    favorite: 'Cape Town CEMS Club，以及自然与城市的完美结合',
    complaint: '签证（公认最难签证之一，被拒了一次）',
    recommended_course: '除了Topic in Sustainability不推荐，其他都推荐（不要低估非洲第一商学院的师资力量和教学质量）',
    special_thanks: '王子煊',
    visa: '最好Offer一发下来就开始准备，比较坑的一点是需要按护照签发地所属领区递签',
    preparation: '春秋装多备一些，厚卫衣比较实用，冬春之交天气不稳定，有时候还是很冷的。游泳装备，去海滩用',
    flight: '来开普敦只有转机没有直飞，且价格较贵，推荐卡塔尔航空',
    course_info: '比较多元，pre、essay、视频、考试都有，略有压力但是比清华研一上来讲还是轻松多了',
    course_assessment: '比较多元，pre、essay、视频、考试都有',
    credit_transfer: '因为我有两学期交换，所以第一学期没有转也没有研究过',
    learning_experience: '课程质量超乎想象的高，老师背景非常国际化，能够学到通用的知识技能以及非洲独有的商业模式',
    items_needed: '春秋装，厚卫衣，游泳装备，小伴手礼',
    other_procedures: '来这边之后要拿护照和签证做一个公证。保险（签证需要），体检和国际旅行健康证明书（小红本）',
    accommodation: '建议和这边的本校生和交换生一起找，价格折合人民币3000到8000不等。建议住学校附近（Waterfront或者Green Point或者Sea Point）',
    accommodation_life: '作为多元文化的一部分，食物种类也很多元（西餐、开普马来菜、南非烧烤Braai）',
    dining: '去餐厅吃基本上人民币人均100左右，上学会在学校旁边的德勤办公楼的餐厅吃，人均30左右',
    bank: '用的是中行VISA借记卡和信用卡',
    insurance: '医疗保险是办签证必须的，选了Momentum公司的',
    others: '开普敦大家一定很担心安全问题，但俗话说安全都是相对的。学校附近的V&APort，以及GreenPoint和SeaPoint，还有富人区CampsBay白天都不需要担心治安问题',
    clubs: '非常非常非常丰富，所有人都是组织者+参与者，每周都有许多徒步、沙滩、品酒、蹦迪、短途旅行活动',
    transportation: '基本都是Uber，打车价格和北京差不多',
    travel: '开普敦已经足够你玩了，徒步、沙滩、企鹅、好望角、罗本岛、观鲸、看球赛、还有无数酒庄',
    entertainment: '10月的假期还有结课以后大家可能会组织去周边国家玩，但需要你有Multi-entry签证（不好拿）'
  }
];

// 批量插入大学数据
async function uploadUniversities() {
  console.log('开始上传非欧洲大学数据...');
  
  for (const university of universitiesData) {
    try {
      console.log(`正在上传 ${university.name}`);
      
      const { data, error } = await database
        .from('universities')
        .insert(university)
        .select();
        
      if (error) {
        console.error(`上传失败 ${university.name}:`, error.message);
      } else {
        console.log(`✓ 成功上传: ${university.name}`);
      }
    } catch (error) {
      console.error(`处理 ${university.name} 时出错:`, error.message);
    }
  }
  
  console.log('上传完成！');
}

// 主函数
async function main() {
  try {
    await uploadUniversities();
  } catch (error) {
    console.error('执行失败:', error);
    process.exit(1);
  }
}

main();
