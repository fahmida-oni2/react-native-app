# Orbit One — Official Mobile App

<p align="center">
  <img src="https://play-lh.googleusercontent.com/xFEB5gkaaiXjEQCwtdyzfvg4KjSoKWzc3v8tWQBq7t4RTvOb5Viu_KkN9ni8_65BAJc_a2xAimvKD3bHCEo9OA=w240-h480" width="100" alt="Orbit One Logo" />
</p>

<p align="center">
  <a href="https://play.google.com/store/apps/details?id=com.orbitmedia.app">
    <img src="https://img.shields.io/badge/Google%20Play-Live%20on%20Play%20Store-brightgreen?logo=google-play&style=for-the-badge" alt="Get it on Google Play" />
  </a>
  <img src="https://img.shields.io/badge/Platform-Android-blue?style=for-the-badge&logo=android" />
  <img src="https://img.shields.io/badge/Built%20With-Expo-000020?style=for-the-badge&logo=expo" />
  <img src="https://img.shields.io/badge/Status-Live-success?style=for-the-badge" />
</p>

---

> *A production Android app I independently built and deployed to the Google Play Store during my internship at [Orbit Media Solutions Limited](https://orbitmediasolutions.com/) — a UK-based software company. This was not a tutorial or a course project. It is a real, live app published under the company's organizational account.*

---

## Screenshots

<p align="center">
  <img src="./screenshot1.jpeg" width="270" alt="Onboarding Screen" style="margin-right: 20px;" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./screenshot2.jpeg" width="270" alt="Home Dashboard" />
</p>

<p align="center">
  <em>Onboarding Screen &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Home Dashboard</em>
</p>

---

## My Contribution

I was responsible for the **full development and Play Store deployment** of this app — from setting up the environment to shipping the final release.

- Configured the **Expo + EAS Build** environment on Linux entirely from scratch
- Resolved complex **dependency conflicts** and Expo SDK version mismatches with no direct documentation available
- Debugged **UI inconsistencies** across multiple Android devices using Expo Go
- Managed the complete **Google Play Console** release pipeline — from AAB generation to live deployment

---

## Challenges I Navigated

This project pushed me in ways no structured course ever did. Many of the problems I faced had no direct answer online — I had to read, experiment, break things, and fix them repeatedly.

| Challenge | What I Did |
|---|---|
| Expo environment setup on Linux | Configured from scratch, resolved path and permission issues |
| Dependency & SDK version conflicts | Traced incompatibilities manually and resolved step by step |
| EAS Build failures | Debugged build logs, fixed config mismatches in `eas.json` and `app.json` |
| Cross-device UI inconsistencies | Tested across multiple Android versions and screen sizes via Expo Go |
| Google Play Console deployment | Navigated the full release pipeline — internal → production track |

> The most valuable skill I developed wasn't React Native or Expo. It was knowing how to find answers when there are none.

---

## About the App

**Orbit One** is the official Android mobile application for [Orbit Media Solutions Limited](https://orbitmediasolutions.com/) — serving as a professional mobile gateway for clients and partners to explore the company's full range of digital services and engage with their expert consultancy team.

---

## Features

- 📋 **ERP Services** — Enterprise resource planning solutions
- 👥 **HRM Module** — Human resource management overview
- 🛒 **POS Systems** — Point of sale software information
- ☁️ **Smart Cloud** — Cloud-based service offerings
- 📱 **Responsive UI** — Optimized across all Android screen sizes
- 🔐 **Secure Auth** — Firebase Authentication for admin accounts
- 👤 **Guest Access** — Browse without login required

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native (Expo) |
| Expo SDK | Expo SDK 52+ |
| Authentication | Firebase Auth |
| Storage | Firebase Cloud Storage |
| Build Service | EAS Build (Expo Application Services) |
| Deployment | Google Play Console |
| Bundler | Metro (via Expo) |

---

## Installation

### Prerequisites

- Node.js >= 18
- Expo CLI
- EAS CLI (for production builds)
- Expo Go app (for development on device)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-repo/orbit-one.git
cd orbit-one

# Install dependencies
npm install

# Start Expo development server
npx expo start
```

Then scan the QR code with **Expo Go** (Android/iOS) or press `a` to open on a connected Android emulator.

---

## Build for Production

This project uses **EAS Build** (Expo Application Services) for production builds.

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in to Expo account
eas login

# Configure EAS (first time only)
eas build:configure

# Build AAB for Google Play Store
eas build --platform android --profile production

# Build APK for direct install
eas build --platform android --profile preview
```

> AAB files are submitted directly to the Google Play Console for release.

---

## Deployment

This app is live on the **Google Play Store** under the **Orbit Media Solutions Limited** organizational account.

🔗 [View on Google Play](https://play.google.com/store/apps/details?id=com.orbitmedia.app)

---

## Privacy Policy

- **No data collected** from general/guest users
- **No data shared** with third parties
- Admin accounts use Firebase Authentication (email + display name only)
- All data transmitted over **SSL/TLS (HTTPS)**
- Account deletion available in-app via Profile → Delete Account

🔗 [Full Privacy Policy](https://sites.google.com/view/orbit-media-privacy-policy/home)

---

## Contact & Support

| | |
|---|---|
| 🌐 Website | [orbitmediasolutions.com](https://orbitmediasolutions.com/) |
| 📧 Support | info@theorbit.one |

---

## Developer

**Fahmida Rahman** — Frontend Developer & EEE Graduate, Dhaka, Bangladesh

🔗 [LinkedIn](https://linkedin.com) · [GitHub](https://github.com) · [Portfolio](https://portfolio.com)

---

## License

© 2026 Orbit Media Solutions Limited. All rights reserved.
