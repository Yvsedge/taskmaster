

***

# 📋 TaskMaster: Full-Stack Kanban Dashboard

A high-performance, real-time Trello clone built with **React**, **TypeScript**, and **Supabase**. This application features a secure authentication system, a dynamic drag-and-drop interface, and live database synchronization across all connected clients.

**

---

## 🛠️ The Tech Stack

*   **Frontend:** [React 18](https://reactjs.org/) (Vite)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
*   **Backend/Database:** [Supabase](https://supabase.com/) (PostgreSQL)
*   **State Management:** [Zustand](https://github.com/pmndrs/zustand)
*   **Drag & Drop:** [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)

---

## ✨ Key Features

### 🔐 Secure Authentication
*   **Interactive Auth UI:** A custom split-screen login/signup toggle with Framer Motion layout animations.
*   **Persistent Sessions:** Automatic session handling using Supabase Auth—stays logged in on refresh.
*   **Data Privacy:** Implemented **Row Level Security (RLS)** policies to ensure users can only view and manage their own private tasks.

### 🎮 Fluid Kanban Experience
*   **Drag and Drop:** Intuitive card movement between "To Do", "In Progress", and "Done" columns.
*   **Optimistic UI:** State updates happen instantly on the frontend while syncing to the cloud in the background, eliminating perceived latency.
*   **Full CRUD:** Create tasks with descriptions, update their status via drag or buttons, and delete with real-time feedback.

### ⚡ Real-time Synchronization
*   **Live DB Listeners:** Uses Supabase WebSockets (Postgres Changes) to listen for database updates.
*   **Multiplayer Sync:** Changes made in one browser tab (or by another user on the same account) appear instantly across all instances without refreshing.

---

## 🚀 Technical Challenges Solved

### 1. The "Snap-Back" Latency Fix
Originally, Drag and Drop felt "clunky" because the app waited for a database response before moving the card. I implemented **Optimistic Updates** in the Zustand store, allowing the UI to react in 1ms while the `await` call happens in the background.

### 2. Complex State-Logic Relay
Managed a deep data flow: **User Input ➡️ Zustand Store ➡️ Supabase Cloud ➡️ Real-time Broadcast ➡️ Store Refresh**. This ensures the "Source of Truth" is always the database while keeping the UI snappy.

### 3. Hardware-Inspired UX
Designed the interface with a "Handheld Gadget" aesthetic, featuring dynamic gradients, industrial borders, and reactive hover states for a professional tool-like feel.

---

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/taskmaster.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root and add your Supabase credentials:
    ```text
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
4.  **Run the app:**
    ```bash
    npm run dev
    ```

---

## 👤 Author

**Your Name**
*   GitHub: [@Yvsedge](https://github.com/Yvsedge)

***

