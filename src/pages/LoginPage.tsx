import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Eye, EyeOff, ArrowRight, Lock, Phone, User, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';

export const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('9826012345');
  const [password, setPassword] = useState('kisan123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { showToast, setUserRole } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your mobile number or email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setUserRole('farmer');
      showToast({
        type: 'success',
        title: 'Welcome Back, Ramesh Patel',
        message: 'Signed in with demo farmer account for Sehore Farm.'
      });
      navigate('/app/dashboard');
    }, 600);
  };

  const fillExpertCredentials = () => {
    setIdentifier('expert.verma@kvk.in');
    setPassword('expert2026');
    setUserRole('expert');
    showToast({
      type: 'info',
      title: 'Expert Reviewer Credentials Loaded',
      message: 'Demo credentials filled for Agronomist Dr. S. K. Verma'
    });
  };

  return (
    <div className="min-h-screen bg-surface-warm flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-forest-700 flex items-center justify-center text-white font-bold">
            <ShieldCheck className="w-6 h-6 text-fresh" />
          </div>
          <span className="text-2xl font-black text-forest-950">KisanShield AI</span>
        </Link>
        <h2 className="text-xl font-bold text-kisan-text">Farmer & Agronomist Sign In</h2>
        <p className="text-xs text-kisan-muted mt-1">
          Access your farm telemetry, crop doctor assessments, and action plans
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-card rounded-3xl border border-surface-border sm:px-10">
          
          {/* Demo account quick login box */}
          <div className="mb-6 p-3.5 rounded-xl bg-forest-50 border border-forest-200 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-forest-900">Demonstration Mode Credentials</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-forest-200 text-forest-800 font-bold">Preloaded</span>
            </div>
            <p className="text-kisan-muted mb-2">
              Default credentials log into Ramesh Patel's demo soybean/wheat farm in Madhya Pradesh.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIdentifier('9826012345');
                  setPassword('kisan123');
                }}
                className="text-[11px] font-semibold text-forest-700 hover:underline"
              >
                Reset Farmer (Ramesh)
              </button>
              <span className="text-forest-300">·</span>
              <button
                type="button"
                onClick={fillExpertCredentials}
                className="text-[11px] font-semibold text-forest-700 hover:underline"
              >
                Fill Expert Reviewer
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-kisan-text mb-1">
                Mobile Number or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 9826012345 or farmer@kisan.in"
                  className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5 text-kisan-text focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-kisan-text">
                  Password
                </label>
                <span className="text-[11px] text-kisan-muted">Demo: kisan123</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5 text-kisan-text focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-kisan-muted hover:text-kisan-text"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Farm Workspace
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-kisan-muted">
            Don't have a registered farm yet?{' '}
            <Link to="/register" className="font-semibold text-forest-700 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Sehore');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-surface-warm flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-forest-700 flex items-center justify-center text-white font-bold">
            <ShieldCheck className="w-6 h-6 text-fresh" />
          </div>
          <span className="text-2xl font-black text-forest-950">KisanShield AI</span>
        </Link>
        <h2 className="text-xl font-bold text-kisan-text">Create Your Farmer Account</h2>
        <p className="text-xs text-kisan-muted mt-1">
          Begin predictive monitoring for your fields and crops
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-card rounded-3xl border border-surface-border sm:px-10">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-kisan-text mb-1">Farmer Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Patel"
                className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-kisan-text mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-kisan-text mb-1">State & District</label>
              <input
                type="text"
                value="Madhya Pradesh — Sehore"
                disabled
                className="w-full text-xs rounded-xl border border-surface-border px-3.5 py-2.5 bg-surface-warm text-kisan-muted"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Farm Setup Wizard
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-kisan-muted">
            Already registered?{' '}
            <Link to="/login" className="font-semibold text-forest-700 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
