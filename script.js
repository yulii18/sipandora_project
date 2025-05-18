src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.29.2/feather.min.js"
src="https://cdn.jsdelivr.net/npm/sweetalert2@11"

feather.replace();

// script.js
// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
navLinks.classList.toggle("active");
});


// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
link.addEventListener('click', () => {
  // Hapus kelas "active" dari semua link
  navLinks.forEach(item => item.classList.remove('active'));
  
  // Tambahkan kelas "active" ke link yang diklik
  link.classList.add('active');
  });
});

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;

function showSlide(index) {
slides.forEach((slide) => {
    slide.classList.remove("active");
});

if (index >= totalSlides) {
    currentSlide = 0;
} else if (index < 0) {
    currentSlide = totalSlides - 1;
} else {
    currentSlide = index;
}

slides[currentSlide].classList.add("active");
}

document
.querySelector(".carousel-control.next")
.addEventListener("click", () => {
    showSlide(currentSlide + 1);
});

document
.querySelector(".carousel-control.prev")
.addEventListener("click", () => {
    showSlide(currentSlide - 1);
});

// Auto slide change
setInterval(() => {
showSlide(currentSlide + 1);
}, 5000);

// Counter Animation
function animateCounter(element, target, duration = 2000) {
const start = 0;
const increment = target / (duration / 16);
let current = start;

const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
    clearInterval(timer);
    current = target;
    }
    element.textContent = Math.floor(current).toLocaleString();
}, 16);
}

// Animate stats when they come into view
const statsSection = document.querySelector(".stats-section");
const statsAnimated = [false, false, false, false];

function checkStatsInView() {
const rect = statsSection.getBoundingClientRect();
const inView =
    rect.top <= window.innerHeight / 2 &&
    rect.bottom >= window.innerHeight / 2;

if (inView) {
    if (!statsAnimated[0]) {
    animateCounter(document.getElementById("donorCount"), 5243);
    statsAnimated[0] = true;
    }
    if (!statsAnimated[1]) {
    animateCounter(document.getElementById("bloodRequestCount"), 1876);
    statsAnimated[1] = true;
    }
    if (!statsAnimated[2]) {
    animateCounter(document.getElementById("livesSavedCount"), 3892);
    statsAnimated[2] = true;
    }
}
}


window.addEventListener("scroll", checkStatsInView);
window.addEventListener("load", checkStatsInView);

// Modal Functionality
const registerBtns = document.querySelectorAll(
"#registerBtn, #registerBtn2, #registerBtn3",
);
const bloodSearchBtn = document.getElementById("bloodSearchBtn");
const emergencyCallBtn = document.getElementById("emergencyCallBtn");
const findPmiBtn = document.getElementById("findPmiBtn");
const modals = document.querySelectorAll(".modal");
const closeModalBtns = document.querySelectorAll(".close-modal");

// registerBtns.forEach((btn) => {
// btn.addEventListener("click", (e) => {
//     e.preventDefault();
//     document.getElementById("registerModal").style.display = "flex";
// });
// });

bloodSearchBtn.addEventListener("click", (e) => {
e.preventDefault();
document.getElementById("bloodSearchModal").style.display = "flex";
});

emergencyCallBtn.addEventListener("click", (e) => {
e.preventDefault();
document.getElementById("emergencyCallModal").style.display = "flex";
});

findPmiBtn.addEventListener("click", (e) => {
e.preventDefault();
alert(
    "Fitur pencarian lokasi PMI terdekat akan membuka peta dengan lokasi Anda saat ini. Pastikan GPS aktif.",
);
// In a real implementation, this would open a map with nearby PMI locations
});

closeModalBtns.forEach((btn) => {
btn.addEventListener("click", () => {
    btn.closest(".modal").style.display = "none";
});
});

window.addEventListener("click", (e) => {
if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
}
});

// Emergency Call Buttons
document
.getElementById("callAmbulanceBtn")
.addEventListener("click", () => {
    alert(
    "Memanggil ambulans... Nomor darurat 119 akan dihubungi. Pastikan lokasi Anda aktif.",
    );
});

