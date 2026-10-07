# Freelance Desk — React iş takibi / React project tracker

## Türkçe

Kendi freelance fırsatlarını ve işlerini takip etmek için iki dilli, mobil uyumlu bir uygulama. Gerçek React kullanır. Herhangi bir platforma bağlanmaz, teklif veya başvuru göndermez. İlk açılışta liste boştur; örnek müşteriler ve gelirler uydurulmaz.

### 10 satırlık özet
1. React ile freelance iş takip uygulaması yaptık.
2. Vite ile geliştirme sunucusu ve üretim derlemesi hazırladık.
3. JSX ile arayüzü bileşenler halinde yazdık.
4. `useState` ile kayıt, form, arama, filtre ve dil durumunu tuttuk.
5. Proje adı, müşteri ve TL teklif tutarıyla kayıt ekledik.
6. Fırsat, devam ediyor ve tamamlandı durumları ekledik.
7. Arama ve durum filtresini birlikte çalıştırdık.
8. `localStorage` ile kayıtları sayfa yenilemelerinde koruduk.
9. Türkçe/İngilizce arayüz ve mobil yerleşim oluşturduk.
10. Veri kuralları için beş test, üretim derlemesi ve Git takibi hazırladık.

### Bilgisayarında çalıştırma — adım adım
1. Node.js 24 LTS ve npm kurulu olsun. Kontrol: `node --version` ve `npm --version`.
2. Bu klasörü Dosya Gezgini'nde aç. Adres çubuğuna `powershell` yazıp Enter'a bas.
3. Terminalde `npm ci` çalıştır. Paketler `package-lock.json` sürümleriyle kurulur; ilk kurulumda internet gerekir.
4. `npm run dev` çalıştır.
5. Terminaldeki Local adresini tarayıcıda aç; genellikle `http://127.0.0.1:5173`.
6. Bir proje adı, müşteri ve teklif tutarı girip “İşi ekle” düğmesine bas.
7. İş kartından durumu değiştir; aramayı ve durum filtresini dene.
8. EN ile İngilizceye geç. Sayfayı yenile: iş kayıtları kalır, dil Türkçeye döner.
9. Sil düğmesi ardından “Silmeyi onayla” ile kaydı sil; “Vazgeç” silmez.
10. Durdurmak için terminalde Ctrl+C. Kontroller: `npm test`; üretim çıktısı: `npm run build`; çıktıyı sunmak: `npm run preview`.

`dist/index.html` dosyasına çift tıklamak React üretim çıktısını çalıştırmanın desteklenen yolu değildir; HTTP sunucusu kullan. Port değişirse farklı bir tarayıcı kayıt alanı oluşur. Uygulamayı aynı adreste kullan.

### Kodun ana kısımları — basit açıklama
- `src/main.jsx`: `App` ana ekranı, `JobForm` yeni iş formunu, `JobCard` tek iş kartını oluşturur. Bileşen, tekrar kullanılabilen bir arayüz parçasıdır. Props, ana bileşenden çocuğa gönderilen veridir. State değişince React ekranı yeniden hesaplar.
- `useState`: Kullanıcının girdiğini ve listedeki işleri hatırlar. `setJobs` doğrudan eski diziyi değiştirmek yerine yeni bir dizi alır.
- `useEffect`: Dil değiştiğinde HTML'nin dil niteliğini günceller. Böylece yardımcı teknolojiler sayfanın dilini bilir.
- `src/model.js`: Kayıtları doğrular, form değerlerini dönüştürür, arama yapar ve toplamları hesaplar. Kaydetme/okuma hatalarını yakalar.
- `src/copy.js`: Aynı arayüzün Türkçe ve İngilizce metinlerini tutar. Kullanıcının yazdığı proje/müşteri metinleri otomatik çevrilmez.
- `src/styles.css`: Grid, esnek sütunlar ve media query ile dar ekrana uyum sağlar.
- `src/model.test.js`: Boş/negatif tutarlar, Türkçe arama, tamamlanan teklif toplamı, kayıt döngüsü ve bozuk/engellenmiş depolama davranışını kontrol eder.
- `package.json`: Komutları ve paket sürümlerini tanımlar. `package-lock.json`, tekrar kurulum için paket sürümlerini kilitler.

