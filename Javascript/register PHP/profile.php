<?php
session_start();
if(!$_SESSION['username']){
    header('Location:index.php');
}

echo "HI ".$_SESSION['username'].'!';