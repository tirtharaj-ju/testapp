<?php

/*
 * xauth_token generation part
 */
echo GenerateKpointAPI();

function GenerateKpointAPI()
{
    
   // require_once('kpoint_config.php');
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
    $kpointDomain = $KPOINTDOMAIN;
    
    $CLIENT_ID  = $CLIENT_ID;
    $SECRET_KEY = $SECRET_KEY;
 
    $displayname    = $USER_FULLNAME;
    $email          = $USER_EMAIL;
    $challenge      = time();
    $user_id        = $EMP_ID; // required, in case your domain is configured to receive user id
    $account_number = $EMP_ID; // optional
    
   
        
        
        
        // if you want to authenticate user with both email and account number, then
        $data = "$CLIENT_ID:$email:$displayname:$challenge:$account_number";
        
        //step 2
        $xauth_token = hash_hmac("md5", $data, $SECRET_KEY, true);	
		//echo "'<script>console.log(\"$xauth_token\")</script>'";           
        //step 3
        $b64token = base64_encode($xauth_token);
        $b64token = str_replace("=", "", $b64token);
        $b64token = str_replace("+", "-", $b64token);
        $b64token = str_replace("/", "_", $b64token);
		//$b64token = str_replace("-", "", $b64token);
        
        //step 4
        // if user is tobe authenticated with email-id, then
        //$xtencode= "client_id=$CLIENT_ID&user_email=$email&user_name=$displayname&challenge=$challenge&xauth_token=$b64token";
        
       // if your domain is configured to send user id, then
       // $xtencode= "client_id=$CLIENT_ID&user_email=$email&user_name=$displayname&challenge=$challenge&xauth_token=$b64token&user_id=$user_id";
        
        // if you want to authenticate user with only account number, or email is not available, then
        //$xtencode= "client_id=$CLIENT_ID&user_name=$displayname&challenge=$challenge&account_number=$account_number&xauth_token=$b64token";
        
        // if you want to authenticate user with both email and account number, then
        $xtencode = "client_id=$CLIENT_ID&user_email=$email&user_name=$displayname&challenge=$challenge&account_number=$account_number&xauth_token=$b64token&user_id=$user_id";
        
        /*
         * xt token generation part
         */
        
        //step 5
        
        $xt = base64_encode($xtencode);
        $xt = str_replace("=", "", $xt);
        $xt = str_replace("+", "-", $xt);
        $xt = str_replace("/", "_", $xt);
        //echo 'Final token generation for KPOINT API__'.$xt;
        
        return $xt;
    
    //step 6
    //echo "<iframe width='100%' height='100%' src='http://acme.kpoint.com/kapsule/gcc-3ec87a06-aabc-4a81-848d-2ab4089839d4/v2/embedded?xt=$xt'></iframe>";
    
}


?>