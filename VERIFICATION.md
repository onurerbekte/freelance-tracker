# Doğrulama / Verification

## Türkçe
- `npm ci` için sürümleri sabitleyen `package-lock.json` oluşturuldu. İlk kurulumda npm 0 bilinen güvenlik açığı bildirdi; bu sonuç yalnızca o andaki denetimi ifade eder.
- `npm test`: 5 test geçti. Testler geçersiz girişleri, arama/filtre birleşimini, tamamlanan teklif toplamlarını, kayıt okuma/yazmayı ve bozuk/engellenmiş depolamayı kapsar.
- `npm run build`: Vite üretim derlemesi geçti; HTML/CSS/JavaScript çıktıları `dist/` klasöründe oluştu.
- Geliştirme sunucusu başladı; uygulama içi tarayıcı yerel adrese bağlanırken zaman aşımına uğradı. Gerçek tarayıcıda form, dil geçişi ve mobil görünüm kontrolü tamamlanmadı.
- Elle kontrol: yeni kayıt ekle; yenileyip kalıcılığı gör; tüm durumları seç; arama ve filtreyi birlikte kullan; silme onayından vazgeç; silmeyi onayla; boş ve negatif tutarları dene; TR/EN geçişini kontrol et.
- Görsel kontrol: 360, 768, 1280 piksel ekranlarda taşma olmadığını ve Tab ile tüm kontrollere erişildiğini kontrol et. CV HTML'nin A4 PDF çıktısı ayrıca görsel olarak doğrulanmalıdır.
- Proje kendi yerel Git deposunda takip edilir. Dışarıya yükleme veya yayınlama yapılmadı.

## English
- Created a dependency lockfile for reproducible `npm ci` installs. The initial npm audit reported 0 known vulnerabilities; this is a point-in-time result.
- `npm test`: 5 tests passed, covering invalid input, combined search/filtering, completed quote totals, storage roundtrips, and malformed/blocked storage.
- `npm run build`: Vite production build passed and produced HTML/CSS/JavaScript in `dist/`.
- The development server started, but the in-app browser timed out connecting to the local URL. Real-browser form, language switching, and mobile layout checks remain incomplete.
- Manual checklist: add an entry; reload for persistence; select each status; combine search/filtering; cancel and confirm deletion; try empty/negative amounts; switch TR/EN.
- Visual checklist: inspect widths of 360, 768, and 1280 pixels for overflow and keyboard access with Tab. A4 PDF output of the CV HTML also needs visual verification.
- This project is tracked in its own local Git repository. No upload or publication was performed.
