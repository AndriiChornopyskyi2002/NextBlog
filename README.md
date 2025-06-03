# Firebase Blog App (Next.ts)

Це простий блог-додаток, створений на базі **Next.js App Router**, з використанням **Firebase Firestore** для збереження постів і **Redux Toolkit** для управління станом.

---

## ⚙️ Стек технологій

- **Next.js (App Router)**
- **Firebase Firestore**
- **Redux Toolkit**
- **Tailwind CSS**
- **Zod** (валідація форм)
- **SweetAlert2** (модальні повідомлення)
- **TypeScript**

## 🧩 Основні компоненти

- **HomePage**  
  Рендерить всі пости з Firestore.

- **CreatePostModal**  
  Модальне вікно для створення поста з валідацією через `zod`.

- **PostList**  
  Список усіх постів з можливістю переходу на детальну сторінку або видалення.

- **PostDetailPage**  
  Окрема сторінка для перегляду поста по `id`.

---

## 🔥 Firebase

Всі пости зберігаються в колекції `posts` Firestore.

Додаток використовує Firebase SDK для:
- Додавання поста
- Отримання списку постів
- Отримання одного поста
- Видалення поста

---

## 🚀 Інструкції по запуску

### Варто зауважити, що перед запуском у вас має бути налаштований файл ".env.local" з такою структурою:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=

npm i # встановити залежності проекту
npm run dev # запустити додаток в режимі розробника