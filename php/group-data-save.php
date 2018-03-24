<?php
if(isset($_GET['grid'])) {
    $grid = htmlspecialchars($_GET['grid']);
    $grch = htmlspecialchars($_GET['grch']);
    $grho = htmlspecialchars($_GET['grho']);
    $flag = htmlspecialchars($_GET['flag']);
    $grco = htmlspecialchars($_GET['grco']);
    $grti = htmlspecialchars($_GET['grti']);

    $city_code = htmlspecialchars($_GET['city_code']);
    $teacher_code = htmlspecialchars($_GET['teacher_code']);
    $scholar_id = htmlspecialchars($_GET['scholar_id']);
    $scholar_fname = htmlspecialchars($_GET['scholar_fname']);
    $scholar_lname = htmlspecialchars($_GET['scholar_lname']);
    $scholar_datebirth = htmlspecialchars($_GET['scholar_datebirth']);
    $scholar_code = htmlspecialchars($_GET['scholar_code']);
    $payment = htmlspecialchars($_GET['payment']);
}
/*$grid = '78';
$grch = '1';
$grho = '78';
$flag = '1';
$grco = '78';
$grti = '01.12.2017';

$city_code = '78';
$teacher_code = '78';
$scholar_id = '78';*/
//$scholar_fname = '78';
//$scholar_lname = '78';
//$scholar_datebirth = '01.12.2017';*
//$scholar_code = '78';
//$payment = '78';

//$grco='09020202';
//Open a new connection to the MySQL server
$mysqli = new mysqli('localhost','root','','victory_app');
if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
}
$mysqli->set_charset("AL32UTF8");
if ($flag==0) {
    $results = $mysqli->query("update group_journal set presence=$grch,hour=$grho where id=$grid");
}
else {
    $results = $mysqli->query("insert into group_journal(city_code,teacher_code,code_group,date_lesson,scholar_id,scholar_fname,scholar_lname,scholar_datebirth,scholar_code,presence,hour,payment)
                                            values ('$city_code','$teacher_code','$grco',str_to_date('$grti','%d.%m.%Y'),$scholar_id,'$scholar_fname','$scholar_lname',
                                            str_to_date('$scholar_datebirth','%d.%m.%Y'),'$scholar_code',$grch,$grho,$payment)");
}
if($results){
    print '0';
}else{
    print '1';
}
?>