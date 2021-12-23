//import {useState, useEffect} from 'react'
import '../component-styles/trip-card.css'
export default function TripCard({trip, currentUser, rerender, setRerender, tripList, setTripList}) {


const testCard = () => {
    console.log(trip.users[0])
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
}

const leaveTrip = () => {
    // console.log(trip.participants.find(participant => participant.user_id === currentUser.id).id)
    let participant_id = trip.participants.find(participant => participant.user_id === currentUser.id).id
    fetch(`http://localhost:3000/participants/${participant_id}`, {
        method: 'DELETE',
        credentials: 'include',
    })
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
        <ul className = 'participant-list'>Curent Participants: {trip.users.length}</ul>
        {trip.users.map(user => <li key = {user.id}>{user.name}</li>)}
        {trip.users.find(user => user.id = currentUser.id)? <button onClick = {leaveTrip}>Leave Trip</button> : <button onClick = {joinTrip}>Join Trip</button>}
        <button onClick = {testCard}>Card Test!</button>
    </div>




)



}