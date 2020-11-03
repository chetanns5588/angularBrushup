<?php
    include_once("database.php");
    $postdata = file_get_contents("php://input");
    if(isset($postdata) && !empty($postdata))
    {
        $request = json_decode($postdata);
        
        $firstName = trim($request->firstName);
        $lastName = trim($request->lastName);
        $age = trim($request->age);
        $gender = trim($request->gender);
        $pwd = mysqli_real_escape_string($mysqli, trim($request->pwd));
        $email = mysqli_real_escape_string($mysqli, trim($request->email));
        
        $sql = "INSERT INTO users(firstName,lastName,age, gender,password,email) 
            VALUES ('$firstName','$lastName','$age','$gender','$pwd','$email')";
        if ($mysqli->query($sql) === TRUE) {
            $authdata = [
                'firstName' => $firstName,
                'pwd' => '',
                'email' => $email,
                'Id' => mysqli_insert_id($mysqli)
            ];
            echo json_encode($authdata);
        }
    }
?>