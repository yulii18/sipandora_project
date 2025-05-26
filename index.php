<?php if (isset($_SESSION['logout_success'])): ?>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        Swal.fire({
            title: 'Logout Berhasil!',
            text: 'Anda telah keluar dari sistem.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true
        });
    });
</script>
<?php 
    unset($_SESSION['logout_success']);
endif; 
?>

<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SIPANDORA - Sistem Pendonor Darah</title>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <!-- Header -->
    <header>
      <div class="container">
        <nav class="navbar">
          <a href="#" class="logo">SIPAN<span>DORA</span></a>
          <button class="mobile-menu-btn">☰</button>
          <ul class="nav-links">
            <li><a href="#home" class="active">Beranda</a></li>
            <li><a href="#donor">Donor Darah</a></li>
            <li><a href="#about">Tentang Kami</a></li>
            <li><a href="#contact">Kontak</a></li>
            <li><a href="login.php" class="btn" >Masuk</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Hero Carousel -->
    <section class="hero" id="home">
      <div class="carousel">
        <div class="carousel-inner">
          <div
            class="carousel-item active"
            style="
              background-image: url(&quot;https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80&quot;);
            "
          >
            <div class="carousel-caption">
              <h2>Donor Darah Selamatkan Nyawa</h2>
              <p>
                Setetes darah Anda bisa menjadi harapan bagi mereka yang
                membutuhkan. Mari bergabung menjadi pendonor darah.
              </p>
              <a href="#donor" class="btn">Pelajari Lebih Lanjut</a>
            </div>
          </div>
 
          <div
            class="carousel-item"
            style="
              background-image: url(&quot;https://images.unsplash.com/photo-1584473457406-6240486418e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80&quot;);
            "
          >
            <div class="carousel-caption">
              <h2>Komunitas Pendonor Aktif</h2>
              <p>
                Bergabunglah dengan ribuan pendonor darah yang siap membantu
                kapan saja dibutuhkan.
              </p>
              <a href="login.html" class="btn" id="registerBtn2">Daftar Sekarang</a>
            </div>
          </div>
        </div>
        <div class="carousel-controls">
          <button class="carousel-control prev">❮</button>
          <button class="carousel-control next">❯</button>
        </div>
      </div>
    </section>

    <!-- Emergency Section -->
    <section class="emergency-section" id="emergency">
      <div class="container">
        <h2 class="section-title text-center">Layanan Darurat</h2>
        <p class="text-center" style="max-width: 800px; margin: 0 auto 30px">
          Kami menyediakan layanan cepat untuk situasi darurat yang membutuhkan
          darah atau bantuan medis segera.
        </p>

        <div class="emergency-cards">
          <div class="emergency-card">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Pencarian Darah Darurat"
            />
            <div class="emergency-card-content">
              <h3>Pencarian Darah Darurat</h3>
              <p>
                Cari pendonor darah dengan golongan darah tertentu di lokasi
                terdekat saat situasi darurat.
              </p>
              <a href="login.html" class="btn" id="bloodSearchBtn">Cari Darah</a>
            </div>
          </div>

          <div class="emergency-card">
            <img
              src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Lokasi PMI Terdekat"
            />
            <div class="emergency-card-content">
              <h3>Lokasi PMI Terdekat</h3>
              <p>
                Temukan unit Palang Merah Indonesia terdekat untuk donor darah
                atau bantuan medis.
              </p>
              <a href="#" class="btn" id="findPmiBtn">Cari PMI</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section class="info-section" id="donor">
      <div class="container">
        <h2 class="section-title text-center">Informasi Donor Darah</h2>
        <p class="text-center" style="max-width: 800px; margin: 0 auto 30px">
          Pelajari lebih lanjut tentang donor darah dan bagaimana Anda bisa
          berkontribusi menyelamatkan nyawa.
        </p>

        <div class="info-grid">
          <div class="info-item">
            <i>💉</i>
            <h3>Syarat Donor Darah</h3>
            <p>
              Berat badan minimal 45 kg, usia 17-65 tahun, tekanan darah normal,
              dan kondisi kesehatan yang baik.
            </p>
          </div>

          <div class="info-item">
            <i>⏱️</i>
            <h3>Jadwal Donor</h3>
            <p>
              Donor darah bisa dilakukan setiap 3 bulan untuk pria dan setiap 4
              bulan untuk wanita.
            </p>
          </div>

          <div class="info-item">
            <i>🩸</i>
            <h3>Manfaat Donor Darah</h3>
            <p>
              Menjaga kesehatan jantung, mendeteksi penyakit dini, dan tentunya
              menyelamatkan nyawa.
            </p>
          </div>

          <div class="info-item">
            <i>❓</i>
            <h3>Pertanyaan Umum</h3>
            <p>
              Temukan jawaban atas pertanyaan umum seputar donor darah dan
              prosesnya.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number" id="donorCount">0</div>
            <div class="stat-label">Pendonor Terdaftar</div>
          </div>

          <div class="stat-item">
            <div class="stat-number" id="bloodRequestCount">0</div>
            <div class="stat-label">Permintaan Darah</div>
          </div>

          <div class="stat-item">
            <div class="stat-number" id="livesSavedCount">0</div>
            <div class="stat-label">Nyawa Diselamatkan</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Siap Menjadi Pahlawan?</h2>
          <p>
            Daftarkan diri Anda sebagai pendonor darah dan jadilah bagian dari
            komunitas yang menyelamatkan nyawa. Bersama kita bisa membuat
            perbedaan!
          </p>
          <a href="login.html" class="btn" id="registerBtn3">Daftar Sekarang</a>
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
              darah dengan mereka yang membutuhkan.
            </p>
            <div class="social-links">
              <a href="https://web.facebook.com/palangmerah/about?locale=id_ID" target="_blank"><span>FB</span></a>
              <a href="https://youtube.com/@pmi_tv?si=LvQ3QXdxt2JyqkKn" target="_blank"><span>YT</span></a>
              <a href="https://www.instagram.com/palangmerah_indonesia?igsh=a3l2bnR2Nmw2YXVm" target="_blank"><span>IG</span></a>
              <a href="https://www.pmi.or.id/" target="_blank"><span>WEB</span></a>
            </div>
          </div>

          <div class="footer-column">
            <h3>Layanan</h3>
            <ul class="footer-links">
              <li><a href="permintaan_darah.html">Pencarian Darah</a></li>
              <li><a href="daftar_donor.html">Pendaftaran Donor</a></li>
              <li><a href="jadwal_donor.html">Jadwal Donor</a></li>
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

    <!-- Register Modal -->
    <div class="modal" id="registerModal">
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Pendaftaran Donor Darah</h2>
        <form id="donorForm">
          <div class="form-group">
            <label for="fullName">Nama Lengkap</label>
            <input type="text" id="fullName" required />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required />
          </div>

          <div class="form-group">
            <label for="phone">Nomor Telepon</label>
            <input type="tel" id="phone" required />
          </div>

          <div class="form-group">
            <label for="bloodType">Golongan Darah</label>
            <select id="bloodType" required>
              <option value="">Pilih Golongan Darah</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </div>

          <div class="form-group">
            <label for="address">Alamat</label>
            <textarea id="address" rows="3" required></textarea>
          </div>

          <div class="form-group">
            <label for="lastDonation">Terakhir Donor (jika pernah)</label>
            <input type="date" id="lastDonation" />
          </div>

          <button type="submit" class="btn">Daftar Sekarang</button>
        </form>
      </div>
    </div>

    <!-- Blood Search Modal -->
    <div class="modal" id="bloodSearchModal">
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Pencarian Darah Darurat</h2>
        <form id="bloodSearchForm">
          <div class="form-group">
            <label for="searchBloodType">Golongan Darah Dibutuhkan</label>
            <select id="searchBloodType" required>
              <option value="">Pilih Golongan Darah</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </div>

          <div class="form-group">
            <label for="searchLocation">Lokasi</label>
            <input
              type="text"
              id="searchLocation"
              placeholder="Masukkan kota atau kecamatan"
              required
            />
          </div>

          <div class="form-group">
            <label for="urgencyLevel">Tingkat Urgensi</label>
            <select id="urgencyLevel" required>
              <option value="high">Sangat Mendesak</option>
              <option value="medium">Mendesak</option>
              <option value="low">Bisa Menunggu</option>
            </select>
          </div>

          <div class="form-group">
            <label for="patientCondition">Kondisi Pasien</label>
            <textarea
              id="patientCondition"
              rows="3"
              placeholder="Jelaskan kondisi pasien secara singkat"
            ></textarea>
          </div>

          <button type="submit" class="btn">Cari Pendonor</button>
        </form>
      </div>
    </div>

    <!-- Emergency Call Modal -->
    <div class="modal" id="emergencyCallModal">
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Panggilan Darurat</h2>
        <p>Silakan pilih jenis layanan darurat yang Anda butuhkan:</p>

        <div style="margin: 30px 0">
          <button
            class="btn"
            style="width: 100%; margin-bottom: 15px; background-color: #dc3545"
            id="callAmbulanceBtn"
          >
            🚑 Panggil Ambulans
          </button>

          <button
            class="btn"
            style="width: 100%; margin-bottom: 15px; background-color: #fd7e14"
            id="callPoliceBtn"
          >
            🚓 Panggil Polisi
          </button>

          <button
            class="btn"
            style="width: 100%; background-color: #0d6efd"
            id="callFireBtn"
          >
            🚒 Panggil Pemadam Kebakaran
          </button>
        </div>

        <p><strong>Atau hubungi nomor darurat langsung:</strong></p>
        <p>Ambulans: 119</p>
        <p>Polisi: 110</p>
        <p>Pemadam Kebakaran: 113</p>
      </div>
    </div>
<script src="script.js"></script>
  </body>
</html>
