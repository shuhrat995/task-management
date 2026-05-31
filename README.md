# 🚀 Full-Stack Task Management & Crypto Dashboard

Next.js (App Router) imkoniyatlaridan foydalangan holda yaratilgan Full-Stack vazifalar boshqaruvi (Kanban doskasi) va Kripto ma'lumotlar platformasi. Loyiha ham chiroyli frontend vizualiga, ham ichki API arxitekturasiga ega.

---

## ✨ Loyihada Nimalar Bor? (Features)

### 1. 📊 Kripto Dashboard
* Real vaqtda kriptovalyutalar ma'lumotlarini kuzatish.
* Dinamik routlar orqali har bir koin uchun alohida batafsil ma'lumotlar sahifasi (`/crypto/[id]`).

### 2. 📋 3 Ustunli Kanban Doskasi (`/tasks`)
* **Vazifa Qo'shish:** Input orqali yangi topshiriqlarni real vaqtda ro'yxatga qo'shish.
* **Zanjirli Mantiq (Move Logic):** Vazifalarni bir marta bosish orqali ustunlararo tartib bilan aylantirish:
  * `Kutilmoqda (Todo)` ➡️ `Bajarilmoqda (In Progress)` ➡️ `Bajarildi (Done)` ➡️ `Kutilmoqda (Todo)`
* **Responsive Grid:** Mobil qurilmalar va monitorlar uchun to'liq moslashuvchan (Mobile-first) dizayn.

### 3. ⚙️ Ichki Full-Stack API (Backend)
* `src/app/api/tasks/route.ts` fayli orqali backend to'liq Next.js ichida hal qilingan.
* **GET** — Vazifalar ro'yxatini serverdan olish.
* **POST** — Yangi vazifani server xotirasiga qo'shish.
* **PUT** — Vazifa holatini (status) serverda yangilash.

---

## 🛠️ Texnologiyalar Tizimi (Tech Stack)

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Library:** React.js (`useState`, `useEffect`)
* **Styling:** Tailwind CSS (Dark Mode dizayn)

---

## 🚀 Loyihani Kompyuterda Ishga Tushirish

1. **Repozitoriyani yuklab oling:**
   ```bash
   git clone [https://github.com/shuhrat995/task-management.git](https://github.com/shuhrat995/task-management.git)
   cd cod
