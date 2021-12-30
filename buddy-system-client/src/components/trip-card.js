//import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import '../component-styles/trip-card.css'
export default function TripCard({trip, currentUser, rerender, setRerender, tripList, setTripList}) {


const testCard = () => {
    console.log(currentUser)
    console.log(trip)
}

const participants = () => {
    return trip.users
}

const joinTrip = () => {
    // console.log("joining!")
    fetch('http://localhost:3000/participants', {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: currentUser.id,
            trip_id: trip.id
        })
    })
    .then(res => res.json())
    .then((trip) => {
        let temp = [...tripList]
        let to_be_replaced = temp.find(element => element.id ===trip.id)
        let index = temp.indexOf(to_be_replaced)
        temp[index] = trip
        setTripList(temp)
    })
    // .then(setRerender(!rerender))
    //.then(data => console.log(data))
}

const leaveTrip = () => {
    // console.log(trip.participants.find(participant => participant.user_id === currentUser.id).id)
    let participant_id = trip.participants.find(participant => participant.user_id === currentUser.id).id
    fetch(`http://localhost:3000/participants/${participant_id}`, {
        method: 'DELETE',
        credentials: 'include',
    })
    .then(res => res.json())
    .then((trip) => {
        let temp = [...tripList]
        let to_be_replaced = temp.find(element => element.id ===trip.id)
        let index = temp.indexOf(to_be_replaced)
        temp[index] = trip
        setTripList(temp)
    })
    // .then(setRerender(!rerender))
    //.then(data => console.log(data))
}

const deleteTrip = () => {
    let temp = [...tripList];
    //console.log(temp)
    fetch(`http://localhost:3000/trips/${trip.id}`, {
        method: 'DELETE',
        credentials: 'include',
    }).then( () => {
        let index = temp.indexOf(trip)
        temp.splice(index, 1)
        //console.log(temp)
        setTripList(temp)
    })
}

const renderDelete = () => {
    if (trip.host.id === currentUser.id) {
        return (<button onClick = {deleteTrip}><h1>X</h1></button>)
    }
}

const renderJoin = () => {
    if (participant) {
        return <button onClick = {leaveTrip}>Leave Trip</button>
    }
    else if(trip.current_participants === trip.max_participants){
        return <p>Trip Full</p>
    }
    else {
        return <button onClick = {joinTrip}>Join Trip</button>
    }
}
let participant = trip.users.length > 0 &&trip.users.find(user => user.id === currentUser.id)
return (
    <div className = "trip-card">
        <h2>{trip.title}</h2>
        {renderDelete()}
        <h3>Hosted by: {trip.host.name}</h3>
        <p>Date: {trip.start}</p>
        <p>Requirements: {trip.requirements}</p>
        <p>Details: {trip.description}</p>
        <p>Maximum Participants: {trip.max_participants}</p>
        <p>Minimum Participants: {trip.minimum_participants}</p>
        <ul className = 'participant-list'>Curent Participants: {trip.users.length}
        {trip.users.map(user => <li><Link to = {`/user/${user.id}`} key = {user.id}>{user.name}</Link></li>)}
        </ul>
        {renderJoin()}
        {/* {trip.users.find(user => user.id = currentUser.id)? <button onClick = {leaveTrip}>Leave Trip</button> : <button onClick = {joinTrip}>Join Trip</button>} */}
        <button onClick = {testCard}>Card Test!</button>
    </div>




)



}