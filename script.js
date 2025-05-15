// script.js
// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
link.addEventListener("click", () => {
    navLinks.classList.remove("active");
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
    if (!statsAnimated[3]) {
    animateCounter(document.getElementById("emergencyCount"), 765);
    statsAnimated[3] = true;
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

registerBtns.forEach((btn) => {
btn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("registerModal").style.display = "flex";
});
});

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