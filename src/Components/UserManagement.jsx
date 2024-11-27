
import { useState } from 'react';
import MemberList from './MemberList.jsx';
import MemberForm from './MemberForm.jsx';
import Stats from './Stats.jsx';
import { sampleData } from '../data/sampleData.jsx';
import { Users } from 'lucide-react';

function UserManagement({user}) {
  const [members, setMembers] = useState(sampleData);
  
  const addMember = (email, role, permissions) => { // Updated to accept permissions
    const newMember = {
        id: crypto.randomUUID(),
        email,
        role,
        joinedAt: new Date().toISOString(),
        permissions: permissions, // Add permissions to the new member object
    };

    setMembers([...members, newMember]);
  };

  const removeMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const updateMemberPermissions = (id, newPermissions) => {
    setMembers(members.map(member =>
        member.id === id ? { ...member, permissions: newPermissions } : member
    ));
};

  const updateMemberRole = (id, newRole) => {
    setMembers(
      members.map(member =>
        member.id === id ? { ...member, role: newRole } : member
      )
    );
  };

  const existingEmails = new Set(members.map(m => m.email.toLowerCase()));

  return  (
    <div className="min-h-screen py-12 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Team Management
          </h1>
          <p className="text-gray-600">
            Manage your team members and their roles efficiently
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex justify-between flex-row items-center space-x-3">
                <div className=" flex p-2 bg-indigo-50 rounded-lg">
                  <Users className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                  Team Members
                  </h2>
                </div>
                <i className="text-xl font-semibold text-gray-900">
                  {user}
                </i>
              </div>
            </div>
            
            <MemberForm onAdd={addMember} existingEmails={existingEmails} />

            <Stats members={members} />

            <div className="px-6 py-4">
              <MemberList
                members={members}
                onRemove={removeMember}
                onUpdateRole={updateMemberRole}
                onUpdatePermissions={updateMemberPermissions} // Pass the function
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default UserManagement;
