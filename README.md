# 🚀 app-expo-cli

**App Expo CLI** হলো একটি শক্তিশালী কমান্ড-লাইন টুল যা আপনার এক্সপো (Expo) প্রজেক্টের জন্য একটি স্ট্যান্ডার্ড এবং প্রফেশনাল ফোল্ডার স্ট্রাকচার (Architecture) অটোমেটিক সেটআপ করে দেয়। এটি ব্যবহার করলে আপনাকে বারবার একই ফোল্ডার বা Redux সেটআপ ম্যানুয়ালি করতে হবে না।

---

## ✨ Features

- **Standard Architecture:** প্রজেক্ট তৈরি হওয়ার পর অটোমেটিক `src/` ফোল্ডারের ভেতরে `hooks`, `redux`, `utils`, `components` ইত্যাদি সাজিয়ে দেয়।
- **Interactive Setup:** Clack প্রম্পট ব্যবহার করে ইউজারকে জিজ্ঞেস করে সে **Tabs** বা **Drawer** নেভিগেশন চায় কি না।
- **External Lib Integration:** সরাসরি গিটহাব থেকে লেটেস্ট `lib` ফোল্ডার ক্লোন করার সুবিধা।
- **Redux Ready:** `@reduxjs/toolkit` এবং `react-redux` অটোমেটিক ইন্সটল এবং কনফিগার করে দেয়।
- **Pre-built Screens:** `auth`, `settings`, `modals`, এবং `common` স্ক্রিনগুলোর টেমপ্লেট অটোমেটিক সেটআপ হয়ে যায়।
- **Tailwind Ready:** `tailwind.config.js` ফাইলটি অটোমেটিক রুট ডিরেক্টরিতে কপি করে দেয়।

---

## 📦 Installation & Usage

সবচেয়ে ভালো অভিজ্ঞতার জন্য প্রথমে গ্লোবালি ইন্সটল করে নিন এবং তারপর কমান্ডটি রান করুন:

### ১. গ্লোবাল ইন্সটলেশন

```bash
npm install -g app-expo-cli
```

### ২. নতুন প্রজেক্ট তৈরি করা

app-expo-cli my-awesome-app
বিকল্প উপায় (npx দিয়ে)

```
npx app-expo-cli my-awesome-app
```

---

### 📁 Project Structure (Architecture)

এই CLI ব্যবহার করলে আপনার প্রজেক্টের স্ট্রাকচার হবে একদম ক্লিন এবং প্রফেশনাল। নিচে একটি ডেমো স্ট্রাকচার দেওয়া হলো:

```
my-awesome-app/
├── src/
│ ├── app/ # Expo Router (All Screens)
│ │ ├── (tabs)/ # Bottom Tabs Layout (Optional)
│ │ ├── (drawer)/ # Drawer Navigation (Optional)
│ │ ├── auth/ # Login, Register, Forgot Password
│ │ ├── settings/ # About Us, Privacy Policy, Terms
│ │ ├── modals/ # Reusable Confirmation & Success Modals
│ │ ├── common/ # Image & URL handling components
│ │ ├── \_layout.tsx # Root Layout with State Providers
│ │ └── index.tsx # Entry point Screen
│ ├── components/ # Reusable UI Components
│ ├── hooks/ # Custom Hooks (Location, Picker, etc.)
│ ├── redux/ # Store, API Slices, and Interfaces
│ │ ├── api-config/ # RTK Query Base API
│ │ ├── api-slices/ # Auth & Other Feature Slices
│ │ ├── interface/ # TypeScript Types & Interfaces
│ │ └── store.ts # Main Redux Store
│ ├── utils/ # Helper & Utility Functions
│ └── lib/ # Synced Library from GitHub (Optional)
├── tailwind.config.js # Pre-configured Tailwind Config
├── package.json # Auto-installed Dependencies
└── ... (other expo files)
```

### 📚 Dependencies Auto-Installed

আপনার প্রজেক্টের সাথে এই প্রয়োজনীয় প্যাকেজগুলো অটোমেটিক কনফিগার হয়ে যাবে:

**- State Management: @reduxjs/toolkit এবং react-redux**

**- Networking: axios**

**- Storage: @react-native-async-storage/async-storage**

**- Graphics & UI: react-native-svg, react-native-render-html, এবং react-native-webview**

**- Forms & Validation: formik এবং yup**

**- Features & Utilities: expo-image-picker ও react-native-otp-entry**

### 🤝 Contributing

আপনি যদি এই টেমপ্লেটে কোনো পরিবর্তন বা নতুন ফিচার যোগ করতে চান, তবে অবশ্যই একটি Pull Request ওপেন করবেন।

GitHub (CLI): https://github.com/arifbiswas/app-expo-cli

GitHub (Library): https://github.com/arifbiswas/lib

## 👤 Author

Arif Biswas

GitHub: https://github.com/arifbiswas

<!-- Website: https://arifbiswas.com -->

NPM: https://www.npmjs.com/package/app-expo-cli

### 🌐 Social Links

<!-- আপনি চাইলে এখানে আরও সোশ্যাল লিংক যোগ করতে পারেন:

LinkedIn

Twitter / X

Portfolio

Dev.to

Medium

উদাহরণ:

LinkedIn: https://linkedin.com/in/arifbiswas

Twitter (X): https://x.com/arifbiswas -->

© 2026 Arif Biswas. All rights reserved.
