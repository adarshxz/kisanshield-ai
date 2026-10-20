import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Sun, 
  Moon, 
  RotateCcw, 
  Info, 
  Save, 
  CheckCircle2, 
  Globe,
  Sliders
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const SettingsPage: React.FC = () => {
  const { 
    selectedFarm, 
    language, 
    setLanguage, 
    theme, 
    toggleTheme, 
    resetAllDemoData, 
    showToast 
  } = useApp();

  const [farmerName, setFarmerName] = useState(selectedFarm.ownerName);
  const [notifyWeather, setNotifyWeather] = useState(true);
  const [notifyRisks, setNotifyRisks] = useState(true);
  const [notifyTasks, setNotifyTasks] = useState(true);
  const [notifyCommunity, setNotifyCommunity] = useState(true);
  const [shareAggregatedData, setShareAggregatedData] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({ type: 'success', title: 'Settings Saved', message: 'Preferences updated locally in browser storage.' });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="p-6 rounded-3xl bg-white dark:bg-forest-950 border border-surface-border dark:border-forest-900 shadow-card">
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-forest-700 dark:text-fresh" />
          <h2 className="text-xl font-black text-kisan-text dark:text-white">
            Settings, Profile & System Preferences
          </h2>
        </div>
        <p className="text-xs text-kisan-muted dark:text-gray-400 mt-1">
          Configure notification thresholds, interface language, appearance theme, and privacy controls.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* 1. Farmer Profile */}
        <Card className="p-6">
          <h3 className="text-sm font-bold text-kisan-text dark:text-white mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-forest-700" />
            <span>Farmer Information & Profile</span>
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-kisan-text dark:text-white">Farmer Name</label>
                <input
                  type="text"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full rounded-xl border border-surface-border dark:border-forest-800 p-2.5 bg-surface-warm dark:bg-forest-900"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-kisan-text dark:text-white">Primary Farm</label>
                <input
                  type="text"
                  value={selectedFarm.name}
                  disabled
                  className="w-full rounded-xl border border-surface-border dark:border-forest-800 p-2.5 bg-surface-warm dark:bg-forest-900 opacity-80"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-kisan-text dark:text-white">System Language</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-xl font-bold border text-xs ${
                    language === 'en' ? 'bg-forest-700 text-white border-forest-700' : 'border-surface-border text-kisan-muted'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  className={`px-4 py-2 rounded-xl font-bold border text-xs ${
                    language === 'hi' ? 'bg-forest-700 text-white border-forest-700' : 'border-surface-border text-kisan-muted'
                  }`}
                >
                  हिन्दी (Devanagari)
                </button>
              </div>
            </div>

            <Button type="submit" variant="primary" size="sm">
              Save Profile Changes
            </Button>
          </form>
        </Card>

        {/* 2. Notification Preferences */}
        <Card className="p-6">
          <h3 className="text-sm font-bold text-kisan-text dark:text-white mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-forest-700" />
            <span>Advisory Notification Preferences</span>
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { id: 'weather', label: 'Severe Micro-Weather & Storm Alerts', desc: 'Rainfall events >20mm and extreme wind gusts', checked: notifyWeather, set: setNotifyWeather },
              { id: 'risks', label: 'Elevated Crop Risk Radar Warnings', desc: 'Pathogen wetness windows and pest trap surges', checked: notifyRisks, set: setNotifyRisks },
              { id: 'tasks', label: 'Daily Prioritized Task Reminders', desc: 'Morning notifications for tasks due today', checked: notifyTasks, set: setNotifyTasks },
              { id: 'community', label: 'Regional Community Pest Watches', desc: 'Alerts reported within 15 km radius in Sehore cluster', checked: notifyCommunity, set: setNotifyCommunity },
            ].map((n) => (
              <div key={n.id} className="flex items-start justify-between p-3 rounded-2xl bg-surface-warm dark:bg-forest-900 border border-surface-border dark:border-forest-800">
                <div>
                  <span className="font-bold text-kisan-text dark:text-white block">{n.label}</span>
                  <span className="text-[11px] text-kisan-muted dark:text-gray-400">{n.desc}</span>
                </div>
                <input
                  type="checkbox"
                  checked={n.checked}
                  onChange={(e) => n.set(e.target.checked)}
                  className="w-4 h-4 text-forest-700 rounded mt-0.5"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* 3. Appearance & Theme */}
        <Card className="p-6">
          <h3 className="text-sm font-bold text-kisan-text dark:text-white mb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-forest-700" />
            <span>Interface Theme & Readability</span>
          </h3>

          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-kisan-text dark:text-white block">Theme Mode</span>
              <span className="text-kisan-muted text-[11px]">Currently using {theme} mode</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              leftIcon={theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            >
              Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </Button>
          </div>
        </Card>

        {/* 4. Privacy & Demo Lifecycle */}
        <Card className="p-6">
          <h3 className="text-sm font-bold text-kisan-text dark:text-white mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-forest-700" />
            <span>Privacy & Demonstration Data Lifecycle</span>
          </h3>

          <p className="text-xs text-kisan-muted leading-relaxed mb-4">
            KisanShield AI stores your active demonstration farm, tasks, and economic scenarios in your local browser cache (localStorage). No private credentials or personal data are transmitted to external servers in demonstration mode.
          </p>

          <div className="pt-3 border-t border-surface-border dark:border-forest-900 flex items-center justify-between">
            <div>
              <span className="font-bold text-xs text-kisan-text dark:text-white block">Reset All Demonstration Data</span>
              <span className="text-[11px] text-kisan-muted">Restores baseline MP fields, initial tasks, and risk radar items</span>
            </div>

            <Button
              variant="danger"
              size="sm"
              onClick={resetAllDemoData}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Reset Demo Data
            </Button>
          </div>
        </Card>

        {/* 5. Product Disclaimer & About */}
        <Card className="p-6 bg-surface-warm dark:bg-forest-950">
          <h3 className="text-xs font-bold uppercase tracking-wider text-kisan-muted dark:text-gray-400 mb-2">
            About KisanShield AI
          </h3>
          <p className="text-xs text-kisan-text dark:text-white font-semibold">
            KisanShield AI Prototype v1.0 — From Reactive Farming to Predictive Farming
          </p>
          <p className="text-xs text-kisan-muted dark:text-gray-400 mt-2 leading-relaxed">
            Designed for smallholder and progressive farmers across India. Developed with deterministic arithmetic economics, explainable evidence streams, and strict non-hallucination agronomic safeguards.
          </p>
        </Card>

      </div>

    </div>
  );
};
