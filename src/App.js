import logo from './logo.svg';
import './App.css';
import UserManagement from './Components/UserManagement';
import { useEffect, useState } from 'react';
import { LogIn } from 'lucide-react';
import { MyLogin } from './Components/Login';
import { TicketsPage } from './Components/TicketsPage';
import { Analatyics } from './Components/Analatyics';

function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set default state for login
  const [state, setState] = useState(false); 
  const [user, setUserName] = useState({email:"sdfsfd", role:"admin"}); 

  const accessList =[
  {  text: "user management",component: <UserManagement/> , role: ["admin"]},
    {text: "Analytics",component: <Analatyics/> , role: ["admin","manager"]},
   { text: "Tickets",component: <TicketsPage/> , role: ["admin","support","manager"]},
  ]

  useEffect(()=>{
    console.log(user)
},[user])


  return isLoggedIn ? (
    <div className=' flex  '>
      <div className=' w-72 h-screen  bg-blue-200 flex flex-col gap-3'>
     {accessList.filter((access)=> access.role.includes(user.role) ).map(comp=>(
      <button onClick={(e)=> setState(comp.component)}>{comp.text}</button>
))}


      </div>
      <div className=' flex-grow '>
    {state}
      </div>

    </div>
  ): <MyLogin user={user} setUser={setUserName} setIsLoggedIn={setIsLoggedIn}/>

  
  
}

export default App;

