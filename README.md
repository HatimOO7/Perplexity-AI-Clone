# 🚀 Perplexity AI Clone

A full-stack AI-powered search and summarization platform inspired by **Perplexity AI**. This project combines real-time web search with LLM-based summarization to deliver concise, citation-backed answers in a clean and responsive interface.

---

## 📌 Overview

This application mimics the core functionality of Perplexity AI by allowing users to:

* Ask natural language questions
* Retrieve real-time web results
* Generate structured AI summaries with citations
* Maintain a searchable history of interactions

Built with modern web technologies, it emphasizes performance, scalability, and developer-friendly architecture.

---

## ✨ Key Features

### 🔎 Real-time Search

* Integrates with the **Brave Search API**
* Fetches up-to-date web results dynamically

### 🤖 AI-Powered Summarization

* Uses **Google Gemini 1.5 Flash**
* Processes search results into clean, readable Markdown
* Includes citations for transparency and traceability

### ⚙️ Async Workflow Management

* Powered by **Inngest**
* Handles background jobs and AI processing reliably
* Ensures fault-tolerant execution of long-running tasks

### 🔐 User Authentication

* Implemented using **Clerk**
* Secure Sign Up / Sign In flows
* Session management and protected routes

### 🗄️ Database Integration

* Uses **Supabase**
* Stores:

  * Search history
  * AI responses
  * User-related data

### 🎨 Responsive UI

* Built with **Tailwind CSS**
* Clean, minimal, and mobile-friendly design

---

## 🧱 Tech Stack

| Layer     | Technology           |
| --------- | -------------------- |
| Framework | Next.js (App Router) |
| Frontend  | React                |
| Styling   | Tailwind CSS         |
| Backend   | Supabase             |
| AI / LLM  | Google Gemini        |
| Workflow  | Inngest              |
| Auth      | Clerk                |

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HatimOO7/Perplexity-AI-Clone.git
cd Perplexity-AI-Clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Brave Search API
BRAVE_API_KEY=

# Gemini API
GEMINI_API_KEY=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 🧠 How It Works

1. User submits a query
2. Query is sent to **Brave Search API**
3. Results are passed to an **Inngest workflow**
4. Gemini processes and summarizes the data
5. Structured response is returned and stored in **Supabase**
6. UI renders formatted Markdown with citations

---

## 📁 Project Structure (Simplified)

```
/app            → Next.js App Router pages
/components     → Reusable UI components
/lib            → API clients and utilities
/ inngest       → Background jobs & workflows
/styles         → Global styles
```

---

## 🚀 Future Improvements

* Streaming AI responses
* Advanced citation linking
* User-specific personalization
* Dark mode enhancements
* Query suggestions & trending topics

---

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is for educational purposes. Add a license if you plan to distribute it.

---

## 👤 Author

**Hatim Al Amin Chowdhury**

* GitHub: [https://github.com/HatimOO7](https://github.com/HatimOO7)

---

## ⭐ Support

If you found this project helpful, consider giving it a star ⭐ on GitHub.
