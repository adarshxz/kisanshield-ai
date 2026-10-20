import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Farm, Field, Language, Theme, UserRole } from '../types';
import { farmService } from '../services/farmService';
import { taskService } from '../services/taskService';
import { riskService } from '../services/riskService';
import { profitService } from '../services/profitService';
import { decisionService } from '../services/decisionService';
import { communityService } from '../services/communityService';
import { soilService } from '../services/soilService';
import { insuranceService } from '../services/insuranceService';
import { translations } from '../i18n/translations';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'risk' | 'weather' | 'task' | 'community';
  linkTo?: string;
}

interface AppContextType {
  farms: Farm[];
  selectedFarm: Farm;
  setSelectedFarmId: (id: string) => void;
  selectedField: Field;
  setSelectedFieldId: (id: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  pendingSyncCount: number;
  triggerSync: () => void;
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  unreadNotificationCount: number;
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  resetAllDemoData: () => void;
  refreshFarms: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Rhizoctonia Blight Weather Alert',
    message: 'High humidity (>82%) elevates fungal risk in Field A (Soybean).',
    timestamp: '2 hours ago',
    read: false,
    type: 'risk',
    linkTo: '/app/risk-radar'
  },
  {
    id: 'notif-2',
    title: 'Heavy Rain Predicted for Tomorrow',
    message: '22.5 mm rainfall expected. Clear eastern drainage trenches.',
    timestamp: '4 hours ago',
    read: false,
    type: 'weather',
    linkTo: '/app/dashboard'
  },
  {
    id: 'notif-3',
    title: 'Pest Advisory in Ashta Block',
    message: 'Helicoverpa trap threshold breached in surrounding cluster.',
    timestamp: '14 hours ago',
    read: true,
    type: 'community',
    linkTo: '/app/community-alerts'
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [farms, setFarms] = useState<Farm[]>(() => farmService.getFarms());
  const [selectedFarmId, setSelectedFarmId] = useState<string>(() => {
    const list = farmService.getFarms();
    return list[0]?.id || 'farm-mp-01';
  });

  const selectedFarm = farms.find(f => f.id === selectedFarmId) || farms[0];
  const [selectedFieldId, setSelectedFieldId] = useState<string>(() => {
    return selectedFarm?.fields[0]?.id || 'field-a';
  });

  const selectedField = selectedFarm?.fields.find(f => f.id === selectedFieldId) || selectedFarm?.fields[0];

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('kisanshield_lang') as Language) || 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('kisanshield_theme') as Theme) || 'light';
  });

  const [userRole, setUserRole] = useState<UserRole>('farmer');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Update theme class on HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('kisanshield_theme', theme);
  }, [theme]);

  // Online / offline listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast({ type: 'success', title: 'Network Restored', message: 'You are back online. Synchronizing data...' });
    };
    const handleOffline = () => {
      setIsOnline(false);
      showToast({ type: 'warning', title: 'Offline Mode Active', message: 'Cached farm data is available. Changes will be queued.' });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('kisanshield_lang', lang);
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const triggerSync = () => {
    setPendingSyncCount(0);
    showToast({ type: 'success', title: 'Data Synchronized', message: 'All local farm observations synced with cloud.' });
  };

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const refreshFarms = () => {
    const updated = farmService.getFarms();
    setFarms(updated);
  };

  const resetAllDemoData = () => {
    farmService.resetToDefault();
    taskService.resetTasks();
    riskService.resetRisks();
    profitService.resetScenarios();
    decisionService.resetDecisions();
    communityService.resetAlerts();
    soilService.resetSoilReports();
    insuranceService.resetIncident();
    const freshFarms = farmService.getFarms();
    setFarms(freshFarms);
    setSelectedFarmId(freshFarms[0]?.id || 'farm-mp-01');
    setSelectedFieldId(freshFarms[0]?.fields[0]?.id || 'field-a');
    setNotifications(INITIAL_NOTIFICATIONS);
    showToast({
      type: 'info',
      title: 'Demo Data Reset',
      message: 'All farm fields, tasks, risk assessments, and scenarios restored to baseline.'
    });
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        farms,
        selectedFarm,
        setSelectedFarmId,
        selectedField,
        setSelectedFieldId,
        language,
        setLanguage,
        t,
        theme,
        setTheme,
        toggleTheme,
        userRole,
        setUserRole,
        isOnline,
        setIsOnline,
        pendingSyncCount,
        triggerSync,
        notifications,
        markNotificationRead,
        unreadNotificationCount,
        toasts,
        showToast,
        removeToast,
        resetAllDemoData,
        refreshFarms,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
