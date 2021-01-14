// 商品信息渲染
let goods_info = null
$(function () {
    const id = window.sessionStorage.getItem('id')

    if (!id) {
        alert('您查看的商品不存在，点击确定回到商品列表')
        window.location.href = './list.html'
        return
    }
    
    getGoodsInfo()
    // 获取商品信息
    async function getGoodsInfo () {
        const res = await $.get('../sever/goodsInfo.php', { id }, null, 'json')
        bindHtml(res.info)
    }
    // 渲染页面
    function bindHtml (info) {
        goods_info = info
        let s1 = `
            <h2>${ info.good_name }</h2>
            <div class="float-left">
                <span class="separator">|</span>
                <a href="javascript:;">${ info.name }</a>
            </div>
            <div class="float-right">
                <a href="javascript:;">概述页</a>
                <span class="separator">|</span>
                <a href="javascript:;">参数页</a>
                <span class="separator">|</span>
                <a href="javascript:;">F码通道</a>
                <span class="separator">|</span>
                <a href="javascript:;">咨询客服</a>
                <span class="separator">|</span>
                <a href="javascript:;">用户评价</a>
            </div>
        `
        $('.nav-bar .container').html(s1)

        let str = `
            <div class="box">
                <div class="show">
                    <img src="${ info.good_img1 }" alt="">
                <div class="mask"></div>
            </div>
            <div class="list">
                <p class="active">
                    <img src="${ info.good_img1 }" showSrc="${ info.good_img1 }" enlargeSrc="${ info.good_img1 }" alt="">
                </p>
                <p>
                    <img src="${ info.good_img2 }" showSrc="${ info.good_img2 }" enlargeSrc="${ info.good_img2 }" alt="">
                </p>
            </div>
            <div class="enlarge"></div>
            </div>
            <div class="product-con">
                <h2>${ info.good_name }</h2>
                <p class="desc">${ info.name }</p>
                <p class="self-support">小米自营</p>
            <div class="price-info">
                <span>${ info.price }元</span>
                <del>${ info.market_price }元</del>
            </div>
            <div class="line"></div>
            <div class="product-address">
                <i class="iconfont iconfont-location"></i>
                <div class="address-info">
                    <span>北京</span>
                    <span>北京市</span>
                    <span>海淀区</span>
                    <span>清河街道</span>
                    <a href="javascript:;">修改</a>
                    <p class="desc">有现货</p>
                </div>
            </div>
            <div class="option-box">
                <div class="title">选择版本</div>
                <ul>
                    <li>6GB + 128GB</li>
                    <li>8GB + 128GB</li>
                    <li>8GB + 256GB</li>
                </ul>
            </div>
            <div class="selected-list">
                <ul>
                    <li>
                        ${ info.name }
                        <span>${ info.price }元</span>
                    </li>
                </ul>
                <div class="total-price">总计：${ info.price }元</div>
            </div>
            <div class="btn-box">
                <a href="javascript:;">加入购物车</a>
            </div>
        </div>
        `
        $('.product-box .container').html(str)

        enlarge()
    }

    // 选择版本点击事件
    $('.container').on('click', '.option-box ul>li', function () {
        console.log($(this));
        $(this).addClass('active').siblings().removeClass('active')
    })

    // 放大镜
    function enlarge () {
        new Enlarge('.box')
    }

    // 头部导航下拉菜单数据渲染
    $('.header-nav .layui-nav').on('mouseenter', '.under-nav', async function () {
        let arr = ['手机 电话卡','耳机 音箱','电视 盒子','笔记本 显示器','家电 插线板','健康 儿童','智能 路由器']
        let index = $(this).index()
        let data = arr[index]
        const res = await $.get('../sever/common.php', { data }, null, 'json')
        let res1 = res.splice(0,5)
        let str = ``
        res1.forEach(item => {
            str += `
                <li>
                    <div class="figure-thumb">
                        <a href="./detail.html">
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

// 微信二维码显示隐藏
$('.wechat').hover(function () {
    $(this).next().slideDown()
},function () {
    $(this).next().slideUp()
})