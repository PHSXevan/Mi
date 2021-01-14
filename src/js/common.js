// 微信二维码显示隐藏
$('.wechat').hover(function () {
    $(this).next().slideDown()
},function () {
    $(this).next().slideUp()
})
  
// 购物车盒子显示隐藏
$('.cart-nav').hover(function () {
    $('.info-cart').slideDown()
},function () {
    $('.info-cart').slideUp()
})
  
// 头部导航二级菜单显示隐藏
$('.header-nav .under-nav').hover(function () {
    $(this).find('.item-children').show().parent().siblings().find('.item-children').hide()
},function () {
    $(this).find('.item-children').hide()
})

// 头部导航二级菜单数据渲染
$('.header-nav .layui-nav').on('mouseenter', '.under-nav', async function () {
    let arr = ['手机 电话卡','耳机 音箱','电视 盒子','笔记本 显示器','家电 插线板','健康 儿童','智能 路由器']
    let index = $(this).index()
    let data = arr[index]
    const res = await $.get('./sever/common.php', { data }, null, 'json')
    let res1 = res.splice(0,5)
    let str = ``
    res1.forEach(item => {
        str += `
            <li>
                <div class="figure-thumb">
                    <a href="./views/detail.html">
                        <img src="${ item.good_img1 }" alt="">
                    </a>
                </div>
                <div class="title">${ item.good_name }</div>
                <p class="price">${ item.price }元起</p>
            </li>
          `
      })
    $('.children-list').html(str)
})
  
// 头部导航搜索引擎
const queryList = document.querySelector('.query-list')
const search = document.querySelector('.search')
  
search.addEventListener('input', function () {
    const text = this.value.trim()
    const script = document.createElement('script')
    script.src = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=33423,33401,31253,33286,33343,33413,26350,33370&wd=${ text }&req=2&csor=13&pwd=jiangyunshen&cb=bindHtml&_=1610351823294`
    document.body.appendChild(script)
    script.remove()
})
  
function bindHtml(res) {
    if(!res.g){
        queryList.style.display = 'none'
        return
    }
  
    let str = ``
    res.g.forEach(item => {
        str += `
            <li>${ item.q }</li>
        `
    })
  
    queryList.innerHTML = str
    queryList.style.display = 'block'
}
  
$('.search').focus(function () {
    $(this).css("border-right","1px solid #ff6700").parent().css("border","1px solid #ff6700")
}).blur(function () {
    $(this).css("border-right","1px solid #e0e0e0").parent().css("border","none")
})

// 轮播左菜单数据渲染
$('.navli').on('mouseenter', '.navli-item', async function () {
    let data = $(this).find('.goods-section').text()
    let res = await $.get('./sever/common.php', { data }, null, 'json')

    let result = [res.slice(0,6), res.slice(6,12), res.slice(12,18), res.slice(18,24)]
    let str = ``

    result.forEach((item, index) => {
        item.forEach((item) => {
            str += `
                <li>
                    <a href="./views/detail.html">
                        <img src="${ item.sample_img }"/>
                        ${ item.good_name }
                    </a>
                </li>
            ` 
        })
        $(this).find('.second-nav').find('ul').eq(index).html(str)
        str = ``
    })
})