document.getElementById("callPoliceBtn").addEventListener("click", () => {
alert(
    "Memanggil polisi... Nomor darurat 110 akan dihubungi. Pastikan lokasi Anda aktif.",
);
});

document.getElementById("callFireBtn").addEventListener("click", () => {
alert(
    "Memanggil pemadam kebakaran... Nomor darurat 113 akan dihubungi. Pastikan lokasi Anda aktif.",
);
});

// Form Submissions
document.getElementById("donorForm").addEventListener("submit", (e) => {
e.preventDefault();
alert(
    "Terima kasih telah mendaftar sebagai pendonor darah! Kami akan menghubungi Anda untuk informasi lebih lanjut.",
);
document.getElementById("registerModal").style.display = "none";
// Reset form
e.target.reset();
});

document
.getElementById("bloodSearchForm")
.addEventListener("submit", (e) => {
    e.preventDefault();
    const bloodType = document.getElementById("searchBloodType").value;
    const location = document.getElementById("searchLocation").value;

    alert(
    `Mencari pendonor darah golongan ${bloodType} di ${location}... Hasil pencarian akan ditampilkan.`,
    );
    document.getElementById("bloodSearchModal").style.display = "none";
    // Reset form
    e.target.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
    window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
    });
    }
});
});

window.addEventListener("scroll", () => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  });

