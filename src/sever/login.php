<?php
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM `user` WHERE `username` = '$username' AND `password` = '$password'";
    $link = mysqli_connect('127.0.0.1','root','root','mi');
    $res = mysqli_query($link,$sql);
    $data = mysqli_fetch_all($res,MYSQLI_ASSOC);
    mysqli_close($link);

    if (count($data)) {
        $arr = array (
            "message" => "登录成功",
            "code" => 1,
            "nickname" => $data[0]['nickname']
        );
    } else {
        $arr = array(
            "message" => "登录失败",
            "code" => 0
        );
    }
    
    echo json_encode($arr);
?>