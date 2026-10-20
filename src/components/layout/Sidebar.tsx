import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  MapPin,
  Radar,
  Stethoscope,
  CalendarCheck,
  TrendingUp,
  Satellite,
  Droplets,
  Sprout,
  Users,
  ShieldAlert,
  Mic,
  GitBranch,
  Settings,
  ShieldCheck,
  ChevronDown,
  Layers,
  Sparkles,
  Wifi,
  WifiOff,
  RotateCcw
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { 
    farms, 
    selectedFarm, 
    setSelectedFarmId, 
    t, 
    userRole, 
    setUserRole, 
    isOnline, 
    setIsOnline,
    resetAllDemoData 
  } = useApp();
  const navigate = useNavigate();

  const primaryNavItems = [
    { to: '/app/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { to: '/app/farms', label: t.nav.farms, icon: MapPin },
    { to: '/app/risk-radar', label: t.nav.riskRadar, icon: Radar, badge: 'Elevated' },
    { to: '/app/crop-doctor', label: t.nav.cropDoctor, icon: Stethoscope },
    { to: '/app/action-planner', label: t.nav.actionPlanner, icon: CalendarCheck },
    { to: '/app/profitguard', label: t.nav.profitguard, icon: TrendingUp },
  ];

  const intelligenceNavItems = [
    { to: '/app/field-intelligence', label: t.nav.fieldIntelligence, icon: Satellite },
    { to: '/app/irrigation', label: t.nav.irrigation, icon: Droplets },
    { to: '/app/soil', label: t.nav.soil, icon: Sprout },
    { to: '/app/community-alerts', label: t.nav.communityAlerts, icon: Users },
    { to: '/app/insurance', label: t.nav.insurance, icon: ShieldAlert },
    { to: '/app/assistant', label: t.nav.assistant, icon: Mic },
    { to: '/app/decision-history', label: t.nav.decisionHistory, icon: GitBranch },
  ];

  const handleRoleToggle = () => {
    if (userRole === 'farmer') {
      setUserRole('expert');
      navigate('/expert/dashboard');
    } else {
      setUserRole('farmer');
      navigate('/app/dashboard');
    }
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-forest-950/60 lg:hidden backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-forest-900 text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-forest-800 shadow-xl lg:shadow-none`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-forest-800/80">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-fresh flex items-center justify-center text-forest-950 font-black shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white">KisanShield</span>
                <span className="px-1.5 py-0.2 text-[10px] font-extrabold tracking-wider uppercase bg-fresh/20 text-fresh rounded">AI</span>
              </div>
              <p className="text-[11px] text-forest-300/80 leading-none mt-1">Predictive Farm Intelligence</p>
            </div>
          </NavLink>

          {/* Farm Selector dropdown */}
          <div className="mt-4 pt-3 border-t border-forest-800/60">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-forest-400 block mb-1">
              Active Demonstration Farm
            </label>
            <div className="relative">
              <select
                value={selectedFarm.id}
                onChange={(e) => setSelectedFarmId(e.target.value)}
                className="w-full bg-forest-950/80 text-white text-xs font-medium rounded-lg px-3 py-2 border border-forest-700/60 appearance-none focus:outline-none focus:border-fresh cursor-pointer"
              >
                {farms.map((farm) => (
                  <option key={farm.id} value={farm.id} className="bg-forest-900 text-white">
                    {farm.name} ({farm.village}, {farm.district})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-forest-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
          <div>
            <span className="px-3 text-[10px] uppercase font-bold tracking-wider text-forest-400/80 block mb-2">
              Decision Core (MVP)
            </span>
            <div className="space-y-1">
              {primaryNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-fresh text-forest-950 font-bold shadow-sm'
                          : 'text-forest-100 hover:bg-forest-800/70 hover:text-white'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div>
            <span className="px-3 text-[10px] uppercase font-bold tracking-wider text-forest-400/80 block mb-2">
              Advanced Intelligence Modules
            </span>
            <div className="space-y-1">
              {intelligenceNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-fresh text-forest-950 font-bold shadow-sm'
                          : 'text-forest-100 hover:bg-forest-800/70 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div>
            <span className="px-3 text-[10px] uppercase font-bold tracking-wider text-forest-400/80 block mb-2">
              Role & System
            </span>
            <div className="space-y-1">
              <button
                onClick={handleRoleToggle}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-forest-200 hover:bg-forest-800/70 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-fresh shrink-0" />
                  <span>
                    {userRole === 'farmer' ? 'Switch to Expert Review Desk' : 'Switch to Farmer Workspace'}
                  </span>
                </div>
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-forest-800 text-forest-300">
                  {userRole}
                </span>
              </button>

              <NavLink
                to="/app/settings"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-fresh text-forest-950 font-bold shadow-sm'
                      : 'text-forest-100 hover:bg-forest-800/70 hover:text-white'
                  }`
                }
              >
                <Settings className="w-4 h-4 shrink-0" />
                <span>{t.nav.settings}</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Footer info & Demo Reset */}
        <div className="p-4 border-t border-forest-800/80 bg-forest-950/60 text-xs">
          <div className="flex items-center justify-between mb-2 text-[11px] text-forest-300">
            <button
              onClick={() => setIsOnline(!isOnline)}
              title="Click to toggle simulated network condition"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-fresh" />
                  <span>Online Demo Mode</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300">Offline Simulation</span>
                </>
              )}
            </button>
            <button
              onClick={resetAllDemoData}
              title="Reset all demo data back to baseline"
              className="flex items-center gap-1 hover:text-fresh transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
          <p className="text-[10px] text-forest-400/80 leading-relaxed">
            Madhya Pradesh Agro-Climatic Zone VII · Demo Prototype v1.0
          </p>
        </div>
      </aside>
    </>
  );
};
