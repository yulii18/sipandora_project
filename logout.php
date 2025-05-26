<?php
// Mulai session
session_start();

// Hapus semua data session
$_SESSION = array();

// Jika ingin menghapus session cookie juga
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Hapus cookie remember_me jika ada
if (isset($_COOKIE['remember_me'])) {
    setcookie('remember_me', '', time() - 3600, "/");
}

// Hancurkan session
session_destroy();

// Redirect ke halaman index.php dengan pesan sukses
$_SESSION['logout_success'] = true;
header("Location: index.php");
exit();
?>