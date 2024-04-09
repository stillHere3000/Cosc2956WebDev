<?php 


//error_reporting(E_ALL);
//ini_set('display_errors', 1);
session_start();
// Your session code here


if (!empty($_POST)){

//echo "POST Variables <br>";
//debugArray($_POST);


}

if (isset($_COOKIE['theme'])){

    //echo "Cookie Variables <br>";
    //debugArray($_COOKIE);
    foreach($_COOKIE as $name => $value){
      switch($name){
        case "theme":
          echo "<br>The Persistent Theme cookie value is ".$value;                              
          break;

        default:

        break;
      }
      echo ($name == "theme" && !empty($_COOKIE['theme']))?"<br>TO Test the persistant cookie close browser and reopen this page.<br>":"";
    }

}else {
    echo "<br>The Persistent Theme cookie NOT FOUND<br>";
}

if (isset($_SESSION['philosopher'])){

    //echo "<br>Session Variables <br>";
    //debugArray($_SESSION);
    foreach($_SESSION as $name => $val){
      switch($name){
        case "philosopher":
          echo "<br>The PHILOSOPHER cookie value is ".$val;                              
          break;

        default: break;
      }
      echo (!empty($_SESSION['philosopher']))? "<br>TO Test the session cookie click link below to go to another page in same domain.<br>":"";
    }
}
else {
    echo "<br>The Persistent Philosopher cookie NOT FOUND ";
}



function debugArray($p){
  foreach ($p as $name => $value){
    echo "Name: $name,&emsp;&emsp;&emsp; Value: $value\n<br>";
  }
}

function debugArray2($p){
  foreach ($p as $value){
    echo "Value: $value\n";
  }
}
?>