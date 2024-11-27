import React from 'react';
import AnalyticsPage from './Components/AnalyticsPage';
import TicketsPage from './Components/TicketsPage';


const ConditionalAccess = ({ user, page }) => {
  // Define which roles have access to each page
  const accessRules = {
    'analytics': ['admin', 'manager'],
    'tickets': ['admin', 'support', 'manager'],
  };

  const hasAccess = accessRules[page]?.includes(user.role);

  return (
    <div className={`member-card ${hasAccess ? '' : 'hidden'}`}>
      {hasAccess ? (
        page === 'analytics' ? <AnalyticsPage /> : <TicketsPage />
      ) : (
          <div className="flex flex-col items-center justify-center p-6">
            <img
              src={"https://media.istockphoto.com/id/1929916076/photo/work-in-progress.jpg?s=612x612&w=0&k=20&c=2hD7jju8ev7uYEakRZZanOfFUIabxOQgZHqnJovQ6Cs="}
              alt="Under Construction"
              className="max-h-64 rounded-lg shadow-lg"
            />
            <p className="text-center mt-4 text-gray-600">
              This page is under construction.  Please wait.
            </p>
          </div>
      )}
    </div>
  );
};

export default ConditionalAccess;