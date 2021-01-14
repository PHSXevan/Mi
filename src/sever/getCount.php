<?php
    $good_section = $_GET['good_section'];

    $sql = "SELECT * FROM `xiaomi_table`";
    if ($good_section != 'all') $sql .= " WHERE `good_section` = '$good_section'";

    $link = mysqli_connect('127.0.0.1', 'root', 'root', 'mi');
    $res = mysqli_query($link, $sql);
    $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
    mysqli_close($link);
  
    $arr = array(
      "message" => "获取总数成功",
      "code" => 1,
      "count" => count($data)
    );
  
    echo json_encode($arr);
  
?>