<?php
include 'includes/travel-config.inc.php';

try {
  $pdo = new PDO(DBCONNSTRING, DBUSER, DBPASS);
  echo "Connected successfully";
} catch (PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}


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
    <header>
        <form action="ch14-proj1.php" method="get" >
          <div class="form-inline">
          <select name="continent" >
            <option value="0">Select Continent</option>
            <?php
            try{
              $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

              $filterConditionContinent= (!empty($_GET['continent']))?"ContinentCode='".$_GET['continent']."'":1;

              $sql = "SELECT * FROM continents  ";
              echo $sql;
              $stmt = $pdo->query($sql);
              if (!$stmt) {
                  print_r($pdo->errorInfo());
              }

              $continents = $stmt->fetchAll(PDO::FETCH_ASSOC);

              if ($stmt->rowCount() > 0){
                foreach ($continents as $continent) {
                    echo "<option value='".$continent['ContinentCode'] . "'> " . $continent['ContinentName'] . "</option>"."\n";
                }
              }
            } catch (PDOException $e){
              echo "Query failed".$e->getMessage();
            } 
             
            ?>
          </select>     
          
          <select name="country">
            <option value="0">Select Country</option>
            <?php
             try{
              $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

              $filterConditionCountry= (!empty($_GET['country']))?"CountryCodeISO='".$_GET['country']."'":1;


              $sql = "SELECT * FROM countries";
              $stmt = $pdo->query($sql);
              if (!$stmt) {
                  print_r($pdo->errorInfo());
              }

              $countries = $stmt->fetchAll(PDO::FETCH_ASSOC);

              if ($stmt->rowCount() > 0){
                foreach ($countries as $country) {
                    echo "<option value='".$country['ISO'] . "'> " . $country['CountryName'] . "</option>"."\n";
                }
              }
            } catch (PDOException $e){
              echo "Query failed".$e->getMessage();
            }
             
            ?>
          </select>    
          <input type="text"  placeholder="Search title" name=title>
          <button type="submit" class="btn-primary">Filter</button>
          <button type="submit" class="btn-secondary">Reset</button>
          </div>
        </form>
    </header>   
                                    
    <main >
        <ul >

            <li>
                <?php
                    
                    try{
                      $pdo = new PDO(DBCONNSTRING, DBUSER, DBPASS);
                      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                      $filterConditionTitle= (!empty($_GET['title']))?"Title='".$_GET['title']."'":1;


                      $sqlJoin = "SELECT * FROM imagedetails where ".$filterConditionContinent." AND ".$filterConditionCountry." AND ".$filterConditionTitle."   ORDER BY imagedetails.ImageID ASC ;";
                      $stmt = $pdo->query($sqlJoin);
                      if (!$stmt) {
                          print_r($pdo->errorInfo());
                      }
                      $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
                      //echo "row count ".$stmt->rowCount();
                      if ($stmt->rowCount() > 0){
                        foreach ($images as $image) {
                          echo "<a href='detail.php?imageID=".$image['ImageID']."'><img src='".$image['Path']."' /></a>\n";
                        }
                      }

                    } catch (PDOException $e){
                        echo "Query failed".$e->getMessage();
                    }

                ?>
            </li>        

          </ul>       

      
      </main>

</body>

</html>

<?php
    gc_collect_cycles();
?>