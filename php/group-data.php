<?php
if(isset($_GET['grco'])) {
    $grco = htmlspecialchars($_GET['grco']);
    $grti = htmlspecialchars($_GET['grti']);
}

//$grco='09020202';
//$grti='06.02.2018';
//Open a new connection to the MySQL server
$mysqli = new mysqli('localhost','root','','victory_app');
if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
}
$mysqli->set_charset("AL32UTF8");
//$results = $mysqli->query("SELECT id,date_lesson,scholar_fname,scholar_code,presence,hour FROM group_journal where code_group=$grco and date_lesson=STR_TO_DATE('$grti', '%d.%m.%Y')");
$results = $mysqli->query("select id,scholar_code,scholar_fname,ifnull(scholar_lname,' ') as scholar_lname,ifnull(DATE_FORMAT(scholar_datebirth,'%d.%m.%Y'),' ') as scholar_datebirth,
                            scholar_id,presence,hour,payment from group_journal where code_group=$grco and date_lesson=STR_TO_DATE('$grti', '%d.%m.%Y') order by scholar_fname");
$i=0;
$cnt_row=$results->num_rows;
print("[");
while($row = $results->fetch_assoc()) {
    $i++;
    print("{");
    print("\"id\":\"");
    print($row["id"]);
    print("\",");
    print("\"scholar_fname\":\"");
    print($row["scholar_fname"]);
    print("\",");
    print("\"scholar_lname\":\"");
    print($row["scholar_lname"]);
    print("\",");
    print("\"scholar_code\":\"");
    print($row["scholar_code"]);
    print("\",");
    print("\"payment\":\"");
    print($row["payment"]);
    print("\",");
    print("\"presence\":\"");
    print($row["presence"]);
    print("\",");
    print("\"hour\":\"");
    print($row["hour"]);
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