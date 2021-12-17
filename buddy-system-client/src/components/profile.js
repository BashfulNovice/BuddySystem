import {useState, useEffect} from 'react'
import '../component-styles/profile.css'


export default function Profile({currentUser}) {

    //State

    const [displayedUser, setDisplayedUser] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3000/users/${currentUser.id}`, {
          credentials: 'include'
        }).then((response) => {
          if (response.ok) {
            response.json()
            //.then(user => console.log(user))
            .then((user) => {
                setDisplayedUser(user)
                console.log(user)})
          }
        });
      }, []);

    const testProfile = ()=> {
        console.log(displayedUser)
    }

    if (!displayedUser.name)
        {return <><h1>Loading</h1><button onClick = {testProfile}>Profile test</button></>}
    return (
        <div className = 'profile-page'>
            <div className = 'profile-info-container'>
                <img className = 'profile-pic' src = {displayedUser.profile_pic} ></img>
                <h1>test1</h1>
                <h1>test2</h1>
            </div>
            <div className = 'profile-trips-container'>
                <h1>test3</h1>
                <h1>test4</h1>
                <button onClick = {testProfile}>Profile test</button>
            </div>
            
        </div>
        
    )
}