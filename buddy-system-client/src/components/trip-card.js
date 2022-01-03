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
        return (<button className = 'trip-delete' onClick = {deleteTrip}>X</button>)
    }
}

const renderJoin = () => {
    if (participant) {
        return <button className = 'card-action-bttn' onClick = {leaveTrip}>Leave Trip</button>
    }
    else if(trip.current_participants === trip.max_participants){
        return <p className = 'card-action-bttn'>Trip Full</p>
    }
    else {
        return <button className = 'card-action-bttn' onClick = {joinTrip}>Join Trip</button>
    }
}
let participant = trip.users.length > 0 &&trip.users.find(user => user.id === currentUser.id)
return (
    <div className = "trip-card">
        <h2 className = 'card-title'>{trip.title}</h2>
        {renderDelete()}
        <div className = 'host-date'>
            <h3 className = 'card-host'>Hosted by: {trip.host.name}</h3>
            <p className = 'trip-date'>Date: {trip.start}</p>
        </div>
        <p className = 'card-item' ><strong>Requirements:</strong>{trip.requirements}</p>
        <p className = 'card-item' ><strong>Details:</strong> {trip.description}</p>
        <p className = 'card-item' >Maximum Participants: {trip.max_participants}</p>
        <p className = 'card-item' >Minimum Participants: {trip.minimum_participants}</p>
        <p className = 'card-item' >Curent Participants: {trip.users.length}</p>
        <ul className = 'participant-list'> 
        {trip.users.map(user => <div className = 'user-tag'><img src={user.profile_pic} width="40" height="40" /><Link className = 'user-link' to = {`/user/${user.id}`} key = {user.id}>{user.name}</Link></div>)}
        </ul>
        <div className = 'card-actions'>
            {renderJoin()}
            <Link to = {`/trip/${trip.id}`}>Trip Details</Link>
        </div>
        {/* {trip.users.find(user => user.id = currentUser.id)? <button onClick = {leaveTrip}>Leave Trip</button> : <button onClick = {joinTrip}>Join Trip</button>} */}
        {/* <button onClick = {testCard}>Card Test!</button> */}
    </div>



)



}