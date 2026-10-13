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
      'Happy birthday, sayangku! ❤️🎂',
      'Terima kasih sudah menjadi bagian terbaik di dalam hidupku. Terima kasih karena selalu hadir dan menemani aku, baik dalam susah maupun senang. Rasanya tulisan ini nggak akan pernah cukup untuk mengungkapkan semua rasa terima kasihku buat sayang.',
      'Aku bersyukur banget bisa punya seseorang sebaik sayang, dengan segala tingkah gemecc yang selalu berhasil bikin aku senyum. Semoga di usia yang baru ini, sayang selalu sehat, bahagia, dan semua hal baik yang diimpikan bisa terwujud satu per satu.',
      'No matter what life brings our way, I hope we’ll always be there for each other and continue growing together. I love you so much, my love. ❤️'
    ],
    closing: '“I love you more than all the stars in the sky and all the purrs in the world.” ✨🐾\nHappy birthday, my love. Forever and always, you have my heart. ❤️',
    signature: 'With all my love ❤️🐾'
  }
};
