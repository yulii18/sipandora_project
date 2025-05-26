document.getElementById('generateReport').addEventListener('click', function() {
    // Elemen yang akan dijadikan PDF (hanya konten laporan, tanpa sidebar/footer)
    const element = document.querySelector('.report-data');
    
    // Opsi konfigurasi PDF
    const opt = {
        margin: 10,
        filename: 'Laporan_Donor_Darah.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF
    html2pdf().set(opt).from(element).save();
});

// Highlight active menu item based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.sidebar-menu li a');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Form submission for adding blood stock
    document.getElementById('addStockForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
    });
});

// Initialize Charts
function initializeCharts() {
    // Donor Statistics Chart (Bar Chart)
    const donorStatsCtx = document.getElementById('donorStatsChart')?.getContext('2d');
    if (donorStatsCtx) {
        new Chart(donorStatsCtx, {
            type: 'bar',
            data: {
                labels: ['Total Pendonor', 'Bulan Ini', 'Hari Ini'],
                datasets: [{
                    label: 'Jumlah Pendonor',
                    data: [1245, 156, 1],
                    backgroundColor: [
                        'rgb(255, 0, 21)',
                        'rgb(255, 0, 21)',
                        'rgb(255, 0, 21)'
                    ],
                    borderColor: [
                        'rgba(230, 57, 70, 1)',
                        'rgba(230, 57, 70, 1)',
                        'rgba(230, 57, 70, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Blood Stock Chart (Pie Chart)
    const bloodStockCtx = document.getElementById('bloodStockChart')?.getContext('2d');
    if (bloodStockCtx) {
        new Chart(bloodStockCtx, {
            type: 'pie',
            data: {
                labels: ['A', 'B', 'AB', 'O'],
                datasets: [{
                    data: [120, 85, 45, 150],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.7)',
                        'rgba(0, 153, 255, 0.7)',
                        'rgba(248, 178, 0, 0.7)',
                        'rgba(0, 55, 255, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 0, 0, 0.7)',
                        'rgba(0, 153, 255, 0.7)',
                        'rgba(248, 178, 0, 0.7)',
                        'rgba(0, 55, 255, 0.7)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    
    // Add event listener for view buttons
    document.getElementById('viewDonorReport')?.addEventListener('click', function() {
        document.getElementById('donorReportModal').style.display = 'block';
    });
    
    document.getElementById('manageBloodStock')?.addEventListener('click', function() {
        document.getElementById('bloodStockModal').style.display = 'block';
    });
    
    document.getElementById('viewEmergencyCases')?.addEventListener('click', function() {
        document.getElementById('emergencyCasesModal').style.display = 'block';
    });
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});

// Data contoh laporan donor
const donorReports = [
    { date: '26/05/2025', name: 'Budi Santoso', bloodType: 'A', location: 'UTD. PMI Kartini' },
    { date: '26/05/2025', name: 'Ani Wijaya', bloodType: 'B', location: 'UTD. PMI Kartini' },
    { date: '26/05/2025', name: 'Citra Dewi', bloodType: 'O', location: 'RSUD Undata' },
    { date: '26/05/2025', name: 'Dodi Pratama', bloodType: 'AB', location: 'RSUD Undata' },
    { date: '26/05/2025', name: 'Eka Sari', bloodType: 'B', location: 'UTD. PMI Kartini' },,
    { date: '26/05/2025', name: 'Ahmad Jayadi', bloodType: 'B', location: 'UTD. PMI Kartini' },
    { date: '26/05/2025', name: 'Algis Jawa', bloodType: 'B', location: 'UTD. PMI Kartini' },
    { date: '25/05/2025', name: 'Nabil Syaputra', bloodType: 'O', location: 'UTD. PMI Kartini' },
    { date: '06/05/2025', name: 'Nabil Mujahid', bloodType: 'O', location: 'UTD. PMI Kartini' },
    { date: '10/05/2025', name: 'Rayhan Dotutinggi', bloodType: 'O', location: 'UTD. PMI Kartini' },
    { date: '16/05/2025', name: 'Fajar Nugraha', bloodType: 'O', location: 'UTD. PMI Kartini' }
];

function filterDonorReports(period) {
    const today = new Date();
    const currentDate = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    return donorReports.filter(report => {
        const [day, month, year] = report.date.split('/').map(Number);
        const reportDate = new Date(year, month - 1, day);
        
        switch(period) {
            case 'today':
                return (
                    day === currentDate &&
                    month - 1 === currentMonth &&
                    year === currentYear
                );
            case 'week':
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                return reportDate >= oneWeekAgo;
            case 'month':
                return (
                    month - 1 === currentMonth &&
                    year === currentYear
                );
            case 'year':
                return year === currentYear;
            default:
                return true;
        }
    });
}

function displayDonorReports(reports) {
    const tbody = document.querySelector('#donorReportModal table tbody');
    tbody.innerHTML = '';
    
    reports.forEach(report => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${report.date}</td>
            <td>${report.name}</td>
            <td>${report.bloodType}</td>
            <td>${report.location}</td>
        `;
        tbody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi modal
    const donorReportModal = document.getElementById('donorReportModal');
    const reportPeriodSelect = document.getElementById('reportPeriod');
    
    // Event listener untuk perubahan filter
    reportPeriodSelect.addEventListener('change', function() {
        const selectedPeriod = this.value;
        const filteredReports = filterDonorReports(selectedPeriod);
        displayDonorReports(filteredReports);
    });
    
    // Saat modal dibuka, tampilkan data default (hari ini)
    document.getElementById('viewDonorReport').addEventListener('click', function() {
        donorReportModal.style.display = 'block';
        const filteredReports = filterDonorReports('today');
        displayDonorReports(filteredReports);
    });
    
    // Tutup modal
    document.querySelector('#donorReportModal .close-modal').addEventListener('click', function() {
        donorReportModal.style.display = 'none';
    });
});

console.log("Script loaded"); 
console.log("Donor reports:", donorReports);