// ===== Login Functionality =====
document.addEventListener('DOMContentLoaded', function(){
  // Cek jika di halaman login
  if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    
    // Jika ada email yang diingat, isi field email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      document.getElementById('email').value = rememberedEmail;
      document.getElementById('remember').checked = true;
    }
    
    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Ambil nilai input
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;
      
      // Validasi sederhana
      if (!email || !password) {
        alert('Email dan password harus diisi!');
        return;
      } else {
        then.then(() => {
          if (userType === 'pencari') {
              window.location.href = 'dashboard.html';
          } else {
              window.location.href = 'dashboard.html';
          } 
      }
      
//       // Validasi sederhana
//       if (!email || !password) {
//           Swal.fire({
//               icon: 'error',
//               title: 'Oops...',
//               text: 'Email dan password harus diisi!',
//           });
//           return;
//       }
      
//       // Simulasi login berhasil
//       Swal.fire({
//           icon: 'success',
//           title: 'Login Berhasil',
//           text: 'Anda akan diarahkan ke dashboard',
//           timer: 1500,
//           showConfirmButton: false
//       }).then(() => {
//           if (userType === 'pencari') {
//               window.location.href = 'dashboard.html';
//           } else {
//               window.location.href = 'dashboard.html';
//           }
//       });
//   });
// });

// ===== Registration Functionality =====
document.addEventListener('DOMContentLoaded', function() {
  // Cek jika di halaman registrasi
  if (document.getElementById('registrationForm')) {
    const registrationForm = document.getElementById('registrationForm');
    
    // Handle form submission
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Ambil nilai input
      const nik = document.getElementById('nik').value;
      const nama = document.getElementById('nama').value;
      const tempatLahir = document.getElementById('tempatLahir').value;
      const tanggalLahir = document.getElementById('tanggalLahir').value;
      const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked')?.value;
      const golonganDarah = document.getElementById('golonganDarah').value;
      const alamat = document.getElementById('alamat').value;
      const kelurahan = document.getElementById('kelurahan').value;
      const kecamatan = document.getElementById('kecamatan').value;
      const kota = document.getElementById('kota').value;
      const pekerjaan = document.getElementById('pekerjaan').value;
      
      // Validasi sederhana
      if (!nik || !nama || !tempatLahir || !tanggalLahir || !jenisKelamin || 
          !golonganDarah || !alamat || !kelurahan || !kecamatan || !kota || !pekerjaan) {
        alert('Semua field harus diisi!');
        return;
      }
      
      // Validasi NIK (16 digit)
      if (nik.length !== 16 || !/^\d+$/.test(nik)) {
        alert('NIK harus terdiri dari 16 digit angka');
        return;
      }
      
      // Simulasi registrasi berhasil
      alert('Registrasi berhasil! Data Anda telah tersimpan.');
      
      // Redirect ke halaman login (uncomment saat implementasi nyata)
      // window.location.href = 'login.html';
      
      // Reset form
      this.reset();
    });
  }
});

// ===== Dashboard Functionality =====
document.addEventListener('DOMContentLoaded', function() {
    // Cek jika di halaman dashboard
    if (document.getElementById('logoutBtn')) {
        // Simulasi data user (dalam implementasi nyata, ini dari session/login)
        const userData = {
            name: "John Doe",
            lastDonation: "2023-10-15",
            points: 120,
            bloodType: "A"
        };

        // Isi data user
        document.getElementById('userName').textContent = userData.name;
        
        if (userData.lastDonation) {
            const lastDonationDate = new Date(userData.lastDonation);
            document.getElementById('lastDonationStatus').textContent = 
                `Terakhir donor: ${lastDonationDate.toLocaleDateString('id-ID')}`;
            
            // Hitung tanggal donor berikutnya (4 bulan setelah terakhir donor)
            const nextDonationDate = new Date(lastDonationDate);
            nextDonationDate.setMonth(nextDonationDate.getMonth() + 4);
            document.getElementById('nextDonationDate').textContent = 
                nextDonationDate.toLocaleDateString('id-ID');
        }

        document.getElementById('donationPoints').textContent = `${userData.points} Poin`;

        // Logout functionality
        document.getElementById('logoutBtn').addEventListener('click', function() {
            alert('Anda telah logout');
            window.location.href = 'index.html';
        });
    }
});

// ===== Riwayat Donor Functionality =====
document.addEventListener('DOMContentLoaded', function() {
    // Cek jika di halaman riwayat donor
    if (document.getElementById('riwayatList')) {
        // Simulasi data user
        const userData = {
            totalDonor: 0,
            totalPoin: 0,
            nyawaDiselamatkan: 0
        };

        // Update summary
        document.getElementById('totalDonor').textContent = `${userData.totalDonor} kali`;
        document.getElementById('totalPoin').textContent = `${userData.totalPoin} poin`;
        document.getElementById('nyawaDiselamatkan').textContent = userData.nyawaDiselamatkan;

        // Filter functionality
        const tahunFilter = document.getElementById('tahunFilter');
        const lokasiFilter = document.getElementById('lokasiFilter');
        const resetFilter = document.getElementById('resetFilter');

        tahunFilter.addEventListener('change', applyFilters);
        lokasiFilter.addEventListener('change', applyFilters);
        
        resetFilter.addEventListener('click', function() {
            tahunFilter.value = 'semua';
            lokasiFilter.value = 'semua';
            applyFilters();
        });

        function applyFilters() {
            // Dalam implementasi nyata, ini akan memfilter data dari server/database
            console.log('Filter diterapkan:', {
                tahun: tahunFilter.value,
                lokasi: lokasiFilter.value
            });
        }

        // Logout functionality
        document.getElementById('logoutBtn').addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });

        // Contoh data riwayat (kosong)
        const riwayatData = [];
        
        if (riwayatData.length > 0) {
            document.querySelector('.no-data').style.display = 'none';
            document.getElementById('riwayatList').style.display = 'block';
            
            // Render data riwayat
            renderRiwayat(riwayatData);
        }
    }
});

function renderRiwayat(data) {
    const riwayatList = document.getElementById('riwayatList');
    riwayatList.innerHTML = '';
    
    data.forEach(item => {
        const riwayatItem = document.createElement('div');
        riwayatItem.className = 'riwayat-item';
        
        riwayatItem.innerHTML = `
            <div class="riwayat-info">
                <h3>Donor Darah Rutin</h3>
                <div class="riwayat-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${item.location}</span>
                </div>
            </div>
            <div class="riwayat-date">
                ${item.date}
            </div>
        `;
        
        riwayatList.appendChild(riwayatItem);
    });
}

