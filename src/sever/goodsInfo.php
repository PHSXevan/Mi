<?php
    $id = $_GET['id'];

    $sql = "SELECT * FROM `xiaomi_table` WHERE `id` = '$id'";
    $link = mysqli_connect('127.0.0.1', 'root', 'root', 'mi');
    $res = mysqli_query($link, $sql);
    $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
    mysqli_close($link);

    $arr = array(
        "message" => "获取商品信息成功",
        "code" => 1,
        "info" => $data[0]
      );
    
      echo json_encode($arr);
?>