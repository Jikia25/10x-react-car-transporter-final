// src/components/JoinLoginFlow.tsx
import React, { useState } from 'react';

interface UserProfile {
  type: 'individual' | 'dealer' | 'shipper';
  experience: 'beginner' | 'experienced';
  monthlyVolume?: number;
}

interface JoinLoginFlowProps {
  onProfileComplete: (profile: UserProfile) => void;
  onLogin: () => void;
  onClose: () => void;
}

export default function JoinLoginFlow({ onProfileComplete, onLogin, onClose }: JoinLoginFlowProps) {
  const [step, setStep] = useState<'initial' | 'userType' | 'experience' | 'volume' | 'login'>('initial');
  const [profile, setProfile] = useState<Partial<UserProfile>>({});

  const handleUserTypeSelect = (type: UserProfile['type']) => {
    setProfile({ ...profile, type });
    if (type === 'individual') {
      // Individual users skip experience/volume steps
      onProfileComplete({ type, experience: 'beginner' });
    } else {
      setStep('experience');
    }
  };

  const handleExperienceSelect = (experience: UserProfile['experience']) => {
    setProfile({ ...profile, experience });
    if (profile.type === 'dealer' || profile.type === 'shipper') {
      setStep('volume');
    } else {
      onProfileComplete({ ...profile, experience } as UserProfile);
    }
  };

  const handleVolumeSelect = (volume: number) => {
    const finalProfile = { ...profile, monthlyVolume: volume } as UserProfile;
    onProfileComplete(finalProfile);
  };

  const renderInitialStep = () => (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 max-w-md mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to CarTransporter</h2>
        <p className="text-gray-600">Join thousands of satisfied customers</p>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={() => setStep('userType')}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Join Now - Free Account
        </button>
        
        <button
          onClick={() => setStep('login')}
          className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:border-gray-400 transition-colors"
        >
          I Already Have an Account
        </button>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>No credit card required • Instant quotes • Trusted by 50,000+ customers</p>
      </div>
    </div>
  );

  const renderUserTypeStep = () => (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What describes you best?</h2>
        <p className="text-gray-600">This helps us customize your experience</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => handleUserTypeSelect('individual')}
          className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
        >
          <div className="text-4xl mb-4">🚗</div>
          <h3 className="text-lg font-semibold mb-2">Individual</h3>
          <p className="text-sm text-gray-600">
            I need to transport my personal vehicle occasionally
          </p>
          <div className="mt-3 text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
            Quick quotes, easy booking →
          </div>
        </button>

        <button
          onClick={() => handleUserTypeSelect('dealer')}
          className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
        >
          <div className="text-4xl mb-4">🏢</div>
          <h3 className="text-lg font-semibold mb-2">Dealer</h3>
          <p className="text-sm text-gray-600">
            I regularly buy/sell vehicles and need transport services
          </p>
          <div className="mt-3 text-sm text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
            Volume discounts, priority support →
          </div>
        </button>

        <button
          onClick={() => handleUserTypeSelect('shipper')}
          className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group"
        >
          <div className="text-4xl mb-4">🚛</div>
          <h3 className="text-lg font-semibold mb-2">Shipper</h3>
          <p className="text-sm text-gray-600">
            I transport large volumes of vehicles monthly
          </p>
          <div className="mt-3 text-sm text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
            Custom rates, dedicated support →
          </div>
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={() => setStep('initial')}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ← Back
        </button>
      </div>
    </div>
  );

  const renderExperienceStep = () => (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 max-w-lg mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Experience Level</h2>
        <p className="text-gray-600">How familiar are you with vehicle importing?</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => handleExperienceSelect('beginner')}
          className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
        >
          <div className="flex items-start space-x-4">
            <div className="text-2xl">🌱</div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Beginner Dealer</h3>
              <p className="text-sm text-gray-600">
                New to the business, looking for guidance and support
              </p>
              <div className="mt-2 text-sm text-blue-600">
                • Step-by-step guidance
                • Educational resources
                • Dedicated onboarding
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleExperienceSelect('experienced')}
          className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
        >
          <div className="flex items-start space-x-4">
            <div className="text-2xl">🏆</div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Experienced Dealer</h3>
              <p className="text-sm text-gray-600">
                Established in the business, looking for efficiency and better rates
              </p>
              <div className="mt-2 text-sm text-green-600">
                • Advanced tools
                • Volume discounts
                • Priority support
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={() => setStep('userType')}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ← Back
        </button>
      </div>
    </div>
  );

  const renderVolumeStep = () => (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 max-w-lg mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Monthly Volume</h2>
        <p className="text-gray-600">How many vehicles do you typically ship per month?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleVolumeSelect(5)}
          className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
        >
          <div className="text-lg font-semibold">3-10</div>
          <div className="text-sm text-gray-600">Small Scale</div>
        </button>

        <button
          onClick={() => handleVolumeSelect(25)}
          className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-center"
        >
          <div className="text-lg font-semibold">10-50</div>
          <div className="text-sm text-gray-600">Medium Scale</div>
        </button>

        <button
          onClick={() => handleVolumeSelect(75)}
          className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-center"
        >
          <div className="text-lg font-semibold">50-100</div>
          <div className="text-sm text-gray-600">Large Scale</div>
        </button>

        <button
          onClick={() => handleVolumeSelect(150)}
          className="p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all text-center"
        >
          <div className="text-lg font-semibold">100+</div>
          <div className="text-sm text-gray-600">Enterprise</div>
        </button>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Volume Benefits</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Higher volume = Better rates</li>
          <li>• Dedicated account manager</li>
          <li>• Priority scheduling</li>
          <li>• Custom payment terms</li>
        </ul>
      </div>

      <div className="text-center">
        <button
          onClick={() => setStep('experience')}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ← Back
        </button>
      </div>
    </div>
  );

  const renderLoginStep = () => (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 max-w-md mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to your account</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={() => setStep('initial')}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ← Back
        </button>
      </div>

      <div className="text-center text-sm text-gray-500 border-t pt-4">
        Don't have an account?{' '}
        <button
          onClick={() => setStep('userType')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Join now
        </button>
      </div>
    </div>
  );

  const steps = {
    initial: renderInitialStep,
    userType: renderUserTypeStep,
    experience: renderExperienceStep,
    volume: renderVolumeStep,
    login: renderLoginStep
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {steps[step]()}
        </div>
      </div>
    </div>
  );
}