import React, { useEffect, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { sampleData } from '../data/sampleData';
import { loginData } from '../data/LoginData';

export const MyLogin = ({ setIsLoggedIn, setUser }) => {
    const [user, setLocalUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);
      if (!user) {  
          setError('Username is required.');
          setIsLoading(false);
          return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      try {
          // In this frontend project, we are making the password same as the username
           // for demonstration purposes only. 
           // No actual authentication is being implemented.

        //   if (password !== user) {
        //       throw new Error("Password must be same as username for this demo.");
        //   }

          const userMatch = loginData.filter(savedUser=> savedUser.email === user)
          
          if(userMatch.length <=0){
            throw new Error("User Not Found");
          }else if(userMatch[0].password !== password){
            throw new Error("Incorrect Password");
          }

        
          setUser({name : user, role: userMatch[0].role});
       
        //   loginData
          setIsLoggedIn(true);
      } catch (error) {
          setError(error.message);
      } finally {
          setIsLoading(false);
      }
  }; 
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r bg-blue-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-5xl text-center font-bold text-black mb-4">VRV Security</h1> 
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">Sign in to your account</h2>
        </div>
       
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-10">

         <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                        Username
                    </label>
                     <div className="mt-2">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            value={user}
                            onChange={(e) => setLocalUser(e.target.value)} 
                            className="block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            // className="input-field px-3 py-2"
                         />
                    </div>
                 </div>

                 <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                         Password
                    </label>
                    <div className="mt-2 relative"> 
                         <input
                             id="password"
                             name="password"
                             type={showPassword ? 'text' : 'password'}
                             autoComplete="current-password"
                             required
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             className="block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10" // Added pr-10 for icon spacing
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-800 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                             >
                               {showPassword ? (
                                  <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                                 ) : (
                                  <EyeIcon className="h-5 w-5" aria-hidden="true" />
                               )}
                             </button>
                         </div>
                     </div>
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                 <div>
                        <button
                            type="submit"
                           disabled={isLoading} 
                           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        {isLoading ? (
                             <span className="inline-flex items-center justify-center">
                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                             <span> signing in..</span> 
                         </span> ) : "Sign In"}
                         </button>
                     </div>
             </form>
         </div>
        </div>
    </div>
  );
};
