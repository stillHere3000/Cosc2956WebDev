<?php 

include 'data.inc.php';


?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="utf-8">
    <title>Chapter 12</title>
    
    <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
<?php 
  include 'header.inc.php';
 
 ?>
    
<main>
    <section class="results">
    <?php
       if(empty($_POST['title']) && empty($_POST['discription'])  && empty($_POST['medium']) && empty($_POST['year']) && empty($_POST['museum']) ) {
        echo '<h1 style="color:red;">No POST Values please try again </h1>';
        
        exit(1);
      } 
    ?>
    
    <table>
      <caption class="results__caption">Art Work Saved</caption>
      <tr>
        <td class="results__label">Title</td>    
        <td class="results__value"><?php echo !empty($_POST['title']) ? htmlspecialchars($_POST['title']) : '<pre style="color:red;">No POST Value for title </pre>'; ?> </td> 
      </tr>
      <tr>
        <td class="results__label">Description</td>    
        <td class="results__value"><?php echo !empty($_POST['description']) ? htmlspecialchars($_POST['description']) : '<pre style="color:red;">No POST Value for discription</pre>'; ?> </td> 
      </tr>
      <tr>
        <td class="results__label">Genre</td>    
        <td class="results__value"><?php echo ($_POST['genre'] != "Choose genre") ? htmlspecialchars($_POST['genre']) : '<pre style="color:red;">No POST Value for genre</pre>'; ?> </td> 
      </tr>
      <tr>
        <td class="results__label">Subject</td>    
        <td class="results__value"> <?php echo ($_POST['subject'] != "Choose subject") ? htmlspecialchars($_POST['subject']) : '<pre style="color:red;">No POST Value for subject</pre>'; ?> </td> 
      </tr>
      <tr>
        <td class="results__label">Medium</td>    
        <td class="results__value"><?php echo !empty($_POST['medium']) ? htmlspecialchars($_POST['medium']) : '<pre style="color:red;">No POST Value for medium</pre>'; ?> </td> 
      </tr>   
      <tr>
        <td class="results__label">Year</td>    
        <td class="results__value"><?php echo !empty($_POST['year']) ? htmlspecialchars($_POST['year']) : '<pre style="color:red;">No POST Value for year</pre>'; ?> </td> 
      </tr>  
      <tr>
        <td class="results__label">Museum</td>    
        <td class="results__value"><?php echo !empty($_POST['museum']) ? htmlspecialchars($_POST['museum']) : '<pre style="color:red;">No POST Value for museum</pre>'; ?> </td> 
      </tr>          
    </table>
    
  
    </section>
</main>       
</body>
</html>
