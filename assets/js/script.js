

/*-----------------------------------*\
 * #RESPONSIVE NAVBAR
\*-----------------------------------*/

// Memilih elemen-elemen DOM yang diperlukan
// Menggunakan satu querySelector untuk mengambil elemen container
const container = document.querySelector('body');

// Menggunakan delegasi event untuk menangani klik pada elemen-elemen navigasi
container.addEventListener('click', (event) => {
  const target = event.target;
  
  if (target.matches('[data-nav-open-btn], [data-nav-close-btn], [data-overlay], [data-nav-link]')) {
    document.querySelector('[data-navbar]').classList.toggle('active');
    document.querySelector('[data-overlay]').classList.toggle('active');
  }
});




/*-----------------------------------*\
 * #TOUR SEARCH
\*-----------------------------------*/

// Objek untuk menyimpan jumlah penumpang
let passengers = {adult: 1, child: 0, infant: 0};

// Fungsi untuk membuka modal pemilihan penumpang
function openModal() {
    document.getElementById('passengerModal').style.display = 'block';
}

// Fungsi untuk menutup modal pemilihan penumpang dan memperbarui tampilan
function closeModal() {
    document.getElementById('passengerModal').style.display = 'none';
    updatePassengerDisplay();
}

// Fungsi untuk mengubah jumlah penumpang
function changePassenger(type, change) {
    passengers[type] = Math.max(0, passengers[type] + change);
    // Memastikan selalu ada minimal satu dewasa
    if (type === 'adult') passengers[type] = Math.max(1, passengers[type]);
    document.getElementById(type + 'Count').textContent = passengers[type];
}

// Fungsi untuk memperbarui tampilan jumlah penumpang di input field
function updatePassengerDisplay() {
    const display = `${passengers.adult} Dewasa, ${passengers.child} Anak, ${passengers.infant} Bayi`;
    document.getElementById('passengers').value = display;
}

// Event listener untuk pengiriman formulir
document.getElementById('tour-search-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah pengiriman formulir default
    calculatePrice(); // Menghitung dan menampilkan harga
});

// Fungsi untuk menghitung dan menampilkan total harga
function calculatePrice() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const checkinDate = new Date(document.getElementById('checkin').value);
    const checkoutDate = new Date(document.getElementById('checkout').value);

    // Menghitung jumlah malam
    const timeDiff = checkoutDate - checkinDate;
    const nightsStay = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const pricePerNight = 600000; // Harga dasar per malam dalam Rupiah
    const totalPassengers = passengers.adult + passengers.child;
    const totalPrice = nightsStay * totalPassengers * pricePerNight;

    // Menampilkan hasil
    document.getElementById('result').textContent = `Total harga dari ${from} ke ${to}: Rp ${totalPrice.toLocaleString('id-ID')} untuk ${nightsStay} malam dan ${totalPassengers} orang (${passengers.adult} Dewasa, ${passengers.child} Anak, ${passengers.infant} Bayi)`;
}

// Mengatur tanggal minimum untuk check-in dan check-out ke hari ini
const today = new Date().toISOString().split('T')[0];
document.getElementById('checkin').min = today;
document.getElementById('checkout').min = today;

// Memperbarui tanggal minimum check-out saat tanggal check-in berubah
document.getElementById('checkin').addEventListener('change', function() {
    document.getElementById('checkout').min = this.value;
});



/*-----------------------------------*\
 * #PESAN SEKARANG PACKAGE (index.html)
\*-----------------------------------*/
document.addEventListener('click', function(event) {
  if (event.target.matches('.btn.btn-secondary')) {
    const packageTitle = event.target.closest('.package-card').querySelector('.card-title').textContent;
    Swal.fire(`Anda memilih paket: ${packageTitle}`);
  }
});


