import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  PiggyBank,
  Target,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Layout: React.FC = () => {
  const location = useLocation();
  const signOut = useAuthStore((state) => state.signOut);

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/transactions', icon: Wallet, label: 'Transactions' },
    { path: '/budgets', icon: PiggyBank, label: 'Budgets' },
    { path: '/goals', icon: Target, label: 'Goals' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <nav className="w-64 bg-surface border-r border-gray-200 p-4">
        <div className="flex items-center mb-8">
          <PiggyBank className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold ml-2">BudgetTracker</h1>
        </div>
        
        <div className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center p-2 rounded-lg transition-colors ${
                location.pathname === path
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="ml-3">{label}</span>
            </Link>
          ))}
        </div>

        <button
          onClick={() => signOut()}
          className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg mt-auto w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="ml-3">Sign Out</span>
        </button>
      </nav>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;