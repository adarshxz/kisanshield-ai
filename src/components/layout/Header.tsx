import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  Bell, 
  Globe, 
  Sun, 
  Moon, 
  ChevronDown, 
  Check, 
  User, 
  AlertCircle, 
  ExternalLink,
  ShieldAlert,
  Sprout
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar: () => void;
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, title, subtitle }) => {
  const { 
    selectedFarm, 
    selectedField, 
    setSelectedFieldId, 
    language, 
    setLanguage, 
    theme, 
    toggleTheme, 
    notifications, 
    unreadNotificationCount, 
    markNotificationRead,
    userRole,
    setUserRole,
    t
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-forest-950/90 backdrop-blur-md border-b border-surface-border dark:border-forest-900 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-kisan-muted hover:text-kisan-text hover:bg-surface-warm dark:hover:bg-forest-900 transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg lg:text-xl font-bold text-kisan-text dark:text-white tracking-tight">
                {title || t.brandName}
              </h1>
              <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-forest-900 dark:text-emerald-300 dark:border-forest-700">
                Demo
              </span>
            </div>
            {subtitle && (
              <p className="text-xs text-kisan-muted dark:text-gray-400 hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Center / Field Selector Pill */}
        <div className="hidden md:flex items-center gap-2 bg-surface-warm dark:bg-forest-900/80 px-3 py-1.5 rounded-xl border border-surface-border dark:border-forest-800">
          <Sprout className="w-4 h-4 text-forest-700 dark:text-fresh" />
          <span className="text-xs text-kisan-muted dark:text-gray-400 font-medium">Field:</span>
          <select
            value={selectedField?.id}
            onChange={(e) => setSelectedFieldId(e.target.value)}
            className="bg-transparent text-xs font-semibold text-kisan-text dark:text-white focus:outline-none cursor-pointer"
          >
            {selectedFarm.fields.map(f => (
              <option key={f.id} value={f.id} className="dark:bg-forest-900">
                {f.name} ({f.currentCrop} · {f.areaAcres} Ac)
              </option>
            ))}
          </select>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-surface-warm dark:bg-forest-900 rounded-xl p-0.5 border border-surface-border dark:border-forest-800">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs font-medium rounded-lg transition-all ${
                language === 'en' 
                  ? 'bg-white dark:bg-forest-800 text-forest-700 dark:text-white shadow-xs font-bold' 
                  : 'text-kisan-muted hover:text-kisan-text dark:text-gray-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 text-xs font-medium rounded-lg transition-all ${
                language === 'hi' 
                  ? 'bg-white dark:bg-forest-800 text-forest-700 dark:text-white shadow-xs font-bold' 
                  : 'text-kisan-muted hover:text-kisan-text dark:text-gray-400'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-kisan-muted hover:text-kisan-text dark:text-gray-300 dark:hover:text-white hover:bg-surface-warm dark:hover:bg-forest-900 transition-colors"
            title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-kisan-muted hover:text-kisan-text dark:text-gray-300 dark:hover:text-white hover:bg-surface-warm dark:hover:bg-forest-900 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-forest-950 rounded-2xl shadow-elevated border border-surface-border dark:border-forest-900 z-50 p-4 animate-scale-up">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-border dark:border-forest-900">
                    <span className="font-bold text-sm text-kisan-text dark:text-white">Farm Alerts & Advisory</span>
                    <span className="text-xs bg-fresh/10 text-forest-700 dark:text-fresh px-2 py-0.5 rounded-full font-semibold">
                      {unreadNotificationCount} unread
                    </span>
                  </div>
                  <div className="divide-y divide-surface-border dark:divide-forest-900 max-h-72 overflow-y-auto mt-2">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.linkTo) {
                            navigate(n.linkTo);
                            setShowNotifications(false);
                          }
                        }}
                        className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                          n.read ? 'opacity-70 hover:bg-surface-warm dark:hover:bg-forest-900/40' : 'bg-emerald-50/50 dark:bg-forest-900/60 font-medium'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-kisan-text dark:text-white">{n.title}</h4>
                          <span className="text-[10px] text-kisan-muted shrink-0">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-kisan-muted dark:text-gray-300 mt-1 line-clamp-2">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-surface-warm dark:hover:bg-forest-900 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-forest-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {selectedFarm.ownerName.charAt(0)}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-kisan-muted" />
            </button>

            {showProfileMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-forest-950 rounded-2xl shadow-elevated border border-surface-border dark:border-forest-900 z-50 p-2 animate-scale-up text-xs">
                  <div className="px-3 py-2 border-b border-surface-border dark:border-forest-900">
                    <p className="font-bold text-kisan-text dark:text-white">{selectedFarm.ownerName}</p>
                    <p className="text-[11px] text-kisan-muted dark:text-gray-400 truncate">{selectedFarm.name}</p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-forest-100 text-forest-800 dark:bg-forest-800 dark:text-forest-200">
                      Role: {userRole}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setUserRole(userRole === 'farmer' ? 'expert' : 'farmer');
                        navigate(userRole === 'farmer' ? '/expert/dashboard' : '/app/dashboard');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-surface-warm dark:hover:bg-forest-900 rounded-lg text-forest-700 dark:text-fresh font-medium"
                    >
                      {userRole === 'farmer' ? 'Switch to Expert Reviewer' : 'Switch to Farmer View'}
                    </button>
                    <Link
                      to="/app/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="block px-3 py-2 hover:bg-surface-warm dark:hover:bg-forest-900 rounded-lg text-kisan-text dark:text-gray-300"
                    >
                      Settings & Preferences
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setShowProfileMenu(false)}
                      className="block px-3 py-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 rounded-lg"
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
