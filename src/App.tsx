import React, { useState, useRef } from 'react';
import { Coins, Star, Crown, Diamond, Gem, CreditCard } from 'lucide-react';

function PricingCard({ 
  title, 
  profitPercentage,
  minDeposit,
  maxDeposit,
  minWithdraw,
  recommended = false,
  onChoosePlan
}: { 
  title: string;
  profitPercentage: number;
  minDeposit: number;
  maxDeposit: number;
  minWithdraw: number;
  recommended?: boolean;
  onChoosePlan: () => void;
}) {
  return (
    <div className={`relative backdrop-blur-xl bg-[#0a192f]/40 rounded-3xl p-8 border border-[#1e3a8a]/30 shadow-xl transition-all hover:transform hover:scale-105 hover:bg-[#0a192f]/60 ${
      recommended ? 'border-[#3b82f6]/50 shadow-[#3b82f6]/10' : ''
    }`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#3b82f6] text-white px-4 py-1 rounded-full text-sm font-medium">
          Recommended
        </div>
      )}
      <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
      <div className="mb-8">
        <span className="text-6xl font-bold text-[#3b82f6]">{profitPercentage}%</span>
        <span className="text-gray-400 block mt-2">Of the profits</span>
      </div>
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-gray-300">
          <span>Min Deposit</span>
          <span className="text-[#3b82f6]">${minDeposit} USD</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Max Deposit</span>
          <span className="text-[#3b82f6]">${maxDeposit} USD</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Min Withdraw</span>
          <span className="text-[#3b82f6]">${minWithdraw} USD</span>
        </div>
      </div>
      <button 
        onClick={onChoosePlan}
        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all ${
          recommended 
            ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white' 
            : 'bg-[#1e3a8a]/30 hover:bg-[#1e3a8a]/50 text-white border border-[#3b82f6]/30'
        }`}
      >
        Make Deposit
      </button>
    </div>
  );
}

function App() {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'argent'
  });
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const plans = [
    {
      title: 'ARGENT PACK',
      profitPercentage: 60,
      minDeposit: 50,
      maxDeposit: 50,
      minWithdraw: 50,
      icon: Star
    },
    {
      title: 'GOLD PACK',
      profitPercentage: 65,
      minDeposit: 50,
      maxDeposit: 50,
      minWithdraw: 50,
      icon: Coins
    },
    {
      title: 'PLATINUM PACK',
      profitPercentage: 70,
      minDeposit: 50,
      maxDeposit: 50,
      minWithdraw: 50,
      recommended: true,
      icon: Crown
    },
    {
      title: 'DIAMOND PACK',
      profitPercentage: 75,
      minDeposit: 50,
      maxDeposit: 50,
      minWithdraw: 50,
      icon: Diamond
    },
    {
      title: 'VIP PACK',
      profitPercentage: 80,
      minDeposit: 3000,
      maxDeposit: 50,
      minWithdraw: 50,
      icon: Gem
    }
  ];

  return (
    <div className="min-h-screen bg-[#020817] bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-fixed bg-center bg-no-repeat text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]">
            Investment Plans
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            You cannot withdraw from your principal balance until at least one month has passed from the deposit date. However, you can withdraw the profits earned during this period.
          </p>
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setBillingPeriod('monthly')}
                className={`text-gray-400 hover:text-white transition-colors ${billingPeriod === 'monthly' ? 'text-white' : ''}`}
              >
                Monthly
              </button>
              <div 
                onClick={() => setBillingPeriod(prev => prev === 'monthly' ? 'annually' : 'monthly')}
                className="w-12 h-6 bg-[#1e3a8a] rounded-full p-1 cursor-pointer"
              >
                <div className={`w-4 h-4 bg-[#3b82f6] rounded-full transition-transform ${billingPeriod === 'annually' ? 'translate-x-6' : ''}`}></div>
              </div>
              <button 
                onClick={() => setBillingPeriod('annually')}
                className={`text-gray-400 hover:text-white transition-colors ${billingPeriod === 'annually' ? 'text-white' : ''}`}
              >
                Annually
              </button>
            </div>
            <span className="bg-[#1e3a8a]/50 text-[#3b82f6] px-3 py-1 rounded-full text-sm">
              25% off
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              profitPercentage={plan.profitPercentage}
              minDeposit={plan.minDeposit}
              maxDeposit={plan.maxDeposit}
              minWithdraw={plan.minWithdraw}
              recommended={plan.recommended}
              onChoosePlan={scrollToForm}
            />
          ))}
        </div>

        <div ref={formRef} className="max-w-xl mx-auto backdrop-blur-xl bg-[#0a192f]/40 rounded-3xl p-8 border border-[#1e3a8a]/30">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]">
            Start Investing Today
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1e3a8a]/20 border border-[#3b82f6]/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1e3a8a]/20 border border-[#3b82f6]/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50"
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="plan" className="block text-sm font-medium text-gray-300 mb-2">
                Select Plan
              </label>
              <select
                id="plan"
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1e3a8a]/20 border border-[#3b82f6]/20 text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50"
              >
                {plans.map(plan => (
                  <option key={plan.title.toLowerCase()} value={plan.title.toLowerCase()}>
                    {plan.title} - {plan.profitPercentage}% Profit Share
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="h-5 w-5" />
              Make Deposit Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;