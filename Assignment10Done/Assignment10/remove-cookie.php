<?php 

// remove cookies
// After checking for the existence of the relevant form data, remove the theme cookie
// by setting the expiry to a time in the past. Remove the philosopher cookie by
// unsetting the session variable. After removing the cookies, redirect back to
// chapter15-project1.php

    session_start();

    if (!empty($_POST)){
        debugArray($_POST);
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

   if(!empty($_COOKIE['theme']) && !empty($_SESSION['philosopher']) ){
        // Remove the theme cookie
        setcookie('theme', '', time() - 3600, '/', 'localhost');

        // Remove the philosopher cookie
        unset($_SESSION['philosopher']);
        

        // Redirect back to chapter15-project1.php
        header('Location: ch15-proj1.php');
        exit;
   }

?>