import React, { useState } from 'react';
import { X, Edit2, Check, AlertCircle } from 'lucide-react';

export default function MemberList({
  members,
  onRemove,
  onUpdateRole,
  onUpdatePermissions,
}) {
  const [editingPermissions, setEditingPermissions] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState('');

  const getRoleBadgeStyles = (role) => {
    const styles = {
      owner: 'bg-purple-50 text-purple-700 ring-1 ring-purple-700/10',
      admin: 'bg-blue-50 text-blue-700 ring-1 ring-blue-700/10',
      member: 'bg-green-50 text-green-700 ring-1 ring-green-700/10',
    };
    return `role-badge ${styles[role]}`;
  };

  const togglePermission = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  const savePermissions = (memberId) => {
    if (!permissions.length) {
      setError('At least one permission is required');
      return;
    }
    onUpdatePermissions(memberId, permissions);
    setEditingPermissions(null);
    setError('');
  };

  const handleEditPermissions = (member) => {
    setEditingPermissions(member.id);
    setPermissions(member.permissions || []);
  };

  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-sm">No team members added yet</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {members.map((member) => (
        <li key={member.id} className="slide-up">
        <div className="member-card group">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {member.email}
              </p>
              <div className="flex items-center mt-1 space-x-2">
                <select
                  value={member.role}
                  onChange={(e) => onUpdateRole(member.id, e.target.value )}
                  className={`${getRoleBadgeStyles(member.role)} cursor-pointer appearance-none pr-6`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.25rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                  <option value="owner">Owner</option>
                </select>
                <Edit2 className="h-3.5 w-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <button
              onClick={() => onRemove(member.id)}
              className="ml-4 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
              title="Remove member"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </li>
      ))}
    </ul>
  );
}
