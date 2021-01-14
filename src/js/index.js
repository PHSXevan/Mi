// swiper轮播
var mySwiper = new Swiper ('.banner .swiper-container', {
    direction: 'horizontal', // 水平切换选项
    loop: true, // 循环模式选项
    autoplay: true,//可选选项，自动滑动
    
    // 如果需要分页器
    pagination :{
        el: '.swiper-pagination',
        clickable :true,
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
})    
// swiper轮播
var mySwiper = new Swiper ('.star .swiper-container', {
    direction: 'horizontal', // 水平切换选项
    autoplay: true,//可选选项，自动滑动
    slidesPerView : 4,
    slidesPerGroup : 4,
    
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
})  

// 倒计时
const hmsCountdown = document.querySelector('.hms-countdown')
setInterval(function () {
  // 2. 获取两个时间节点之间的时间差
  var t1 = new Date(2021, 2, 4, 0, 0, 0)
  var t2 = new Date()
  var res = diffTime(t1, t2)

  let str = `
    <span>${ res.day }</span>
    <i>天</i>
    <span>${ res.hours }</span>
    <i>:</i>
    <span>${ res.minutes }</span>
  `
  hmsCountdown.innerHTML = str

}, 1000)

function diffTime(t1, t2) {
  var diffs = Math.ceil(Math.abs(t1.getTime() - t2.getTime()) / 1000)
  return {
    day: parseInt(diffs / (60 * 60 * 24)),
    hours: parseInt(diffs % (60 * 60 * 24) / (60 * 60)),
    minutes: parseInt(diffs % (60 * 60) / 60)
  }
}

// 侧边工具栏显示与隐藏
$('.home-tool-bar .icon').hover(function () {
  $(this).find('.active').show().siblings().hide().parent().siblings().show()
},function () {
  $(this).find('.active').hide().siblings().show().parent().siblings().hide()
})

// 侧边工具栏--回到顶部
$(window).scroll(() => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

  scrollTop >= 300 ? $('.totop').fadeIn(500) : $('.totop').fadeOut(500)
})

$('.totop').click(() => {
  $('html, body').animate({ scrollTop: 0 }, 1000)
})

// 登录判断
$(function () {
  const nickname = getCookie('nickname')
  if (nickname) {
    $('.info-nav').find('.login-reg').addClass('off').siblings('.welcome').removeClass('off').text(`您好：${ nickname }`)
  } else {
    $('.info-nav').find('.login-reg').removeClass('off').siblings('.welcome').addClass('off')
  }
})

// 选项卡切换
$('.tab-list').on('mouseenter', 'li', function() {
  $(this).addClass('tab-active').siblings('li').removeClass('tab-active');

  // 数据渲染
  let goodsname = $(this).text();
  changeGoods(goodsname);
})

// 选项卡数据渲染
changeGoods('热门')
async function changeGoods(goodsname) {
  // let key = '热门';
  let key = goodsname;
  // 准备数据
  let obj = {
      '热门': '笔记本 显示器',
      '电视影音': '电视 盒子',
      '安防': '健康 儿童',
      '出行': '出行 穿戴',
      '耳机音响': '耳机 音箱',
      '充电器': '电源 配件',
  }
  let data = obj[key];
  const res = await $.get('./sever/common.php', { data }, null, 'json');
  let res1 = res.splice(0, 7);
  let str = ``;
  res1.forEach(item => {
      str += `
      <div>
          <li class="brick-item brick-item-m brick-item-m-2">
              <a href="javascript:;">
                  <div class="figure figure-img">
                      <img src="${item.good_img1}" alt="">
                  </div>
                  <h3 class="title">${item.good_name} </h3>
                  <p class="desc">${item.name}</p>
                  <p class="price">
                      <span class="num">${item.price}</span>元
                      <del><span class="num">3499</span>元</del>
                  </p>
              </a>
          </li>
      </div>
      `
  })
  str += `
  <div>
      <li class="brick-item brick-item-s">
          <a href="">
              <div class="figure figure-img">
                  <img src="./images/test1.png" alt="">
              </div>
              <h3 class="title">米家互联网烟灶套装（天然气）</h3>
              <p class="price">
                  <span class="num">2298</span>元
              </p>
          </a>
      </li>
  </div>
  <li class="brick-item brick-item-s">
      <a href="">
          <div class="figure figure-more">
              <i class="iconfont iconfont-circle-arrow-right"></i>
          </div>
          <div class="more">浏览更多 <small>${key}</small></div>
      </a>
  </li>
  `
  $('.goods').html(str);
}
// 数据渲染
shangoufn()
async function shangoufn() {
    let data = '手机 电话卡';
    const res = await $.get('./sever/common.php', { data }, null, 'json');
    let res1 = res.splice(0, 8);
    let str = ``;
    // 渲染手机
    res1.forEach(item => {
        str += `
        <li class="brick-item brick-item-m brick-item-m-2">
        <a href="">
            <div class="figure figure-img">
                <img src="${item.good_img1}" alt="">
            </div>
            <h3 class="title">${item.good_name}</h3>
            <p class="desc">${item.name}</p>
            <p class="price">
                <span class="num">${item.price}</span>元<span>起</span>
            </p>
        </a>
        </li>
    `
    })
    $('.phone').html(str);

}

