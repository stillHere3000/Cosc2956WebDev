<?php

   include 'includes/travel-config.inc.php';



   if ($_SERVER["REQUEST_METHOD"] == "GET" && !empty($_GET['imageID']) ) {
      // Check if the name and email fields are set
      if (!empty($_GET['imageID']) ) {
         // Sanitize and print the input
         $imgID = htmlspecialchars($_GET['imageID']);
         
         
      } else {
         echo "<h1 style='color:red;'>No imageID</h1> ";
      }
   } else {
      echo '<h1 style="color:red;">No GET Values please try again </h1>';
      echo "<h5>Invalid request method.</h5>";
      exit(1);
   }

   /*
      Query Imagedetails
   */
   try{
      //echo "Here-ParseJSON\n<br>";
      $pdo = new PDO(DBCONNSTRING, DBUSER, DBPASS);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $sql = "SELECT *  FROM imagedetails WHERE ImageID=".$_GET['imageID']."  ;";
      //echo $sql."\n<br>imageID= ".$_GET['imageID'];
      $stmt = $pdo->query($sql);
      if (!$stmt) {
         print_r($pdo->errorInfo());
      }
      $jsonData = $stmt->fetchAll(PDO::FETCH_ASSOC);
      //echo "row count ".$stmt->rowCount();
      if ($stmt->rowCount() > 0){
         
         foreach ($jsonData as $jData){
            //debugArray($jData);
            $colorsSqlData=  $jData['Colors'];
            $exifSqlData= $jData['Exif'];

         }
         $colorsPDO= json_decode($colorsSqlData);
         $exifSqlData= json_decode($exifSqlData);
         $title = $jData['Title'];
         $desc= $jData['Description'];
         $creator= $jData['ActualCreator'];
      }

   } catch (PDOException $e){
         echo "Query failed".$e->getMessage();
   }
      
   

   function debugArray($p){
      foreach ($p as $name => $value){
         echo "Name: $name, Value: $value\n";
      }
   }

   function debugArray2($p){
      foreach ($p as $value){
         echo "Value: $value\n";
      }
   }

   /*
      Query cities
   */
   try{
      $sqlCity = "SELECT *  FROM cities WHERE CityCode=".$jData['CityCode']."  ;";
      //echo $sql."\n<br>imageID= ".$_GET['imageID'];
      $stmt = $pdo->query($sqlCity);
      if (!$stmt) {
         print_r($pdo->errorInfo());
      }

      $citiesData = $stmt->fetchAll(PDO::FETCH_ASSOC);
      //echo "row count ".$stmt->rowCount();
      if ($stmt->rowCount() > 0){
            foreach ($citiesData as $cty){   }
         //debugArray($cty);
      }
   }
   catch (PDOException $e){
      echo "Query failed".$e->getMessage();
   }

   /*
      Query Country
   */
  try{
      $sqlCountry = "SELECT * FROM countries WHERE ISO='".$jData['CountryCodeISO']."'  ;";
      //echo $sql."\n<br>imageID= ".$_GET['imageID'];
      $stmt = $pdo->query($sqlCountry);
      if (!$stmt) {
         print_r($pdo->errorInfo());
      }

      $countryData = $stmt->fetchAll(PDO::FETCH_ASSOC);
      //echo "row count ".$stmt->rowCount();
      if ($stmt->rowCount() > 0){
            foreach ($countryData as $ctryData){   }
         //debugArray($cty);
      }
  }
  catch (PDOException $e){
     echo "Query failed".$e->getMessage();
  }




   //debugArray2($colorsPDO);

   

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Chapter 14</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
   
    <link rel="stylesheet" href="css/styles.css" />

</head>

<body>                                    
   <main class="detail">
      <div>
         <?php echo "<img src='".$jData['Path']."' >"; ?>
      </div>
      <div>
         <h1><?php echo $title; ?></h1>
         <h3><?php echo $cty['AsciiName'].", ".$ctryData['CountryName']; ?> </h3>
         <p><?php echo $desc; ?></p>
         <div class="box">
            <h3>Creator</h3>
            <?php echo "<p>".$creator."<br><a href='".$jData['CreatorURL']."'>".$jData['CreatorURL']."</a></p>"; ?>
         </div>         
         <div class="box">
            <h3>Camera</h3>
            <?php echo "<p>".$exifSqlData->make." ".$exifSqlData->model."</p>"; ?>
         </div>
         <div class="box">
            <h3>Colors</h3>
            <?php
            if(is_array($colorsPDO)){
               foreach ($colorsPDO as $clr){
                  echo "<span style='background-color:".$clr.";'>&emsp; &emsp; &emsp; &emsp; </span>&emsp; ";
               }
            }
            ?>
         </div>
      </div>
   </main>
</body>

</html>