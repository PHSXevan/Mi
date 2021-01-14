// 账号登录扫码登录切换
$('.nav-tabs').on('click', 'a', function () {
    $(this).addClass('now').siblings().removeClass('now')
    $('.tabs-con').toggleClass('now')
})

// 登录验证
$(function () {
    $('.btnadpt').click(async () => {
        const username = $('#username').val()
        const password = $('#password').val()

        if (!username || !password) return alert("请完整填写表单")

        if (!/^[a-z0-9]\w{4,11}$/i.test(username) || !/^\w{5,12}$/i.test(password)) return alert("输入不合法，请重新输入")

        const { code, nickname } = await $.post('../sever/login.php', { username, password }, null, 'json')

        if (!code) return alert("用户名或者密码错误，请重新输入")

        setCookie('nickname', nickname, 60 * 60 * 24)

        window.location.href = `../index.html`
    })
})
