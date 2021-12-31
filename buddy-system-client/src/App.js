import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Landing from './components/landing.js'
import Header from './components/Header.js'
import Profile from'./components/profile.js'
import Home from './components/home.js'
import UserDetail from './components/userDetail';
import TripDetail from './components/tripDetail';



function App() {

  // State
  const [currentUser, setCurrentUser] = useState(null)
  const [rerender, setRerender] = useState(true) 
  const [tripList, setTripList] = useState([])
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

  useEffect(() => {
    fetch('http://localhost:3000/trips', {
      credentials: 'include'
    }).then(res => res.json())
      .then(trips => setTripList(trips))
  }
  , [rerender]);

  // Functions

  const topLevelTest = () => {
    // let temp = [...tripList]
    // let to_be_replaced = temp.find(trip => trip.id ===3)
    // let index = temp.indexOf(to_be_replaced)
    // console.log(temp)
    // console.log(index)
    console.log(tripList)
  }

  const profile_filter = () => {
    if (currentUser){
    let temp = tripList.filter(trip => trip.users.find(user => user.id === currentUser.id))
    return temp
  }}

  return (
    <div className="App">
      <Header currentUser= {currentUser} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route path = '/' element = {<Landing currentUser = {currentUser} setCurrentUser = {setCurrentUser} />} />
        <Route path = '/home' element = {<Home tripList = {tripList} setTripList = {setTripList} rerender = {rerender} setRerender = {setRerender} currentUser = {currentUser}/>} />
        <Route path = '/profile' element = {<Profile profileList={profile_filter()} tripList = {tripList} setTripList = {setTripList} rerender = {rerender} setRerender = {setRerender} currentUser = {currentUser}/>} />
        <Route path = '/user/:user_id' element = {<UserDetail currentUser = {currentUser} />} />
        <Route path = '/trip/:trip_id' element = {<TripDetail currentUser = {currentUser}/>} />
      </Routes>
      {/* <button onClick = {topLevelTest}>TopLevelTest</button> */}
    </div>
  );
}

export default App;
