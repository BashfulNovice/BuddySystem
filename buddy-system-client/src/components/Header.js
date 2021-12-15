import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../component-styles/header.css'


export default function Header({currentUser}) {

    const logOut = () => {
        fetch('http://localhost:3000/login', {
            method: 'DELETE'
        })
    }

    return (
        <div className = 'header-container'>
            <h2 className = 'buddy-system'>Buddy system</h2>
            <ul>
                <p className = 'header-item'>Home</p>
                <p className = 'header-item'>Profile</p>
                {currentUser? <Link to="/" ><p onClick={logOut}>Log Out</p></Link> : <Link to="/" ><p>Log In</p></Link>}
            </ul>
        </div>

    )
}