# Web PERHAPI Kalsel

Situs profil dan kegiatan PERHAPI Kalimantan Selatan. HTML + CSS + JS statis, tanpa build.

```
index.html        Beranda (hero, tentang, berita, agenda, program, form keanggotaan, mitra, footer)
struktur.html     Struktur pengurus (template kosong)
assets/
  style.css       Gaya bersama
  main.js         Interaksi bersama (menu, filter berita, tab agenda, validasi form)
  logo-perhapi.png, favicon.png
  hero.jpg, aerial.jpg, forest.jpg, conveyor.jpg   Foto tambang dari Unsplash (sementara)
  partners/       Logo mitra
```

## Jalankan lokal
Buka `index.html` di browser, atau `python3 -m http.server` lalu buka http://localhost:8000.

## GitHub Pages
Settings → Pages → Deploy from a branch → `main` / `(root)`. Semua path relatif, jadi aman di subfolder `/nama-repo/`.

## Yang masih placeholder
- Email sekretariat (footer), periode pengurus, dan seluruh isi `struktur.html`
- Foto berita masih foto stok; ganti dengan dokumentasi kegiatan asli
- Logo PT Adaro Indonesia dan PT Putra Perkasa Abadi (sementara teks)
- Form keanggotaan masih simulasi (belum mengirim email). Versi hosting cPanel: PHP + SMTP, data juga disimpan ke database
- Izin pemakaian logo mitra perlu dikonfirmasi ke masing-masing pihak
