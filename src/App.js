import './App.css';
import UserManagement from '../src/Components/UserManagement'
import { useState, useEffect } from 'react';
import { MyLogin } from './Components/Login';
import ConditionalAccess from './ConditionalAccess';
import TicketsPage from './Components/TicketsPage';
import AnalyticsPage from './Components/AnalyticsPage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [component, setComponent] = useState();
  
  const [user, setuserName] = useState(null); // Initialize as null
  const [currentComponent, setCurrentComponent] = useState(null); // Track the currently displayed component
  const accessList = [
    { text: "Users", component: <UserManagement />, role: ["admin"] },
    { text: "Analytics", component: <ConditionalAccess user={user} page="analytics" />, role: ["admin", "manager"] },
    { text: "Tickets", component: <ConditionalAccess user={user} page="tickets" />, role: ["admin", "support", "manager"] },
  ];
  const getComponentByRole = (role) => {
    switch (role) {
      case 'admin':
        return <UserManagement />;
      case 'support':
        return <TicketsPage />;
      case 'manager':
        return <AnalyticsPage />;
      default:
        return null; // Or a default component if needed
    }
  };

  const handleComponentClick = (component) => {
    setCurrentComponent(component);
  };
    useEffect(() => {
    // console.log(user);
    // Set the initial component based on the user's role
    if (user) {
      setCurrentComponent(getComponentByRole(user.role));
    }
  }, [user]);

  return (
    <div className="flex flex-col h-screen"> {/* Use flex-col for vertical layout */}
      {!isLoggedIn ? (
        <MyLogin user={user} setuser={setuserName} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <>
          <nav className="bg-blue-500 p-4"> {/* Top Navigation Bar */}
            <ul className="flex space-x-4">
              {accessList
                .filter((access) => access.role.includes(user.role))
                .map((access) => (
                  <li key={access.text}>
                    <button onClick={() => handleComponentClick(access.component)}>
                      {access.text}
                    </button>
                  </li>
                ))}
            </ul>
          </nav>
          <div className="flex-grow p-4 overflow-auto"> {/* Main Content Area */}
            {currentComponent}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

