<?php
    $good_section = $_GET['good_section'];
    $sort = $_GET['sort'];
    $sortType = $_GET['sortType'];
    $current = $_GET['current'];
    $pagesize = $_GET['pagesize'];

    $sql = "SELECT * FROM `xiaomi_table`";
    if ($good_section != 'all') $sql .= " WHERE `good_section` = '$good_section'";
    $sql .= " ORDER BY `price` $sortType";
    $start = ($current - 1) * $pagesize;
    $sql .= " LIMIT $start,$pagesize";
    $link = mysqli_connect('127.0.0.1', 'root', 'root', 'mi');
    $res = mysqli_query($link,$sql);
    $data = mysqli_fetch_all($res,MYSQLI_ASSOC);
    mysqli_close($link);
    $arr = array(
        "message" => "获取商品列表成功",
        "code" => 1,
        "list" => $data
    );
    echo json_encode($arr);
?>