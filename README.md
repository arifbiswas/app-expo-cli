# 🚀 app-expo-cli

**App Expo CLI** is a command-line tool that sets up a standard, production-ready folder structure (architecture) for your Expo project automatically. No more creating the same folders or wiring up Redux by hand for every new app.

---

## ✨ Features

- **Standard Architecture:** After the project is created, it organizes `hooks`, `redux`, `utils`, `components` and more inside a `src/` folder.
- **Works with any package manager:** Automatically uses the package manager you ran it with — **npm**, **pnpm**, **yarn** or **bun**.
- **Interactive Setup:** Uses Clack prompts to ask whether you want **Bottom Tabs** or **Drawer** navigation.
- **Built-in UI Library:** Downloads the latest `lib` folder (buttons, inputs, cards, modals, loaders and more) from GitHub into `src/lib`.
- **Components Demo Screen:** After setup, the app opens a demo screen that shows how to use the ready-made components.
- **Redux Ready:** Installs and configures `@reduxjs/toolkit` and `react-redux` automatically.
- **Pre-built Screens:** Templates for `auth`, `settings`, `modals` and `common` screens are set up for you.
- **Tailwind Ready:** Copies a pre-configured `tailwind.config.js` to the project root.

---

## 📦 Installation & Usage

### Create a new project (recommended)

Use the runner of your favorite package manager:

```bash
npx app-expo-cli my-awesome-app
```

```bash
pnpm dlx app-expo-cli my-awesome-app
```

```bash
yarn dlx app-expo-cli my-awesome-app
```

```bash
bunx app-expo-cli my-awesome-app
```

The CLI detects which one you used and uses the same package manager to create the Expo app and install dependencies.

### Set up in the current folder

Already created and opened an empty folder? Pass `.` instead of a project name:

```bash
mkdir my-awesome-app && cd my-awesome-app
```

```bash
npx app-expo-cli .
```

The folder name is used as the project name, so it must follow the [project name rules](#project-name-rules). The folder must be empty (only files like `.git`, `.gitignore`, `.DS_Store`, `.vscode`, `.idea` or `LICENSE` are allowed).

### Or install globally

```bash
npm install -g app-expo-cli
```

```bash
app-expo-cli my-awesome-app
```

When run from a global install, npm is used by default (it always ships with Node). You can pick another one with a flag (see below).

### Options

| Option | Description |
| --- | --- |
| `.` (instead of a name) | Set up the project in the current folder |
| `-v`, `--version` | Show the version number |
| `-u`, `--update` | Check for updates |
| `-h`, `--help` | Show the help guide |
| `--use-npm` / `--use-pnpm` / `--use-yarn` / `--use-bun` | Force a specific package manager (default: auto-detect) |

Example:

```bash
npx app-expo-cli my-awesome-app --use-pnpm
```

### Project name rules

Use only lowercase letters, numbers, hyphens (`-`) and underscores (`_`). For example: `my-new-app` or `expo_project_1`.

---

## 🧩 After Setup

```bash
cd my-awesome-app
```

(Skip `cd` if you used `.`.)

```bash
npm run start
```

(Use `pnpm start`, `yarn start` or `bun start` if you created the project with that package manager.)

When the app opens, the splash screen takes you to a **components demo** (`src/app/demo.tsx`) that shows buttons, inputs, checkbox, card, empty state and navigation examples.

When you are ready to build your own app:

1. In `src/app/index.tsx`, change `router.replace("/demo")` to `router.replace("/auth")`.
2. Delete `src/app/demo.tsx` and its `<Stack.Screen name="demo" />` line in `src/app/_layout.tsx`.

---

## 📁 Project Structure (Architecture)

Your project will have a clean, professional structure. Here is an example:

```
my-awesome-app/
├── src/
│   ├── app/                 # Expo Router (all screens)
│   │   ├── home/(tabs)/     # Bottom Tabs layout (optional)
│   │   ├── home/(drawer)/   # Drawer navigation (optional)
│   │   ├── auth/            # Login, Register, Forgot Password
│   │   ├── settings/        # About Us, Privacy Policy, Terms
│   │   ├── modals/          # Reusable Confirmation & Success modals
│   │   ├── common/          # Image & URL handling screens
│   │   ├── _layout.tsx      # Root layout with state providers
│   │   ├── index.tsx        # Entry point (splash) screen
│   │   └── demo.tsx         # Components demo (remove when you start building)
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom hooks (image picker, etc.)
│   ├── redux/               # Store, API slices and interfaces
│   │   ├── api-config/      # RTK Query base API
│   │   ├── api-slices/      # Auth & other feature slices
│   │   ├── interface/       # TypeScript types & interfaces
│   │   └── store.ts         # Main Redux store
│   ├── utils/               # Helper & utility functions
│   └── lib/                 # UI library synced from GitHub
├── tailwind.config.js       # Pre-configured Tailwind config
├── package.json             # Auto-installed dependencies
└── ... (other Expo files)
```

---

## 📚 Dependencies Auto-Installed

These packages are installed and configured with your project:

- **State Management:** `@reduxjs/toolkit` and `react-redux`
- **Networking:** `axios`
- **Storage:** `@react-native-async-storage/async-storage`
- **Graphics & UI:** `react-native-svg`, `react-native-render-html` and `react-native-webview`
- **Forms & Validation:** `formik` and `yup`
- **Features & Utilities:** `expo-image-picker` and `react-native-otp-entry`

---

## 🤝 Contributing

If you want to improve this template or add a new feature, please open a Pull Request.

- GitHub (CLI): https://github.com/arifbiswas/app-expo-cli
- GitHub (Library): https://github.com/arifbiswas/lib

---

## 👤 Author

**Arif Biswas**

- GitHub: https://github.com/arifbiswas
- NPM: https://www.npmjs.com/package/app-expo-cli

<!-- Website: https://arifbiswas.com -->

<!-- ### 🌐 Social Links

You can add more social links here, for example:

LinkedIn: https://linkedin.com/in/arifbiswas
Twitter (X): https://x.com/arifbiswas -->

---

© 2026 Arif Biswas. All rights reserved.
