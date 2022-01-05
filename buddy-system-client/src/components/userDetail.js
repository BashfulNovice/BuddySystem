import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"


export default function UserDetail({currentUser}) { 
    
    const { user_id } = useParams()

    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3000/users/${user_id}`, {
          credentials: 'include'
        }).then(res => res.json())
          .then(info => setUserInfo(info))
      }
    , []);

    if (!userInfo) return <h1>Loading</h1>
    if (!currentUser) return <h1>You are not logged in!</h1>

    return(
        <div className = "profile-page" >
            <div className = 'profile-info-container'>
                    <img className = 'profile-pic' src = {userInfo.profile_pic} ></img>
                    <h3>Name: {userInfo.name}</h3>
                    <p>Age: {userInfo.age}</p>
                    <p>Gender: {userInfo.gender}</p>
                    <p>Area: {userInfo.city}</p>
                    <p>Primary Activity: {userInfo.activity}</p>
                    <p>Bio: {userInfo.bio}</p>
                </div>
        </div>
    )
}