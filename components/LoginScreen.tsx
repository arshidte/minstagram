
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('react_dev');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin(username);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-ig-dark-bg">
      <div className="w-full max-w-sm p-8 space-y-8 bg-ig-dark-secondary-bg rounded-xl shadow-lg">
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-ig-primary-text">Insta-Lite Focus</h1>
            <p className="mt-2 text-ig-secondary-text">Your content, your performance.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="text-sm font-medium text-ig-secondary-text">
              Instagram Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-ig-primary-text bg-ig-dark-tertiary-bg border border-ig-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-ig-accent"
              placeholder="e.g. react_dev"
              required
            />
          </div>
          <div>
            <label htmlFor="password"  className="text-sm font-medium text-ig-secondary-text">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-ig-primary-text bg-ig-dark-tertiary-bg border border-ig-dark-border rounded-md focus:outline-none focus:ring-2 focus:ring-ig-accent"
              placeholder="••••••••"
              required
            />
          </div>
           <p className="text-xs text-center text-ig-secondary-text">This is a demo. Any username/password will work.</p>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 text-white font-semibold bg-ig-accent rounded-md hover:bg-ig-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ig-dark-secondary-bg focus:ring-ig-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};
