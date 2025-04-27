/*
  # Initial Schema Setup for Budget Tracker

  1. Tables
    - users (managed by Supabase Auth)
    - transactions
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - amount (numeric)
      - type (text)
      - category (text)
      - description (text)
      - date (timestamp)
      - created_at (timestamp)
    - budgets
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - category (text)
      - amount (numeric)
      - spent (numeric)
      - period (text)
      - created_at (timestamp)
    - goals
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - title (text)
      - target_amount (numeric)
      - current_amount (numeric)
      - deadline (timestamp)
      - created_at (timestamp)
    - savings_plans
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - name (text)
      - target_amount (numeric)
      - current_amount (numeric)
      - monthly_contribution (numeric)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  category text NOT NULL,
  description text,
  date timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own transactions"
  ON transactions
  USING (auth.uid() = user_id);

-- Budgets table
CREATE TABLE budgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL,
  amount numeric NOT NULL,
  spent numeric DEFAULT 0,
  period text NOT NULL CHECK (period IN ('monthly', 'yearly')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own budgets"
  ON budgets
  USING (auth.uid() = user_id);

-- Goals table
CREATE TABLE goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  target_amount numeric NOT NULL,
  current_amount numeric DEFAULT 0,
  deadline timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own goals"
  ON goals
  USING (auth.uid() = user_id);

-- Savings plans table
CREATE TABLE savings_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  target_amount numeric NOT NULL,
  current_amount numeric DEFAULT 0,
  monthly_contribution numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE savings_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own savings plans"
  ON savings_plans
  USING (auth.uid() = user_id);