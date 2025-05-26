<?php
$password = 'MuelGans123';
$hash = password_hash($password, PASSWORD_DEFAULT);
echo "\nHash untuk password '$password':" . $hash;

$password = 'adminpmi123';
$hash = password_hash($password, PASSWORD_DEFAULT);
echo "\nHash untuk password '$password': " . $hash;

$password = 'rumahsakit123';
$hash = password_hash($password, PASSWORD_DEFAULT);
echo "\nHash untuk password '$password': " . $hash;
?>

