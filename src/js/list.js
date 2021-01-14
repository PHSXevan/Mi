// 分类列表显示与隐藏
$('#lists').hover(function () {
    $('.navli').css("display","block")
},function () {
    $('.navli').css("display","none")
})

// 全部数据渲染页面
$(function () {
    const list_info = {
        good_section: 'all',
        sort: 'price',
        sortType: 'ASC',
        current: 1,
        pagesize: 12
    }

    getClassify()
    // 获取分类
    async function getClassify () {
        const { list } = await $.get('../sever/classify.php', { good_section: list_info.good_section }, null, 'json')

        $('.navli').on('click', '.section', function () {
            const good_section = $(this).text().trim()
            list_info.good_section = good_section
            if (good_section == 'all') {
                list_info.good_section = all
            }
            getCount()
        })
    }

    getCount()
    // 获取商品数
    async function getCount() {
        const { count } = await $.get('../sever/getCount.php', { good_section: list_info.good_section }, null, 'json')

        new Pagination('.pagination', {
            total: count,
            pagesize: 12,
            sizeList: [12,16,20,24],
            change(current,pagesize) {
                list_info.current = current
                list_info.pagesize = pagesize
                getGoodsList()
            }
        })
    }

    // getGoodsList()
    // 获取商品列表
    async function getGoodsList () {
        const { list } = await $.get('../sever/goodsList.php', list_info, null, 'json')

        let str = ``

        list.forEach(item => {
            str += `
                <li class="product-cell" data-id="${ item.id }">
                    <img src="${ item.good_img1 }" alt="">
                    <h3 class="title">${ item.good_name }</h3>
                    <p class="desc">${ item.name }</p>
                    <p class="price">
                        <strong>${ item.price }</strong>
                        <span>元</span>
                    </p>
                </li>
            `
        })
        
        $('.components-list-box').html(str)
    }

    // 排序
    $('.sort').on('click', 'button', function () {
        if (this.dataset.type == 'ASC') {
            list_info.sortType = 'ASC'
        } else{
            list_info.sortType = 'DESC'
        }
        list_info.current = 1
        getGoodsList()
    })

    // 联动详情页
    $('.components-list-box').on('click','li', function () {
        window.sessionStorage.setItem('id', this.dataset.id)

        window.location.href = './detail.html'
    })

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

