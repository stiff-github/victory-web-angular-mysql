<?php
if(isset($_GET['teco'])) {
    $teco = htmlspecialchars($_GET['teco']);
}
//Open a new connection to the MySQL server
$mysqli = new mysqli('localhost','root','','victory_app');
//Output any connection error
if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
}
//MySqli Select Query
$results = $mysqli->query("SELECT gl.code_group,t.fname,t.city,t.city_id,t.code FROM group_list gl, scholar t where gl.city=t.city_id and t.solo_registr=$teco order by 1");
$i=0;
$cnt_row=$results->num_rows;
print("[");
while($row = $results->fetch_assoc()) {
    $i++;
    print("{");
    print("\"code_group\":\"");
    print($row["code_group"]);
    print("\",");
    print("\"fname\":\"");
    print($row["fname"]);
    print("\",");
    print("\"code\":\"");
    print($row["code"]);
    print("\",");
    print("\"city\":\"");
    print($row["city"]);
    print("\",");
    print("\"city_id\":\"");
    print($row["city_id"]);
    if ($cnt_row>$i) {
        print("\"},");
    }
    else {
        print("\"}");
    }
}
print("]");
$results->free();
?>