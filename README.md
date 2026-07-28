<<<<<<< HEAD
🧠 AI Resume Enhancer // continue .. Here we go again
=======
# AI Resume Enhancer
>>>>>>> 3181d37 (project building started after long time)

An intelligent application that helps you create, customize, and optimize resumes with AI-powered analysis and professional templates.

## Features

- 🎨 **Multiple Resume Templates** — Classic, Modern, Minimal, and Professional designs
- ✏️ **Resume Builder** — Interactive editor with live preview
- 📄 **PDF Export** — Download your resume as a PDF
- 🔍 **AI Analysis** — Upload your resume for ATS score, keyword detection, and suggestions
- 📱 **Responsive Design** — Works on desktop and mobile

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Next.js / React / Tailwind CSS |
| State | Zustand |
| Animations | Framer Motion |
| PDF | html2canvas + jsPDF |

## Getting Started

```bash
# Install dependencies
cd frontend
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```

## Project Structure

```
frontend/
  src/
    app/              # Pages and layouts
    components/       # Reusable components
    store/            # Zustand state management
    templates/        # Resume template JSON data
    utils/            # Utility functions
    data/             # Static data
    lib/              # Library utilities
  public/             # Static assets
```
