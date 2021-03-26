<?php
if($_POST['upload'] == 'upload'){
if(0 < $_FILES['file']['error']){
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    }else{
        move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/default.png' );
        $path = 'uploads/default.png';
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 =  base64_encode($data);
        echo $base64;
    }
}
if($_POST['upload'] == 'export'){

    $base64strImg = $_POST['image'];
    $data = base64_decode($base64strImg);
    file_put_contents('uploads/cypher.png', $data);

}

?>