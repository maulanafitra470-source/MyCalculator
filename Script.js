//  Jelaskan Kodingan ini apa?
//  memastikan bahwa kode JavaScript hanya dieksekusi setelah seluruh struktur HTML halaman web selesai dimuat dan diurai oleh browser. 
document.addEventListener('DOMContentLoaded', function () {

    //  Jelaskan Kodingan ini apa?
    /** mengambil (menyeleksi) elemen-elemen HTML penting dari web kalkulator dan menyimpannya dalam variabel agar dapat dimanipulasi oleh JavaScript.
    */
    const display = document.getElementById('display');
    const statusImage = document.getElementById('statusImage');
    const buttons = document.querySelectorAll('.btn-calc');

    //  Jelaskan Kodingan ini apa?
    //  menyimpan path atau URL gambar yang akan digunakan untuk menampilkan status operasi kalkulator.
    const imgNormal = 'https://placehold.co/400x100/374151/E5E7EB?text=Kalkulator';
    const imgSuccess = 'https://placehold.co/400x100/16A34A/FFFFFF?text=Sukses!';
    const imgError = 'https://placehold.co/400x100/DC2626/FFFFFF?text=Error!';

    /**
      Jelaskan Kodingan ini apa?
     */
    // mengubah gambar dan teks deskripsi status di bagian atas kalkulator berdasarkan hasil operasi.
    function changeImage(state) {
        if (state === 'success') {
            statusImage.src = imgSuccess;
            statusImage.alt = "Perhitungan Sukses";
        } else if (state === 'error') {
            statusImage.src = imgError;
            statusImage.alt = "Error Perhitungan";
        } else {
            //  Jelaskan Kodingan ini apa 
            statusImage.src = imgNormal;
            statusImage.alt = "Status Kalkulator";
        }
    }

    /**
      Jelaskan Kodingan ini apa?
     */
    // mengatur ulang (reset) tampilan kalkulator ke keadaan awal, yang dipicu ketika tombol 'C' (Clear) ditekan.
    function clearDisplay() {
        display.value = '';
        changeImage('normal'); // Memanggil function untuk merubah gambar
    }

    /**
      Jelaskan Kodingan ini apa? 
     */
    /**
      menghapus satu karakter terakhir yang ada pada layar tampilan kalkulator, 
      yang dipicu oleh tombol 'DEL' pada kalkulator.
     */
    function deleteLastChar() {
        display.value = display.value.slice(0, -1);
    } // Perbaikan: Kurung kurawal penutup fungsi yang hilang sudah ditambahkan.

    /**
      Jelaskan Kodingan ini apa? 
     */
    // menambahkan (append) nilai dari tombol yang baru diklik ke akhir konten yang sudah ada di layar tampilan kalkulator.
    function appendToDisplay(value) {
        display.value += value;
    }

    /**
      Jelaskan Kodingan ini apa? 
     */
    // deklarasi (permulaan) dari fungsi calculateResult() di JavaScript.
    function calculateResult() {

        //  Jelaskan Kodingan ini apa? 
        /**
        bagian dari fungsi calculateResult() dan berfungsi sebagai pengecekan awal untuk menangani kasus ketika pengguna menekan 
        tombol = (Sama Dengan) saat layar tampilan kalkulator kosong.
        */
        if (display.value === '') {
            changeImage('error');
            display.value = 'Kosong!';
            //  Jelaskan Kodingan ini apa? 
            /**
            menciptakan jeda waktu setelah status error/kosong ditampilkan, 
            lalu memastikan fungsi perhitungan berhenti tanpa mencoba memproses ekspresi yang tidak valid.
            */
            setTimeout(clearDisplay, 1500);
            return;
        }

        try {

            //  Jelaskan Kodingan ini apa?
            //  adalah inti dari proses perhitungan, yang bertugas untuk mengambil string ekspresi matematika dari layar dan menghitung hasilnya.
            let result = eval(display.value
                .replace(/%/g, '/100')
            );

            //  Jelaskan Kodingan ini apa?
            /**
            memeriksa validitas hasil perhitungan yang didapat dari fungsi eval() 
            dan menentukan apakah perhitungan tersebut Sukses atau harus diakhiri dengan Error. 
            */
            if (isFinite(result)) {
                display.value = result;
                changeImage('success');
            } else {
                throw new Error("Hasil tidak valid");
            }

            //  Jelaskan Kodingan ini apa?
            /**
            ini adalah bagian dari struktur try...catch dalam fungsi calculateResult(), 
            dan fungsinya adalah untuk menangani (mengelola) error yang terjadi selama proses perhitungan.
            */
        } catch (error) {
            console.error("Error kalkulasi:", error);
            display.value = 'Error';
            changeImage('error');
            setTimeout(clearDisplay, 1500);
        }
    }


    //  Jelaskan Kodingan ini apa?
    //  menambahkan fungsionalitas klik ke setiap tombol kalkulator dan mengambil nilai yang terkait dengan tombol yang diklik. 
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            //  Jelaskan Kodingan ini apa?
            //  memulai struktur kontrol aliran switch di JavaScript. 
            switch (value) {
                case 'C':
                    //  Jelaskan Kodingan ini apa?
                    /** bagian dari logika switch di JavaScript dan berfungsi untuk menjalankan aksi membersihkan (reset) 
                    tampilan kalkulator ketika tombol 'C' (Clear) ditekan. 
                    */
                    clearDisplay();
                    break;

                case 'DEL':
                    //  Jelaskan Kodingan ini apa?
                    /** bagian dari logika switch di JavaScript dan berfungsi untuk menjalankan aksi menghapus 
                    karakter terakhir dari tampilan ketika tombol 'DEL' atau 'Backspace' ditekan. 
                    */
                    deleteLastChar();
                    break;

                case '=':
                    //  Jelaskan Kodingan ini apa? 
                    /**
                    bagian dari logika switch di JavaScript dan berfungsi untuk menjalankan aksi 
                    perhitungan akhir ketika tombol '=' (Sama Dengan) ditekan.
                    */
                    calculateResult();
                    break;
                default:

                    //  Jelaskan Kodingan ini apa?
                    /**
                    memungkinkan pengguna untuk langsung mengetik input baru setelah melihat hasil perhitungan 
                    tanpa perlu menekan tombol 'C' secara manual, lalu menambahkan nilai tombol yang ditekan ke layar tampilan. 
                    */
                    if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                        clearDisplay();
                    }
                    appendToDisplay(value);
                    break;
            }
        });
    });

    //  Jelaskan Kodingan ini apa?
    /**
    berfungsi untuk membuat kalkulator merespons penekanan tombol pada keyboard fisik 
    (bukan tombol on-screen) dan memetakannya ke fungsi kalkulator yang sesuai.
    */
    document.addEventListener('keydown', (e) => {
        const key = e.key;

        if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
            if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                clearDisplay();
            }
            appendToDisplay(key);
            e.preventDefault();
        } else if (key === 'Enter' || key === '=') {
            calculateResult();
            e.preventDefault();
        } else if (key === 'Backspace') {
            deleteLastChar();
            e.preventDefault();
        } else if (key === 'Escape' || key.toLowerCase() === 'c') {
            clearDisplay();
            e.preventDefault();
        }
    });

});