import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Landing from './components/landing.js'
import Header from './components/Header.js'
import Profile from'./components/profile.js'
import Home from './components/home.js'



function App() {

  // State
  const [currentUser, setCurrentUser] = useState(null)

  // Effects
  useEffect(() => {
    fetch('http://localhost:3000/whoami', {
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        response.json()
        //.then(user => console.log(user))
        .then(user => setCurrentUser(user))
      }
    });
  }, []);

  // Functions

  return (
    <div className="App">
      <Header currentUser= {currentUser} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route path = '/' element = {<Landing currentUser = {currentUser} setCurrentUser = {setCurrentUser} />} />
        <Route path = '/home' element = {<Home currentUser = {currentUser}/>} />
        <Route path = '/profile' element = {<Profile currentUser = {currentUser}/>} />
      </Routes>
    </div>
  );
}

export default App;
