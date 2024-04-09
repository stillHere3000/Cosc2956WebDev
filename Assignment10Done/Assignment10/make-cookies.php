
<?php 
/* make cookies 
After checking for the existence of the relevant form data, save the theme value as a 
persistent cookie using the setcookie() function. Set the expiry to be a day from 
the current time. You may need to set the domain value, which is the fifth parameter 
to the setcookie() function. Save the philosopher value as a session cookie by 
setting the expiry to 0. After setting the cookies, redirect back to chapter15-project1
*/

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

   if(!empty($_POST['theme']) && !empty($_POST['philosopher']) ){
        // Save the theme value as a persistent cookie
        setcookie('theme', $_POST['theme'], time() + 86400, '/', 'localhost');

        // Save the philosopher value as a session cookie
        $_SESSION['philosopher'] = $_POST['philosopher'];
        

        // Redirect back to chapter15-project1.php
        header('Location: ch15-proj1.php');
        exit;
   }
?>