<?php
  require 'database.php';

  $users = [];
  $sql = "SELECT firstName, lastName, age, gender, password, mail FROM users";

  if($result = mysqli_query($con,$sql))
  {
    $i = 0;
    while($row = mysqli_fetch_assoc($result))
    {
      $users[$i]['firstName'] = $row['firstName'];
      $users[$i]['lastName'] = $row['lastName'];
      $users[$i]['age'] = $row['age'];
      $users[$i]['gender'] = $row['gender'];
      $users[$i]['mail'] = $row['mail'];
      $i++;
    }

    echo json_encode($users);
  }
  else
  {
    http_response_code(404);
  }
?>