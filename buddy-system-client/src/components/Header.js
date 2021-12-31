import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../component-styles/header.css'


export default function Header({currentUser, setCurrentUser}) {

    const logOut = () => {
        fetch('http://localhost:3000/logout', {
            method: 'DELETE',
            credentials: "include"
        })
        setCurrentUser(null)
    }

    return (
        <div className = 'header-container'>
            <h2 className = 'buddy-system'>Buddy system</h2>
            <ul>
                {currentUser? 
                    <>
                        <Link className = "link" to="/home" ><p>Home</p></Link>
                        <Link className = "link" to="/profile" ><p>Profile</p></Link>
                        <Link className = "link" to="/" ><p onClick={logOut}>Log Out</p></Link>
                    </>
                        :
                    <>
                        <p>Home</p>
                        <p>Profile</p>
                        <Link className = "link" to="/" ><p>Log In</p></Link>
                    </>
                }
                {/* <p className = 'header-item'>Home</p>
                <p className = 'header-item'>Profile</p>
                {currentUser? <Link to="/" ><p onClick={logOut}>Log Out</p></Link> : <Link to="/" ><p>Log In</p></Link>} */}
            </ul>
        </div>

    )
}