// ===== Daftar Donor Functionality =====
document.addEventListener('DOMContentLoaded', function() {
    // Cek jika di halaman daftar donor
    if (document.getElementById('donorList')) {
        // Simulasi data statistik
        document.getElementById('totalDonors').textContent = '0';
        document.getElementById('availableToday').textContent = '0';
        document.getElementById('availableLocations').textContent = '0';

        // Inisialisasi filter
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const bloodTypeFilter = document.getElementById('bloodTypeFilter');
        const cityFilter = document.getElementById('cityFilter');
        const availabilityFilter = document.getElementById('availabilityFilter');
        const resetFilter = document.getElementById('resetFilter');
        const prevPageBtn = document.getElementById('prevPage');
        const nextPageBtn = document.getElementById('nextPage');
        const pageInfo = document.getElementById('pageInfo');

        // Contoh data donor (kosong)
        const donorData = [];
        
        // Fungsi untuk render data donor
        function renderDonorList(data) {
            const donorList = document.getElementById('donorList');
            const noDonorData = document.getElementById('noDonorData');
            
            donorList.innerHTML = '';
            
            if (data.length === 0) {
                noDonorData.style.display = 'block';
                donorList.style.display = 'none';
                return;
            }
            
            noDonorData.style.display = 'none';
            donorList.style.display = 'block';
            
            data.forEach(donor => {
                const donorCard = document.createElement('div');
                donorCard.className = 'donor-card';
                
                // Buat inisial dari nama
                const nameParts = donor.name.split(' ');
                const initials = nameParts.map(part => part[0]).join('').toUpperCase();
                
                donorCard.innerHTML = `
                    <div class="donor-avatar">${initials}</div>
                    <div class="donor-info">
                        <h3 class="donor-name">${donor.name}</h3>
                        <div class="donor-meta">
                            <span><i class="fas fa-tint"></i> Gol. ${donor.bloodType}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${donor.city}</span>
                            <span><i class="fas fa-clock"></i> Terakhir donor: ${donor.lastDonation}</span>
                        </div>
                    </div>
                    <div class="donor-status ${donor.available ? 'status-available' : 'status-not-available'}">
                        ${donor.available ? 'Siap Donor' : 'Baru Donor'}
                    </div>
                    <div class="donor-action">
                        <button class="btn btn-small">Hubungi</button>
                    </div>
                `;
                
                donorList.appendChild(donorCard);
            });
        }
        
        // Fungsi untuk menerapkan filter
        function applyFilters() {
            const searchTerm = searchInput.value.toLowerCase();
            const bloodType = bloodTypeFilter.value;
            const city = cityFilter.value;
            const availability = availabilityFilter.value;
            
            // Dalam implementasi nyata, ini akan memfilter data dari server/database
            console.log('Filter diterapkan:', {
                searchTerm,
                bloodType,
                city,
                availability
            });
            
            // Render data kosong (karena contoh data kosong)
            renderDonorList([]);
        }
        
        // Event listeners
        searchBtn.addEventListener('click', applyFilters);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') applyFilters();
        });
        
        bloodTypeFilter.addEventListener('change', applyFilters);
        cityFilter.addEventListener('change', applyFilters);
        availabilityFilter.addEventListener('change', applyFilters);
        
        resetFilter.addEventListener('click', function() {
            searchInput.value = '';
            bloodTypeFilter.value = 'semua';
            cityFilter.value = 'semua';
            availabilityFilter.value = 'semua';
            applyFilters();
        });
        
        // Pagination
        let currentPage = 1;
        const itemsPerPage = 10;
        
        function updatePagination() {
            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = true; // Disable karena data kosong
            pageInfo.textContent = `Halaman ${currentPage} dari 1`;
        }
        
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
                // Load data untuk halaman ini
            }
        });
        
        nextPageBtn.addEventListener('click', function() {
            currentPage++;
            updatePagination();
            // Load data untuk halaman ini
        });
        
        // Logout functionality
        document.getElementById('logoutBtn').addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
        
        // Render data awal (kosong)
        renderDonorList(donorData);
        updatePagination();
    }
});