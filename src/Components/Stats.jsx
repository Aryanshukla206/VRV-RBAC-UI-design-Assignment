import React from 'react';



export default function Stats({ members }) {
  const stats = {
    total: members.length,
    owners: members.filter(m => m.role === 'owner').length,
    admins: members.filter(m => m.role === 'admin').length,
    members: members.filter(m => m.role === 'member').length,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-gray-100 border-b border-gray-100 ">
      <div className="px-4 py-4">
        <p className="text-sm font-medium text-gray-500">Total Members</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.total}</p>
      </div>
      <div className="px-4 py-4">
        <p className="text-sm font-medium text-gray-500">Administrator</p>
        <p className="mt-1 text-2xl font-semibold text-purple-600">{stats.Administrator}</p>
      </div>
      <div className="px-4 py-4">
        <p className="text-sm font-medium text-gray-500">Manager</p>
        <p className="mt-1 text-2xl font-semibold text-blue-600">{stats.admins}</p>
      </div>
      <div className="px-4 py-4">
        <p className="text-sm font-medium text-gray-500">Support</p>
        <p className="mt-1 text-2xl font-semibold text-green-600">{stats.members}</p>
      </div>
      <div className="px-4 py-4">
        <p className="text-sm font-medium text-gray-500">User</p>
        <p className="mt-1 text-2xl font-semibold text-green-600">{stats.members}</p>
      </div>
    </div>
  );
}