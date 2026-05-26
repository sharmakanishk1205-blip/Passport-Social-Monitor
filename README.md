# 🌐 Passport Social Media Scraper Dashboard

A full-stack dashboard that aggregates and intelligently organises passport-related social media content from the last 24 hours using NLP processing.

> Built for Zebvo Newswire Private Limited — Full-Stack Development Task

---

## 🚀 Live Demo

> [Deploy on Vercel — see deployment section below]

---

## 📋 Features

| Feature | Status |
|---|---|
| Real-time post aggregation (mock data + API-ready) | ✅ |
| Auto-categorisation (Application, Renewal, Tatkal, Visa, etc.) | ✅ |
| Sentiment analysis (Positive / Negative / Neutral) | ✅ |
| Gibberish / spam filter | ✅ |
| AI-generated ~30-word summaries per post | ✅ |
| Clustered view (similar posts grouped) | ✅ |
| Translation into 10 languages | ✅ |
| Filters: platform, category, sentiment, sort | ✅ |
| Keyword search | ✅ |
| Export to CSV / PDF | ✅ |
| Responsive UI | ✅ |

---

## 🏗️ Architecture

```
passport-dashboard/
├── frontend/          # React dashboard (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── PostCard.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── StatsPanel.jsx
│   │   │   └── TranslateBox.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/           # Node.js + Express API
│   ├── routes/
│   │   ├── posts.js      # GET /api/posts
│   │   ├── translate.js  # POST /api/translate
│   │   └── export.js     # GET /api/export/csv
│   ├── services/
│   │   ├── scraper.js    # Social media scraper (mock + real)
│   │   ├── nlp.js        # NLP: categorise, sentiment, gibberish
│   │   └── summarise.js  # AI summary generation
│   ├── server.js
│   └── package.json
│
└── docs/
    ├── architecture.md
    └── api.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- npm or yarn

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/passport-dashboard.git
cd passport-dashboard
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your API keys in .env
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`  
Backend runs at `http://localhost:3001`

---

## 🔑 Environment Variables

Create `backend/.env`:
```
PORT=3001
# Add your API keys for real scraping:
TWITTER_BEARER_TOKEN=your_key_here
REDDIT_CLIENT_ID=your_key_here
REDDIT_CLIENT_SECRET=your_key_here
OPENAI_API_KEY=your_key_here  # for summarisation
LIBRETRANSLATE_URL=https://libretranslate.com
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/posts` | Fetch all posts (filters via query params) |
| GET | `/api/posts?platform=Twitter&category=Tatkal&sentiment=negative` | Filtered posts |
| POST | `/api/translate` | Translate post to target language |
| GET | `/api/export/csv` | Export filtered posts as CSV |
| GET | `/api/stats` | Dashboard statistics |

See [docs/api.md](docs/api.md) for full Postman collection.

---

## 🧠 NLP Pipeline

```
Raw Post → Gibberish Filter → Categoriser → Sentiment Analyser → Summariser → Cluster Engine
```

1. **Gibberish Filter** — removes spam/bot posts using character entropy + keyword detection
2. **Categoriser** — keyword + pattern matching maps posts to 10 categories
3. **Sentiment** — rule-based + optional ML model (positive/negative/neutral)
4. **Summariser** — extracts key sentence or calls OpenAI API for ~30-word summary
5. **Clustering** — groups posts by TF-IDF cosine similarity threshold

---

## 🚢 Deployment

### Deploy Frontend to Vercel
```bash
cd frontend
npm run build
npx vercel --prod
```

### Deploy Backend to Railway / Render
1. Push to GitHub
2. Connect Railway.app to your repo
3. Set environment variables in Railway dashboard
4. Deploy

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, CSS |
| Backend | Node.js, Express |
| NLP | natural.js, compromise.js |
| Translation | LibreTranslate API |
| Scraping | Twitter API v2, Reddit API, Puppeteer |
| Export | json2csv, PDFKit |

---

## 👤 Author

Built by [Your Name] — [your email]

---

## 📄 License

MIT
