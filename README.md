# Chatify - Real-Time Web Chat Application 💬

![Chatify Banner](https://img.shields.io/badge/Status-Live-success) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB) ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=flat&logo=firebase) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)

A fully functional, real-time chat application inspired by the clean aesthetics of WhatsApp Web. Built with modern web technologies, Chatify allows users to authenticate seamlessly via Google, search for other users, and engage in real-time 1-on-1 conversations.

## ✨ Features

- **Google Authentication:** One-click secure sign-in using Firebase Auth.
- **Real-Time Messaging:** Instant message delivery and UI updates powered by Firestore real-time listeners (`onSnapshot`).
- **Live User Status:** See who is currently online or offline.
- **User Discovery:** Search for registered users by name or email to initiate new conversations.
- **WhatsApp-Inspired UI:** A premium, responsive interface featuring dark mode aesthetics, intuitive message bubbles, and smooth micro-animations.
- **Auto-Scrolling:** The chat window intelligently scrolls to the latest message as the conversation grows.
- **Continuous Deployment (CI/CD):** Fully automated deployment pipeline using GitHub Actions connected to Firebase Hosting.

## 🛠️ Tech Stack

- **Frontend Framework:** [React.js](https://react.dev/) (Bootstrapped with [Vite](https://vitejs.dev/) for lightning-fast HMR)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) (Custom configured for WhatsApp color palettes)
- **Backend & Database:** [Firebase Cloud Firestore](https://firebase.google.com/products/firestore)
- **Authentication:** [Firebase Authentication](https://firebase.google.com/products/auth) (Google Provider)
- **Hosting & CI/CD:** Firebase Hosting & GitHub Actions

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- A [Firebase](https://firebase.google.com/) Account

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Chatify.git
cd Chatify
```

### 2. Install dependencies
```bash
npm install
```

### 3. Firebase Setup
1. Create a new project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore Database** (Start in Test Mode for development).
3. Enable **Authentication** and turn on the **Google** sign-in provider.
4. Register a "Web App" in your Firebase project settings to get your configuration keys.

### 4. Environment Variables
Create a `.env` file in the root directory of the project and add your Firebase configuration keys:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```
> **Note:** Never commit your `.env` file to version control. It is already included in the `.gitignore`.

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to see the app running!

## 🔄 CI/CD & Deployment

This project uses **GitHub Actions** to automate deployments to **Firebase Hosting**.

Whenever code is pushed to the `main` branch, the `firebase-hosting-merge.yml` workflow is triggered. It will:
1. Check out the latest code.
2. Inject secure environment variables stored in GitHub Secrets.
3. Run `npm install` and `npm run build` to create a production-ready bundle.
4. Deploy the optimized bundle live to Firebase Hosting.

### Required GitHub Secrets for Deployment
To ensure CI/CD works in a forked environment, you must add the following **Repository Secrets** in your GitHub settings (Settings > Secrets and variables > Actions):

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## 📁 Project Structure highlights
- `src/components/Auth`: Google login screen and branding.
- `src/components/Chat`: Main conversation window, message bubbles, and input area.
- `src/components/Sidebar`: Chat list, user profile header, and structural navigation.
- `src/contexts/AuthContext.jsx`: Global state management for user sessions and lifecycle.
- `src/hooks`: Custom React hooks (`useAuth`, `useChats`, `useMessages`) interfacing cleanly with Firebase APIs.

---
*Built with ❤️ for real-time communication.*
