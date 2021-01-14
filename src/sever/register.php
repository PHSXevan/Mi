<?php
    $nickname = $_POST['nickname'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "INSERT INTO `user` VALUES('NULL','$username', '$password', '$nickname')";
    $link = mysqli_connect('127.0.0.1','root','root','mi');
    $res = mysqli_query($link,$sql);
    mysqli_close($link);

    echo $res;
?>