### Mülakat / müşteri görüşmesi — 5 soru ve cevap
1. **React burada ne sağlıyor?** İş listesi, form ve kartları bileşenlere ayırır; state değişince ilgili arayüzü yeni veriye göre günceller.
2. **Veriler nerede tutuluyor?** Bu tarayıcının bu site adresine ait `localStorage` alanında. Sunucu/veritabanı yok; başka cihazda görünmez ve tarayıcı verisi silinirse kaybolur.
3. **Tamamlanan tutar gerçek gelir mi?** Hayır. Tamamlandı durumundaki kayıtların teklif tutarları toplamıdır; ödeme takibi yapılmıyor.
4. **Giriş ve ekip kullanımı eklenebilir mi?** Ayrı bir backend, kimlik doğrulama ve veritabanıyla eklenebilir. Bu sürüm tek tarayıcıda kişisel takip içindir.
5. **Projeyi nasıl geliştirdin ve test ettin?** Codex desteğiyle, yönlendirmem doğrultusunda geliştirildi. Veri mantığı için beş test ve üretim derlemesi yapıldı. Tarayıcı kontrollerinin durumu `VERIFICATION.md` dosyasında belirtilir; ticari müşteri işi olduğunu iddia etmiyorum.

### Sınırlar
Kayıtlar yedeklenmez ve cihazlar arasında eşitlenmez. Dil, arama ve filtre seçimi yenilemede sıfırlanır. Tek para birimi TL; tutarlar muhasebe veya faturalama sistemi değildir. İş adı/müşteri/tutar düzenleme yok; durum değiştirilebilir, kayıt silinip yeniden eklenebilir. Gerçek müşteri verisi için erişim kontrolü ve yedekleme ayrıca gerekir. Resmi erişilebilirlik sertifikası iddia edilmez.

## English

A bilingual, responsive React app for tracking personal freelance opportunities and projects. It does not connect to platforms or submit proposals/applications. It starts with an empty list and makes no invented client or income claims.

### 10-line summary
1. Built a freelance project tracker with React.
2. Used Vite for development and production builds.
3. Organized the JSX interface into components.
4. Used `useState` for projects, form fields, search, filters, and language.
5. Added entries with a project title, client, and TRY quote amount.
6. Supported opportunity, in-progress, and completed statuses.
7. Combined text search with status filtering.
8. Preserved entries across reloads with `localStorage`.
9. Added Turkish/English UI copy and responsive layouts.
10. Added five data tests, a production build, and Git version control.

### Run on your computer — step by step
1. Install Node.js 24 LTS with npm; check `node --version` and `npm --version`.
2. Open this project folder in File Explorer, type `powershell` in its address bar, and press Enter.
3. Run `npm ci`; the first installation requires internet access and uses the lockfile.
4. Run `npm run dev`.
5. Open the Local URL printed in the terminal, usually `http://127.0.0.1:5173`.
6. Enter a project title, client, and quote amount; click Add project.
7. Change an entry's status and try search and status filtering.
8. Switch to English with EN. Reload: entries persist; language returns to Turkish.
9. Use Delete, then Confirm deletion; Cancel keeps the entry.
10. Stop with Ctrl+C. Run checks with `npm test`; build with `npm run build`; serve the build with `npm run preview`.

Do not run the built app by double-clicking `dist/index.html`; use an HTTP server. Storage is tied to the site address, including its port. Use the same address to access the same saved entries.

### Main code explained
- `src/main.jsx`: `App` owns the screen, `JobForm` collects input, and `JobCard` renders a project. Components are reusable UI pieces; props pass data down; state changes trigger rendering.
- `useState`: Remembers values and entries. Updates create new arrays rather than mutating old state.
- `useEffect`: Updates the HTML language attribute when the UI language changes.
- `src/model.js`: Validates entries, converts inputs, filters projects, calculates totals, and handles storage failures.
- `src/copy.js`: Contains Turkish and English UI text. User-entered project/client names are not automatically translated.
- `src/styles.css`: Uses Grid and media queries for responsive layouts.
- `src/model.test.js`: Tests validation, Turkish search, completed quote totals, persistence, and malformed/blocked storage.
- `package.json` and `package-lock.json`: Define commands and reproducible dependency versions.

### Interview / client discussion — 5 questions and answers
1. **What does React provide?** Components organize the form and list, and state updates refresh the interface with current data.
2. **Where is data stored?** In this browser's `localStorage` for this site address. No server/database is involved; data is not shared across devices and can be lost when browser storage is cleared.
3. **Is the completed amount actual income?** No. It sums quote amounts for completed entries; payments are not tracked.
4. **Can login and team access be added?** Yes, with a separate backend, authentication, and database. This version is for personal use in one browser.
5. **How was it developed and tested?** With Codex assistance under my direction. Five data tests and a production build were run. Browser validation is documented in `VERIFICATION.md`; this is not claimed as commercial client work.

### Limitations
No backups or cross-device synchronization. Language, search, and filter reset on reload. TRY is the only currency; this is not an accounting or invoicing system. Title/client/amount editing is not included; status changes and deletion are available. Access control and backup would need additional work for client data. No formal accessibility certification is claimed.

## Kaynaklar / Sources
React state ve etkileşim rehberi / React state and interaction guide: https://react.dev/learn/adding-interactivity

Vite resmi kurulum ve derleme rehberi / Official Vite setup and build guide: https://vite.dev/guide/
