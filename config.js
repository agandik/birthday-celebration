/**
 * ============================================================
 *  KONFIGURASI WEBSITE ULANG TAHUN
 *  Edit file ini saja — seluruh website akan ikut berubah.
 *  (Nilai di bawah masih PLACEHOLDER, silakan ganti.)
 * ============================================================
 */
window.BIRTHDAY_CONFIG = {
  // Nama yang dibentuk dari partikel bintang (pendek lebih bagus, maks ±10 huruf)
  name: 'Sayang',

  // Tanggal lahir format YYYY-MM-DD (dipakai untuk umur & "Life in Numbers")
  birthDate: '2003-10-14',

  // Opsional: paksa angka umur tertentu (null = dihitung otomatis dari birthDate)
  ageOverride: null,

  // Host & Pengirim
  senderName: 'Orang yang paling menyayangimu',

  // Kalimat yang diketik satu per satu saat layar masih gelap
  openingLines: [
    'Psst…',
    'Kok gelap ya di sini?',
    'Sepertinya ada yang spesial hari ini…',
    'Coba nyalakan lampunya deh.'
  ],

  heroMessage:
    'Hari ini dunia merayakan satu hal yang paling aku syukuri: kamu lahir. ' +
    'Malam ini semuanya aku siapkan khusus untukmu — pelan-pelan ya, nikmati setiap kejutannya.',

  // Pesan setelah lilin berhasil ditiup
  wishMessage:
    'Semoga semua doa yang barusan kamu ucapkan dalam hati dikabulkan satu per satu. ' +
    'Apa pun impianmu di usia yang baru ini, aku akan selalu ada di sampingmu untuk mewujudkannya bersama.',

  // Timeline kenangan (ganti dengan foto asli kalian di folder assets/images/)
  memories: [
    {
      image: 'assets/images/memory_1.jpg',
      date: 'Desember 2023',
      title: 'Kencan Kafe & Kucing Mungil',
      caption: 'Hari yang sederhana, tapi tawamu bikin semuanya terasa hangat. Di sini aku sadar: aku mau lebih banyak hari seperti ini, bersamamu.'
    },
    {
      image: 'assets/images/memory_2.jpg',
      date: 'Juni 2024',
      title: 'Senja yang Indah Bersamamu',
      caption: 'Cahaya keemasan sore itu indah, tapi jujur… aku lebih banyak melihat kamu daripada senjanya.'
    },
    {
      image: 'assets/images/memory_3.jpg',
      date: 'Oktober 2025',
      title: 'Piknik Ulang Tahun',
      caption: 'Kue stroberi, rumput hijau, dan kamu yang tertawa lepas. Ulang tahun terbaik — sampai hari ini mengalahkannya.'
    }
  ],

  // Kartu "Love Notes" yang bisa dibuka satu per satu
  loveNotes: [
    { icon: 'icon-sparkle', title: 'Senyummu', body: 'Senyummu selalu punya cara ajaib untuk mencerahkan hari-hariku yang paling melelahkan.' },
    { icon: 'icon-heart', title: 'Hatimu yang Lembut', body: 'Caramu memperlakukan orang lain — dan menyayangi hewan kecil — selalu membuatku kagum.' },
    { icon: 'icon-cat-head', title: 'Tingkah Gemeccmu', body: 'Saat kamu manja atau cemberut imut, kamu persis seperti anak kucing yang minta dipeluk.' },
    { icon: 'icon-sparkle', title: 'Tempatku Pulang', body: 'Bersamamu aku bisa cerita apa saja tanpa takut dihakimi. Kamu adalah rumah.' },
    { icon: 'icon-sparkle', title: 'Obrolan Tengah Malam', body: 'Obrolan random kita sampai larut malam adalah bagian favoritku dari setiap hari.' },
    { icon: 'icon-heart', title: 'Masa Depan', body: 'Setiap kali membayangkan masa depan, selalu ada kamu di dalamnya.' }
  ],

  letter: {
    salutation: 'Hai Sayangku,',
    paragraphs: [
      'Selamat bertambah usia, manusia paling berharga yang pernah hadir dalam hidupku. Hari ini bukan sekadar pergantian angka, tapi perayaan atas kehadiranmu yang membawa begitu banyak warna, kehangatan, dan tawa di setiap hariku.',
      'Terima kasih sudah menjadi dirimu apa adanya — yang tulus, yang hatinya begitu lembut, dan yang tingkahnya kadang menggemaskan seperti anak kucing kecil. Setiap momen bersamamu adalah kenangan yang selalu ingin kujaga baik-baik.',
      'Di usiamu yang baru ini, doaku sederhana: semoga langkahmu selalu diringankan, hatimu selalu damai, kesehatanmu selalu terjaga, dan impian-impian hebat yang sering kamu ceritakan perlahan menjadi kenyataan.',
      'Jangan pernah ragu melangkah, karena di belakangmu, di sampingmu, di mana pun kamu berada — akan selalu ada aku yang bangga dan siap mendukungmu sepenuh hati.'
    ],
    closing: 'I love you more than all the stars in the sky — and all the purrs in the world.',
    signature: 'Dari orang yang paling menyayangimu'
  }
};
