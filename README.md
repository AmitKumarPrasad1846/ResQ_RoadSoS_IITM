<div align="center">
  <img src="[https://placehold.co/1200x400/FF3B3B/FFFFFF?text=ResQ+%7C+Every+Second+Counts](https://placehold.co/1200x400/FF3B3B/FFFFFF?text=ResQ+%7C+Every+Second+Counts)" alt="ResQ Banner" width="100%"/>
  
  <h1>ResQ</h1>
  <h3>AI‑Powered Emergency Response System for Indian Roads</h3>
  
  <p>
    <strong>Every Second Counts.</strong> One tap. One location. One dispatch.
  </p>
  
  <p>
    <img src="[https://img.shields.io/badge/status-active-success.svg](https://img.shields.io/badge/status-active-success.svg)" alt="Status"/>
    <img src="[https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)" alt="Platform"/>
    <img src="[https://img.shields.io/badge/hardware-ESP32-orange](https://img.shields.io/badge/hardware-ESP32-orange)" alt="Hardware"/>
    <img src="[https://img.shields.io/badge/license-MIT-green](https://img.shields.io/badge/license-MIT-green)" alt="License"/>
    <img src="[https://img.shields.io/badge/PRs-welcome-brightgreen](https://img.shields.io/badge/PRs-welcome-brightgreen)" alt="PRs Welcome"/>
  </p>
</div>

---

## 📌 Overview

**ResQ** is an integrated emergency response ecosystem designed for Indian roads. It combines:
- 📱 **Mobile App** – One-tap SOS + automatic crash detection
- 🖥️ **Web Dashboard** – Real-time command center for emergency services
- 🔧 **ESP32 Hardware Module** – In-vehicle crash detection with battery backup

> **The problem:** India records over 1.7 lakh road accident deaths annually — one death every 3 minutes. 59% of these deaths occur due to delayed rescue.
>
> **The solution:** ResQ reduces crash-to-dispatch time from 47+ minutes to under **10 seconds**.

---

## 🎯 Why ResQ?

| Current Reality | ResQ Solution |
|-----------------|---------------|
| Multiple calls to find help | One tap SOS |
| No location sharing | Automatic GPS lock |
| Victims unconscious, no alert | AI crash detection |
| Bystanders can't help | No-login bystander mode |
| Low network = no response | Works on 2G/3G |

---

## 🏗️ System Architecture

```text
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   ESP32 Edge    │────▶  │   Mobile App    │────▶  │    Cloud API    │
│  (In-Vehicle)   │       │  (SOS Trigger)  │       │   (Firebase)    │
└─────────────────┘       └─────────────────┘       └────────┬────────┘
                                                             │
                                                             ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   SMS / Call    │◀────  │ Command Center  │◀────  │    Database     │
│    to Victim    │       │   (Dashboard)   │       │    (MongoDB)    │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

---

## 📱 Features

### Mobile App (ResQ Mobile)
- ✅ One-tap SOS – no forms, no typing
- ✅ Automatic crash detection using phone sensors
- ✅ Real-time GPS location sharing
- ✅ Works on low internet (2G/3G optimized)
- ✅ Bystander mode – no login required
- ✅ 15-second cancellation window (false alarm prevention)

### Web Dashboard (ResQ Command Center)
- ✅ Live accident alerts with pinned map locations
- ✅ Victim contact info & crash severity
- ✅ One-click dispatch to nearest ambulance/police
- ✅ Historical data & analytics for city planning
- ✅ Real-time updates via Socket.io

### Hardware Module (ResQ Edge - ESP32)
- ✅ Real-time crash detection using MPU6050 accelerometer
- ✅ Bluetooth + WiFi connectivity
- ✅ Battery backup for independent operation
- ✅ Works with existing vehicles – no factory installation
- ✅ MQTT protocol for lightweight communication

---

## 🧠 Tech Stack

| Component | Technologies |
|-----------|--------------|
| **Mobile App** | Flutter / React Native, Firebase Auth, Firestore, GPS, Push Notifications |
| **Web Dashboard** | HTML/CSS/JS, Node.js, Express, MongoDB, Socket.io, Leaflet Maps |
| **Hardware** | ESP32, MPU6050 Accelerometer, MQTT, Arduino IDE |
| **Cloud** | Firebase (Auth + Firestore), Custom Node.js API |

---

## 🚀 Getting Started

### Prerequisites

```bash
# For Mobile App
- Flutter SDK >= 3.0 OR React Native CLI
- Android Studio / Xcode
- Firebase project setup

