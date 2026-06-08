# PT. Perfect Garment Accessories (PGA) - Company Profile

A premium, modern, and bilingual (English & Mandarin) Company Profile website for **PT. Perfect Garment Accessories (PGA)**, a leading garment accessories manufacturer based in Sumedang, West Java, Indonesia.

## Tech Stack
* **Frontend**: React (Vite)
* **Styling**: Tailwind CSS
* **Animations**: Framer Motion
* **Localization**: Custom Bilingual Context (English & Mandarin Chinese)
* **Icons**: Inline SVG / Corporate Custom Icons

## Features
* **Bilingual Switcher**: Instant translation toggle between English and Mandarin Chinese.
* **Dark / Light Mode**: Seamless dark mode support with transitions.
* **Interactive Products Tab**: Beautifully showcase Drawcords, Tapes, Elastics, and Herringbones.
* **Capacity Stats Counter**: Dynamic counting animation for machine statistics and production capacity.
* **Certificate Lightbox**: High-resolution zoom-in modal for GRS, OEKO-TEX, and SLF certificates.
* **Responsive Layout**: Fluid UI optimized for mobile, tablet, and desktop viewports.

## Getting Started

### Prerequisites
* Node.js (v18+)
* Python 3 (with Pillow for image processing)

### Installation & Run

1. **Extract & Move Image Assets**:
   Run the Python script to copy the cropped product and certification assets to the web public folder:
   ```bash
   python setup_assets.py
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the website.

4. **Build for Production**:
   ```bash
   npm run build
   ```
