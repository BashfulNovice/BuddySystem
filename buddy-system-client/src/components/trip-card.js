//import {useState, useEffect} from 'react'
import '../component-styles/trip-card.css'
export default function TripCard({trip}) {


const testCard = () => {
    console.log(trip)
}



return (
    <div className = "trip-card">
        <h2>{trip.title}</h2>
        <h3>Hosted by: {trip.host.name}</h3>
        <p>Date: {trip.start}</p>
        <p>Requirements: {trip.requirements}</p>
        <p>Details: {trip.description}</p>
        <p>Maximum Participants: {trip.max_participants}</p>
        <p>Minimum Participants: {trip.minimum_participants}</p>
        <ul>Curent Participants: {trip.users.length}</ul>
        {trip.users.map(user => <li key = {user.id}>{user.name}</li>)}
        <button onClick = {testCard}>Card Test!</button>
    </div>




)



}