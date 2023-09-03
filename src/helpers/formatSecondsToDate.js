const formatSecondsToDate = (timestamp) => {
  // Timestamp UNIX

  // Buat objek Date dari timestamp
  const date = new Date(timestamp * 1000); // Perlu mengalikan dengan 1000 karena JavaScript menggunakan milidetik

  // Dapatkan tanggal, bulan, dan tahun
  const tahun = date.getFullYear();
  const bulan = String(date.getMonth() + 1).padStart(2, "0"); // Tambahkan 1 karena bulan dimulai dari 0
  const hari = String(date.getDate()).padStart(2, "0");
  const jam = String(date.getHours()).padStart(2, "0");
  const menit = String(date.getMinutes()).padStart(2, "0");
  const detik = String(date.getSeconds()).padStart(2, "0");

  // Format tanggal dalam format YYYY-MM-DD HH:MM:SS
  const tanggalFormatted = `${tahun}/${bulan}/${hari} ${jam}:${menit}:${detik}`;

  return tanggalFormatted;
};
export default formatSecondsToDate;
