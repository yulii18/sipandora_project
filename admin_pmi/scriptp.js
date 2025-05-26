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

function displayDonorReportsInPage(reports) {
    const tbody = document.querySelector('#donorReportTable');
    if (!tbody) return;
    
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

// Modifikasi event listener yang ada
document.addEventListener('DOMContentLoaded', function() {
    const reportPeriodSelect = document.getElementById('reportPeriod');
    if (reportPeriodSelect) {
        // Tampilkan data awal (hari ini)
        const initialReports = filterDonorReports('today');
        displayDonorReportsInPage(initialReports);
        
        // Event listener untuk perubahan periode
        reportPeriodSelect.addEventListener('change', function() {
            const selectedPeriod = this.value;
            const filteredReports = filterDonorReports(selectedPeriod);
            displayDonorReportsInPage(filteredReports);
        });
    }
});


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

// Hapus event listener lama jika ada
const generateReportBtn = document.getElementById('generateReport');
const oldClickHandler = generateReportBtn.onclick;
if (oldClickHandler) {
    generateReportBtn.removeEventListener('click', oldClickHandler);
}

generateReportBtn.addEventListener('click', async function() {
    try {
        const selectedPeriod = document.getElementById('reportPeriod').value || 'all';
        const filteredReports = filterDonorReports(selectedPeriod);
        
        if (filteredReports.length === 0) {
            Swal.fire('Peringatan', 'Tidak ada data untuk ditampilkan', 'warning');
            return;
        }

        // Buat elemen div untuk PDF
        const element = document.createElement('div');
        element.style.fontFamily = 'Arial, sans-serif';
        element.style.padding = '20px';
        element.style.width = '800px'; // Lebar tetap
        element.style.maxWidth = '800px';
        
        // Judul
        const title = document.createElement('h1');
        title.textContent = 'Laporan Donor Darah';
        title.style.textAlign = 'center';
        title.style.color = '#d00';
        element.appendChild(title);
        
        // Periode
        const period = document.createElement('p');
        period.textContent = `Periode: ${document.getElementById('reportPeriod').options[document.getElementById('reportPeriod').selectedIndex].text}`;
        period.style.textAlign = 'center';
        element.appendChild(period);
        
        // Buat tabel
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';
        
        // Header tabel
        table.innerHTML = `
            <thead>
                <tr style="background-color: #f5f5f5;">
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">No</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Tanggal</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Nama Pendonor</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Gol. Darah</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Lokasi</th>
                </tr>
            </thead>
            <tbody>
                ${filteredReports.map((report, index) => `
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px;">${index + 1}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${report.date}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${report.name}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${report.bloodType}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${report.location}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        element.appendChild(table);
        
        // Footer
        const footer = document.createElement('div');
        footer.textContent = `Dicetak pada: ${new Date().toLocaleString('id-ID')}`;
        footer.style.textAlign = 'right';
        footer.style.marginTop = '20px';
        element.appendChild(footer);
        
        // Tambahkan ke body sementara
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'fixed';
        tempDiv.style.left = '-9999px';
        tempDiv.appendChild(element);
        document.body.appendChild(tempDiv);
        
        // Opsi html2pdf
        const opt = {
            margin: [20, 20, 20, 20],
            filename: `Laporan_Donor_${selectedPeriod}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                logging: true,
                scrollX: 0,
                scrollY: 0,
                windowWidth: element.scrollWidth
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
            },
            
        };
        
        // Tunggu render selesai
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Generate PDF
        await html2pdf().set(opt).from(element).save();
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        Swal.fire('Error', 'Gagal membuat PDF', 'error');
    } finally {
        // Bersihkan
        if (tempDiv) document.body.removeChild(tempDiv);
    }
});



// Pastikan event listener untuk viewDonorReport terpisah
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('viewDonorReport')?.addEventListener('click', function() {
        const donorReportModal = document.getElementById('donorReportModal');
        if (donorReportModal) {
            donorReportModal.style.display = 'block';
            const filteredReports = filterDonorReports('today');
            displayDonorReports(filteredReports);
        }
    });
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
});

// Data stok darah
const bloodStockData = {
    'A': { WB: 45, PRC: 30, TC: 20, WB_titip: 10, PRC_titip: 8, TC_titip: 7, karantina: 5 },
    'B': { WB: 30, PRC: 25, TC: 15, WB_titip: 8, PRC_titip: 5, TC_titip: 4, karantina: 3 },
    'AB': { WB: 15, PRC: 12, TC: 8, WB_titip: 5, PRC_titip: 3, TC_titip: 2, karantina: 2 },
    'O': { WB: 60, PRC: 45, TC: 30, WB_titip: 15, PRC_titip: 10, TC_titip: 8, karantina: 7 }
};

// Fungsi untuk memperbarui tabel stok darah
// Fungsi untuk memperbarui tabel stok darah
function updateBloodStockTable() {
    const tbody = document.querySelector('.blood-stock-table tbody');
    if (!tbody) return;

    // Update setiap baris data
    const bloodTypes = ['A', 'B', 'AB', 'O'];
    bloodTypes.forEach((bloodType, index) => {
        const stock = bloodStockData[bloodType];
        const row = tbody.children[index];
        
        if (row) {
            row.cells[1].textContent = stock.WB;
            row.cells[2].textContent = stock.PRC;
            row.cells[3].textContent = stock.TC;
            row.cells[4].textContent = stock.WB_titip;
            row.cells[5].textContent = stock.PRC_titip;
            row.cells[6].textContent = stock.TC_titip;
            row.cells[7].textContent = stock.karantina;
        }
    });

    // Update subtotal dan total
    updateSubtotalAndTotal(tbody);
}

// Fungsi untuk mengupdate subtotal dan total
function updateSubtotalAndTotal(tbody) {
    const subtotal = {
        WB: 0, PRC: 0, TC: 0,
        WB_titip: 0, PRC_titip: 0, TC_titip: 0,
        karantina: 0
    };

    Object.values(bloodStockData).forEach(stock => {
        subtotal.WB += stock.WB;
        subtotal.PRC += stock.PRC;
        subtotal.TC += stock.TC;
        subtotal.WB_titip += stock.WB_titip;
        subtotal.PRC_titip += stock.PRC_titip;
        subtotal.TC_titip += stock.TC_titip;
        subtotal.karantina += stock.karantina;
    });

    const subtotalRow = tbody.children[tbody.children.length - 2];
    if (subtotalRow) {
        subtotalRow.cells[1].textContent = subtotal.WB;
        subtotalRow.cells[2].textContent = subtotal.PRC;
        subtotalRow.cells[3].textContent = subtotal.TC;
        subtotalRow.cells[4].textContent = subtotal.WB_titip;
        subtotalRow.cells[5].textContent = subtotal.PRC_titip;
        subtotalRow.cells[6].textContent = subtotal.TC_titip;
        subtotalRow.cells[7].textContent = subtotal.karantina;
    }

    const totalRow = tbody.children[tbody.children.length - 1];
    if (totalRow) {
        const totalStok = subtotal.WB + subtotal.PRC + subtotal.TC;
        const totalTitip = subtotal.WB_titip + subtotal.PRC_titip + subtotal.TC_titip;
        totalRow.innerHTML = `
            <td>Total</td>
            <td colspan="3">${totalStok}</td>
            <td colspan="3">${totalTitip}</td>
            <td>${subtotal.karantina}</td>
        `;
    }
}

// Event listener untuk form penambahan stok
document.addEventListener('DOMContentLoaded', function() {
    const addStockForm = document.getElementById('addStockForm');
    
    if (addStockForm) {
        addStockForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log("Form submitted"); // Debugging
            
            const bloodType = document.getElementById('bloodType').value;
            const component = document.getElementById('bloodComponent').value;
            const quantity = parseInt(document.getElementById('quantity').value);
            const expiryDate = document.getElementById('expiryDate').value;

            // Validasi dasar
            if (!bloodType || !component || isNaN(quantity) || !expiryDate) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Mohon lengkapi semua field dengan benar',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }

            // Tampilkan konfirmasi
            Swal.fire({
                title: 'Konfirmasi',
                text: `Anda akan menambahkan ${quantity} kantong darah ${bloodType} (${component})?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Ya, Tambahkan',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Update data
                    if (!bloodStockData[bloodType]) {
                        bloodStockData[bloodType] = { WB: 0, PRC: 0, TC: 0 };
                    }
                    
                    bloodStockData[bloodType][component] += quantity;
                    
                    // Update tampilan
                    updateBloodStockTable();
                    
                    // Notifikasi sukses
                    Swal.fire({
                        title: 'Berhasil!',
                        text: `Stok darah telah ditambahkan`,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    
                    // Reset form
                    addStockForm.reset();
                    document.getElementById('expiryDate').value = '';
                }
            });
        });
    }
});
