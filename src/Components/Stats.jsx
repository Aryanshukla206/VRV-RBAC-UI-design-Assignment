import React from 'react';



export default function Stats({ members }) {
  const stats = {
    total: members.length,
    admin: members.filter(m => m.role === 'admin').length,
    manager: members.filter(m => m.role === 'manager').length,
    support: members.filter(m => m.role === 'support').length,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100 border-b border-gray-100 ">
      <div className="px-6 py-4">
        <p className="text-sm font-medium text-gray-500">Total Members</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.total}</p>
      </div>
      <div className="px-6 py-4">
        <p className="text-sm font-medium text-gray-500">admin</p>
        <p className="mt-1 text-2xl font-semibold text-purple-600">{stats.admin}</p>
      </div>
      <div className="px-6 py-4">
        <p className="text-sm font-medium text-gray-500">manager</p>
        <p className="mt-1 text-2xl font-semibold text-blue-600">{stats.manager}</p>
      </div>
      <div className="px-6 py-4">
        <p className="text-sm font-medium text-gray-500">support</p>
        <p className="mt-1 text-2xl font-semibold text-green-600">{stats.support}</p>
      </div>
      
    </div>
  );
}