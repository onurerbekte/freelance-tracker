# Pages yayını / Pages deployment

Kurgusal demo proje / Fictional demo project.

## Türkçe
1. Kendi hesabında `freelance-tracker` adlı public repo oluştur.
2. Bu klasörde `git branch -M main` çalıştır.
3. `git remote add origin https://github.com/onurerbekte/freelance-tracker.git` çalıştır. Remote varsa önce `git remote -v` ile kontrol et.
4. Repo Settings → Pages → Source alanında **GitHub Actions** seç.
5. `git push -u origin main` çalıştır. `.github/workflows/pages.yml` test ve derlemeden sonra Pages'e yayınlar. İlk çalışmayı gerektiğinde Actions ekranından elle başlatabilirsin.
6. Beklenen adres: `https://onurerbekte.github.io/freelance-tracker/`. Bu adres henüz yayınlanmadı veya doğrulanmadı.

Vite base: `/freelance-tracker/`. Yerelde `npm run dev` sonrası `http://127.0.0.1:5173/freelance-tracker/` adresini kullan. Repo adı değişirse `vite.config.js` base değerini değiştir. Workflow ayrıca kişisel token gerektirmez; GitHub'ın kısa ömürlü çalışma yetkilerini kullanır.

## English
Create the public `freelance-tracker` repository yourself, rename the local branch to `main`, add the remote above, choose GitHub Actions as the Pages source, and push. The workflow tests, builds, and deploys without a stored personal token. Vite uses `/freelance-tracker/` as its base; use that path for local development too. The URL above is expected after deployment, not a verified live URL.
