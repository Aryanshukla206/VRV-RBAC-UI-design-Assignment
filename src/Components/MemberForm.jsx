import React, { useState } from 'react';
import { UserPlus, AlertCircle } from 'lucide-react';

export default function MemberForm({ onAdd, existingEmails }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();

    if (existingEmails.has(trimmedEmail)) {
      setError('This email is already in use.');
      return;
    }

    onAdd(trimmedEmail, role); // Pass only email and role
    setEmail('');
    setRole('member');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="px-2 py-2 border-b border-gray-100">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className={`input-field px-3 py-2.5 w-96 ${error ? 'border-red-300 pr-10' : ''}`}
              placeholder="Enter member's email"
              required
            />
            {error && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {error && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              {error}
            </p>
          )}
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="input-field !px-3 sm:w-40"
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="support">support</option>
        </select>

        <button type="submit" className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Member
        </button>
      </div>
    </form>
  );
}
