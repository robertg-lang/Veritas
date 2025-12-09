import React from 'react';
import { NavItem } from '../types';
import { Home, Hash, Bell, User, Feather, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: NavItem;
  setActiveTab: (tab: NavItem) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: NavItem.HOME, icon: Home, label: 'Home' },
    { id: NavItem.EXPLORE, icon: Hash, label: 'Explore' },
    { id: NavItem.NOTIFICATIONS, icon: Bell, label: 'Notifications' },
    { id: NavItem.PROFILE, icon: User, label: 'Profile' },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-slate-200 px-4 py-6 justify-between">
      <div>
        <div className="flex items-center gap-3 px-4 mb-8 text-indigo-600">
          <Feather className="w-8 h-8" />
          <span className="text-2xl font-bold tracking-tight">Veritas</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 px-4 py-3 text-lg font-medium rounded-full transition-colors w-full
                ${activeTab === item.id 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <item.icon className="w-6 h-6" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <button className="flex items-center gap-3 text-slate-500 hover:text-slate-800 transition-colors w-full px-4 py-2">
           <LogOut className="w-5 h-5" />
           <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};