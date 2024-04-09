<?php



$links = [
   [ "url"=>"index.php", "label"=>"Home"],
   [ "url"=>"about.php", "label"=>"About"],
   [ "url"=>"works.php", "label"=>"Art Works"],
   [ "url"=>"artist.php", "label"=>"Artists"]

];

if(isset($_POST['title'])){
   $page = $__POST['title'];
} else {
   echo "No Post data received.";
}

?>