# For Web Dashboard
- Node.js >= 18
- MongoDB (local or Atlas)
- npm or yarn

# For ESP32 Hardware
- Arduino IDE
- ESP32 board package
- MPU6050 library
```

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/resq.git
cd resq
```

**2. Mobile App Setup**
```bash
cd mobile-app
flutter pub get
# or
npm install

# Configure Firebase
# Add google-services.json / GoogleService-Info.plist

flutter run
# or
npm start
```

**3. Web Dashboard Setup**
```bash
cd dashboard
npm install
cp .env.example .env
# Add your MongoDB URI and API keys
npm run dev
```

**4. ESP32 Hardware Setup**
```bash
# Open Arduino IDE
# Install ESP32 board via Boards Manager
# Install MPU6050 library
# Upload code/esp32/resq_edge.ino to ESP32
# Connect via Serial Monitor
```

### Environment Variables

```env
# .env file for dashboard
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FIREBASE_API_KEY=your_firebase_api_key
MAPS_API_KEY=your_google_maps_key
```

---

## 📂 Project Structure

```text
resq/
├── mobile-app/
│   ├── lib/                # Flutter source code
│   ├── android/            # Android specific
│   ├── ios/                # iOS specific
│   └── pubspec.yaml
├── dashboard/
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Dashboard pages
│   │   ├── services/       # API calls
│   │   └── styles/         # CSS modules
│   ├── server/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── controllers/    # Business logic
│   └── package.json
├── hardware/
│   └── esp32/
│       ├── resq_edge.ino   # Main ESP32 code
│       └── libraries/      # Required libraries
├── docs/
│   ├── api/                # API documentation
│   └── architecture/       # System design docs
├── .env.example
├── .gitignore
└── README.md
```

---

## 👥 Team

| Name | Role | Focus Area / Responsibilities |
|------|------|------------------------------|
| **Amit** | Project Director & Hardware Lead | ESP32, Sensors, Overall Strategy |
| **Hataf Didi** | App Development Lead | Mobile App, Issue Resolution |
| **Chandrashekhar** | Dashboard & Backend Lead | Web Dashboard, API, Database |
| **Kamal** | Pitch & Presentation Lead | Deck, Research, Storytelling |
| **Mohak** | Mechanical Research Lead | Vehicle Dynamics, Crash Patterns |

> **Note:** Issues in app development? **Hataf Didi** is the point of contact. All leads report to **Amit**.

---

## 🗺️ Roadmap

- [x] Stage 1 Submission – Code + Documentation
- [ ] ESP32 Prototype – Crash detection working
- [ ] Mobile App MVP – SOS + Location sharing
- [ ] Web Dashboard – Live alerts + Map integration
- [ ] Pilot Launch – 3 cities (Chennai, Delhi, Bengaluru) – Jun 2026
- [ ] Android Beta Release – Aug 2026
- [ ] iOS Release + ESP32 Pilot with Fleet Partners – Oct 2026
- [ ] Nationwide Rollout – Dec 2026

---

## 🤝 Contributing

We welcome contributions! Please see our Contributing Guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

- **Email:** hello@resq.tech
- **GitHub Issues:** [Create an issue](#)
- **Team:** [ResQ on LinkedIn](#)

<br>

<div align="center">
  <p>Built in India, for the world.</p>
  <p><i>© 2026 ResQ — A small team, a big mission, and over 1.7 lakh reasons we will never stop.</i></p>
</div>
