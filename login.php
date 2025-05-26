<?php
// Mulai session
session_start();

// Include file konfigurasi database
require_once 'config.php';

// Variabel untuk menyimpan pesan error
$error = '';

// Cek apakah form login disubmit
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $role = $_POST['role'];
    $remember = isset($_POST['remember']) ? true : false;

    // Validasi input
    if (empty($email) || empty($password) || empty($role)) {
        $error = 'Semua field harus diisi!';
    } else {
        // Query untuk mencari user berdasarkan email dan role
        $sql = "SELECT id, email, password, role, full_name FROM users WHERE email = ? AND role = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $email, $role);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows == 1) {
            $user = $result->fetch_assoc();
            
            // Verifikasi password
            if (password_verify($password, $user['password'])) {
                // Set session
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['role'] = $user['role'];
                $_SESSION['full_name'] = $user['full_name'];
                $_SESSION['logged_in'] = true;
                
                // Jika remember me dicentang, set cookie
                if ($remember) {
                    $cookie_value = base64_encode($user['id'] . ':' . $email);
                    setcookie('remember_me', $cookie_value, time() + (86400 * 30), "/");
                }
                
                // Simpan data redirect di session
                switch($user['role']) {
                    case 'user':
                        $_SESSION['redirect_url'] = 'user/dashboard.php';
                        break;
                    case 'admin_pmi':
                        $_SESSION['redirect_url'] = 'admin_pmi/dashboard_admin_pmi.php';
                        break;
                    case 'admin_rs':
                        $_SESSION['redirect_url'] = 'admin_rs/dashboard_admin_rs.php';
                        break;
                    default:
                        $_SESSION['redirect_url'] = 'user/dashboard.php';
                }
                
                // Set flag untuk menampilkan notifikasi
                $_SESSION['show_login_success'] = true;
                
            } else {
                exit();
            } else {
                $error = 'Password salah!';
            }
        } else {
            $error = 'Email tidak ditemukan atau peran tidak sesuai!';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Sistem Donor Darah</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
/* Add this to your styles.css */

/* .input-with-icon input {
    padding-left: 45px;
    padding-right: 45px;
    width: 100%;
    box-sizing: border-box;
} */
    </style>
</head>
<body>
    <!-- Login Section -->
    <section class="login-section">
      <div class="container">
        <div class="login-container">
                <div class="login-header">
                  <a href="#" class="logo">SIPAN<span>DORA</span></a>
                  <h2>Masuk ke Akun Anda</h2>
                  <p>Silakan masuk untuk mengakses layanan SIPANDORA</p>
                </div>
                
                <form id="loginForm" class="login-form" method="POST" action="login.php">
                  <?php if (!empty($error)): ?>
                    <div class="alert alert-danger"><?php echo $error; ?></div>
                  <?php endif; ?>
                  
                  <div class="form-group">
                      <div class="form-group">
                          <label for="role">Login Sebagai</label>
                          <select id="role" name="role" class="form-control" required>
                              <option value="" disabled selected>Pilih peran Anda</option>
                              <option value="user" <?php echo (isset($_POST['role']) && $_POST['role'] == 'user') ? 'selected' : ''; ?>>Pengguna Biasa</option>
                              <option value="admin_pmi" <?php echo (isset($_POST['role']) && $_POST['role'] == 'admin_pmi') ? 'selected' : ''; ?>>Admin PMI</option>
                              <option value="admin_rs" <?php echo (isset($_POST['role']) && $_POST['role'] == 'admin_rs') ? 'selected' : ''; ?>>Admin Rumah Sakit</option>
                          </select>
                      </div>
                      <label for="email">Email</label>
                      <div class="input-with-icon">
                            <input type="email" id="email" name="email" placeholder="Masukkan email Anda" 
                                   value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>" required>
                            <i class="fas fa-envelope"></i>
                        </div>
                    </div>
                    
            <div class="form-group">
                <label for="password">Password</label>
                <div class="input-with-icon">
                    <input type="password" id="password" name="password" placeholder="Masukkan password Anda" required>
                    <i class="fas fa-lock input-icon"></i>
                    <i class="fas fa-eye toggle-password" id="togglePassword"></i>
                </div>
            </div>
                    
                    <div class="form-options">
                        <div class="remember-me">
                            <input type="checkbox" id="remember" name="remember" <?php echo isset($_POST['remember']) ? 'checked' : ''; ?>>
                            <label for="remember">Ingat saya</label>
                        </div>
                        <a href="#lupa-password">Lupa password?</a>
                    </div>
                    
                    <button type="submit" class="btn" style="width: 100%; padding: 12px; font-size: 16px; margin-bottom: 20px;">
                        <i class="fas fa-sign-in-alt" style="margin-right: 8px;"></i>Masuk
                    </button>
                    
                    <div class="login-footer">
                        <p>Belum punya akun? <a href="register.php">Daftar sekarang</a></p>
                        <p>Dengan masuk, Anda setuju dengan <a href="#">Syarat dan Ketentuan</a> serta <a href="#">Kebijakan Privasi</a> kami.</p>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-column">
            <h3>Tentang Kami</h3>
            <p>
              SIPANDORA adalah platform inovatif yang menghubungkan pendonor
              darah dengan mereka yang membutuhkan, serta menyediakan layanan
              respon darurat untuk situasi kritis.
            </p>
            <div class="social-links">
              <a href="#"><span>FB</span></a>
              <a href="#"><span>TW</span></a>
              <a href="#"><span>IG</span></a>
              <a href="#"><span>YT</span></a>
            </div>
          </div>

          <div class="footer-column">
            <h3>Layanan</h3>
            <ul class="footer-links">
              <li><a href="#">Pencarian Darah</a></li>
              <li><a href="#">Pendaftaran Donor</a></li>
              <li><a href="#">Jadwal Donor</a></li>
              <li><a href="#">Informasi Kesehatan</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h3>Kontak Kami</h3>
            <p><strong>Alamat:</strong> Jl. Kartini No. 20, Lolu Selatan, Kec. Palu Selatan, Kota Palu, Sulawesi Tengah 94235</p>
            <p><strong>Email:</strong> info@sipandora.id</p>
            <p><strong>Telepon:</strong> (021) 1234-5678</p>
            <p><strong>Darurat:</strong> 119 (24 Jam)</p>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2023 SIPANDORA. Semua Hak Dilindungi.</p>
        </div>
      </div>
    </footer>

    <!-- JavaScript -->
    <script>
     // Toggle show/hide password
    document.getElementById('togglePassword').addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        const icon = this;
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Cek jika ada pesan error dari PHP
        const errorMessage = document.querySelector('.alert.alert-danger');
        if (errorMessage && errorMessage.textContent.trim() !== '') {
            Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: errorMessage.textContent,
            });
        }
        

        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                // Validasi client-side
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const role = document.getElementById('role').value;
                
                if (!email || !password || !role) {
                    e.preventDefault();
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Semua field harus diisi!',
                    });
                }
            });
        }
    });
</script>
</body>
</html>