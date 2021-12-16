import {useState, useEffect} from 'react'


export default function profile({currentUser}) {
    return (
        <div>
            <h1>{currentUser.id}</h1>
        </div>

    )
}