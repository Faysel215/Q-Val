# Q-Val: Synthetic Illiquid Asset Pricer

![Q-Val App](https://img.shields.io/badge/Status-Operational-green) ![License](https://img.shields.io/badge/License-MIT-blue)

**Q-Val** is a next-generation valuation tool designed for **Auditors** and **Real Estate Funds** operating within the Islamic Finance sector. It leverages simulated **Quantum Machine Learning (QML)** concepts to generate defensible "Mark-to-Model" valuations for illiquid assets backing Sukuk contracts.

## 🚀 The Problem
Illiquid assets (Real Estate, Infrastructure) rarely trade, making it difficult to determine their fair market value continuously. In Islamic Finance, this is critical because **Sukuk** (Islamic bonds) must maintain a **Tangibility Ratio of at least 51%** (value of tangible assets vs. debt) to be tradable on secondary markets.

## 💡 The Solution
Q-Val acts as a synthetic pricer. It uses the Google Gemini API to simulate a **Quantum Boltzmann Machine**, inferring high-dimensional correlations between the specific illiquid asset and liquid market proxies (like REITs or Infrastructure ETFs) to generate a realistic price path over time.

## ✨ Key Features

- **Synthetic Price Path Generation:** Generates monthly price points, volatility, and uncertainty bounds for up to 30 years.
- **Tangibility Ratio Verification:** Automatically flags if the asset valuation supports Sukuk tradability (>51% ratio).
- **Market Proxy Correlation:** Identifies and utilizes relevant liquid indices to ground the valuation in market reality.
- **AI-Driven Commentary:** Provides detailed market context and justification for the generated valuation.
- **Quantum Simulation UI:** A visually immersive "processing" state that visualizes the theoretical quantum annealing process.

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS
- **AI Engine:** Google Gemini API (`gemini-2.5-flash`) via `@google/genai` SDK
- **Visualization:** Recharts for financial charting

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/q-val.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   API_KEY=your_google_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## ⚠️ Disclaimer
**Q-Val is a conceptual prototype.** It uses Large Language Models (LLMs) to *simulate* the logic and output of a Quantum Machine Learning model. It does not utilize actual quantum computing hardware. The financial figures generated are synthetic and should not be used for actual investment or auditing decisions without professional verification.

---
*Built for the future of Islamic Finance.*