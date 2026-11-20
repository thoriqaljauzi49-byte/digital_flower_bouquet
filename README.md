# Digital Flower Bouquet

Aplikasi buket bunga digital berbasis Flask. Ilustrasi buket dibentuk langsung dari karakter teks/ASCII dan simbol Unicode, lalu dianimasikan dengan JavaScript. Tampilan responsif untuk browser HP dan desktop.

## Menjalankan di komputer

1. Pastikan Python 3.10 atau lebih baru sudah terpasang.
2. Buka terminal di folder proyek.
3. Buat virtual environment (opsional tetapi disarankan):

   ```bash
   python -m venv .venv
   ```

4. Aktifkan:
   - Windows: `.venv\Scripts\activate`
   - macOS/Linux: `source .venv/bin/activate`

5. Instal dependensi:

   ```bash
   pip install -r requirements.txt
   ```

6. Jalankan:

   ```bash
   python app.py
   ```

7. Buka `http://127.0.0.1:5000` di browser.

## Menjalankan dari HP

Cara termudah adalah deploy ke hosting agar mendapatkan URL publik. Jika server dijalankan di komputer sendiri, HP dan komputer harus berada pada Wi-Fi yang sama; buka alamat IP lokal komputer dengan port `5000`. Jangan membuka port ke internet tanpa memahami keamanan jaringan.

## Deploy ke Render

1. Unggah folder proyek ini ke repository GitHub.
2. Masuk ke Render dan pilih **New > Web Service**.
3. Hubungkan repository.
4. Render akan membaca `render.yaml`, atau isi manual:
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app`
5. Deploy. Setelah selesai, Render akan memberikan URL HTTPS yang bisa dibuka di HP.

## Kustomisasi pesan

Buka `templates/index.html`, lalu ubah teks di dalam elemen `id="personalMessage"`.

## Catatan

- Buket dibentuk dari karakter teks dan simbol, bukan foto bunga.
- Font DM Mono dari Google Fonts digunakan untuk menjaga kerapian karakter; jika tidak ada koneksi internet, browser akan memakai font monospace lokal.
- Musik tidak disertakan agar aplikasi tetap ringan dan tidak memutar audio tanpa tindakan pengguna.
