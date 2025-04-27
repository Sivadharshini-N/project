# Personal Budget Tracker

A modern, feature-rich budget tracking application built with React and Supabase. Track expenses, set budgets, manage financial goals, and gain insights into your spending habits.

## Features

- 📊 **Interactive Dashboard**: Real-time overview of your financial status
- 💰 **Transaction Management**: Track income and expenses with detailed categorization
- 🎯 **Budget Planning**: Set and monitor category-wise budgets
- 🚀 **Financial Goals**: Set, track, and achieve your financial goals
- 📈 **Visual Reports**: Comprehensive charts and analytics
- 🔒 **Secure Authentication**: Powered by Supabase
- 📱 **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- **Frontend**: React, TypeScript, Chakra UI
- **State Management**: Zustand
- **Database & Auth**: Supabase
- **Charts**: Chart.js with react-chartjs-2
- **Routing**: React Router
- **HTTP Client**: Axios
- **PDF Export**: jsPDF

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/personal-budget-tracker.git
   cd personal-budget-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── lib/               # Utility functions and API clients
├── pages/             # Main application pages
├── store/             # State management
├── types/             # TypeScript type definitions
└── docs/              # Project documentation
```

## Database Schema

### Tables

- **transactions**: Track income and expenses
- **budgets**: Store budget allocations by category
- **goals**: Financial goals and progress tracking
- **savings_plans**: Long-term savings planning

## Security

- Row Level Security (RLS) enabled on all tables
- User data isolation through RLS policies
- Secure authentication via Supabase

## Features in Detail

### Transaction Management
- Add, edit, and categorize transactions
- Filter and search functionality
- Transaction history with detailed views

### Budget Planning
- Set monthly or yearly budgets
- Category-wise budget allocation
- Real-time spending tracking
- Budget vs. actual comparison

### Financial Goals
- Set short and long-term goals
- Track progress visually
- Deadline-based goal planning
- Goal achievement notifications

### Reports and Analytics
- Monthly/yearly financial reports
- Category-wise spending analysis
- Trend analysis and predictions
- Exportable reports in PDF format
