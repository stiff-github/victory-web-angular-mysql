<?php
if(isset($_GET['grco'])) {
    $grco = htmlspecialchars($_GET['grco']);
}

//$grco='09020202';
//Open a new connection to the MySQL server
$mysqli = new mysqli('localhost','root','','victory_app');
if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
}
$mysqli->set_charset("AL32UTF8");
$results = $mysqli->query("select gs.scholar_code,gs.scholar_fname,ifnull(gs.scholar_lname,' ') as scholar_lname,ifnull(DATE_FORMAT(gs.scholar_datebirth,'%d.%m.%Y'),' ') as scholar_datebirth,
                            gs.scholar_id,gs.id,
                                CASE ss.discount_type
                                  WHEN 0 THEN ss.payment
                                  WHEN 1 THEN (ss.payment * ((100 - ss.discount_val) / 100))
                                  WHEN 2 THEN (ss.payment - ss.discount_val)
                                  WHEN 3 THEN ss.discount_val
                                  else 0
                                END
                                as payment,
                            0 as presence,0 as hour from group_scholar gs, scholar_subj ss, scholar s,group_list gl
                            where gs.scholar_id=s.id and ss.id_master=s.id_master and ss.code=s.code and gs.code_group=gl.code_group and gl.subj_name=ss.subj_name
                            and gs.code_group=$grco order by gs.scholar_fname,gs.scholar_lname");
$i=0;
$cnt_row=$results->num_rows;
print("[");
while($row = $results->fetch_assoc()) {
    $i++;
    print("{");
    print("\"id\":\"");
    print($row["id"]);
    print("\",");
    print("\"scholar_code\":\"");
    print($row["scholar_code"]);
    print("\",");
    print("\"scholar_fname\":\"");
    print($row["scholar_fname"]);
    print("\",");
    print("\"scholar_lname\":\"");
    print($row["scholar_lname"]);
    print("\",");
    print("\"scholar_datebirth\":\"");
    print($row["scholar_datebirth"]);
    print("\",");
    print("\"scholar_id\":\"");
    print($row["scholar_id"]);
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