$(function () {
    $('.btnadpt').click(async () => {
        let nickname = $('#nickname').val()
        let username = $('#username').val()
        let password = $('#password').val()

        if (!username || !password || !nickname) return alert("请完整填写表单")

        if (!/.{5,12}/.test(nickname) || !/^[a-z0-9]\w{4,11}$/i.test(username) || !/^\w{5,12}$/i.test(password)) return alert("输入不合法，请重新输入")

        const { code } = await $.post('../sever/login.php', { username, password }, null, 'json')
        console.log(code);

        if (code) {
            return alert("该用户名已注册，请重新输入")
        } else {
            const res = await $.post('../sever/register.php', { nickname, username, password } , null, 'json')
            window.location.href = './login.html'
        }
        
    })
 
})

