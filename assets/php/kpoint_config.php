<?php 
$KPOINTDOMAIN="https://cognizant.kpoint.com";

$CLIENT_ID = "ci9f8a70a068374ba9a3872e8bfeecbe46";
$SECRET_KEY = "ska2fccc53692947dca821d51cf01e42aa";
//GET SSO USER DATA 
/* require_once (dirname(__FILE__) . '/simplesamlphp/lib/_autoload.php');
$as = new SimpleSAML_Auth_Simple('default-sp');
$as->requireAuth();

$attributes = $as->getAttributes(); */
//Get User Email Address
//$USER_EMAIL =  $attributes['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'][0];
$USER_EMAIL =  'praveen.chamarthi@cognizant.com';
//Get User Emp i'd Details
//$user_emp_id =  $attributes['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'][0];
//$user_emp_id_num = explode('@',$user_emp_id);
//$EMP_ID =  $user_emp_id_num[0];
$EMP_ID =  727941;
//Get User Fullname
//$USER_FULLNAME =  $attributes['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/username'][0];
$USER_FULLNAME =  'Praveen Chamarthi';

/* echo 'Employee ID: '.$emp_id;
echo 'Email Address: '.$user_email_address;
echo 'UserFullname: '.$user_fullname; */
?>