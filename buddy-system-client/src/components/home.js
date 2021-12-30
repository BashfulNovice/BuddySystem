import {useState, useEffect} from 'react'
import '../component-styles/home.css'
import MapContainer from './map-container'
import TripCard from './trip-card'

export default function Home({currentUser, rerender, setRerender, tripList, setTripList}) {

    //State
    // const [displayedTrips, setDisplayedTrips] = useState([])
    const [creating, setCreating] = useState(false)
    const [tripData, setTripData] = useState({
        title: '',
        latitude: '',
        longitude: '',
        description: '',
        requirements: '',
        max_participants: '',
        minimum_participants: '',
        start: '',
        end: ''
    })


    // useEffect(() => {
    //     fetch("http://localhost:3000/trips", {
    //         credentials: "include"
    //     })
    //     .then(res => res.json())
    //     .then((trips) => {
    //         setTripList(trips)
    //         //setDisplayedTrips(trips)
    //     })
    // }, []);

    //Functions/methods
    const homeTest = () => {
        console.log(tripList)
    }
    
    const toggleCreate = () => {
        setCreating(!creating)
    }

    const handleTripChange = (e) => {
        setTripData({...tripData, [e.target.name]: e.target.value})
    }

    const createNewTrip = (e, tripData) => {
        
            e.preventDefault()
            const {title, latitude, longitude, description, requirements, max_participants, minimum_participants, start, end} = tripData
            const host_user = currentUser.id
    
            fetch('http://localhost:3000/trips', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title, 
                    latitude,
                    longitude,
                    host_user,
                    description,
                    requirements,
                    max_participants,
                    minimum_participants,
                    start,
                    end,
                })
            })
            .then(res => res.json())
            .then(trip => setTripList([...tripList, trip]))
        }
        
    

    const renderForm = () => {
        if (creating) {
            return (<div className = "trip-add-form-background">
            <button onClick = {toggleCreate}>Cancel</button>
            <form className = "trip-add-form" onSubmit = {(e) => createNewTrip(e, tripData)}>
                <label for = "make-title">Trip Title</label>
                    <input
                        type='text'
                        className='input-field'
                        id = 'make-title'
                        name = 'title'
                        value={tripData.title}
                        placeholder='Title'
                        onChange={(e) => handleTripChange(e)}
                        >
                    </input>
                <label for = "make-lat">Trip Start Latitude</label>
                    <input
                        type='text'
                        className='input-field'
                        id = 'make-lat'
                        name = 'latitude'
                        value={tripData.latitude}
                        placeholder='Latitude'
                        onChange={(e) => handleTripChange(e)}
                        >
                    </input>
                <label for = "make-lng">Trip Start Longitude:</label>
                    <input
                        type='text'
                        className='input-field'
                        id = 'make-lng'
                        name = 'longitude'
                        value={tripData.longitude}
                        placeholder='Longitude'
                        onChange={(e) => handleTripChange(e)}
                        >
                    </input>
                <label for = "make-description">Trip Description:</label>
                    <input
                        type='text'
                        className='input-field'
                        id = 'make-description'
                        name = 'description'
                        value={tripData.description}
                        placeholder='description'
                        onChange={(e) => handleTripChange(e)}
                        >
                    </input>
                <label for = "make-requirements">Participant Requirements:</label>
                    <input
                        type='text'
                        className='input-field'
                        id = 'make-requirements'
                        name = 'requirements'
                        value={tripData.requirements}
                        placeholder='Requirements'
                        onChange={(e) => handleTripChange(e)}
                        >
                    </input>
                <label for="max_participants">Max Number of Participants:</label>
                    <input 
                        type="number" 
                        id="max_participants" 
                        name="max_participants" 
                        min="2" max="25"
                        className = "input-field"
                        value = {tripData.max_participants}
                        placeholder = "Max Participants"
                        onChange={(e) => handleTripChange(e)}
                        >  
                    </input>
                <label for="minimum_participants">Max Number of Participants:</label>
                    <input 
                        type="number" 
                        id="minimum_participants" 
                        name="minimum_participants" 
                        min="2" max="25"
                        className = "input-field"
                        value = {tripData.minimum_participants}
                        placeholder = "Minimum Participants"
                        onChange={(e) => handleTripChange(e)}
                        >  
                    </input>
                <label for="make-start">Start date:</label>
                    <input type="date" id="make-start" name="start"
                        value={tripData.start}
                        min="2022-01-01" max="2023-12-30"
                        onChange={(e) => handleTripChange(e)}>
                    </input>
                <label for="make-end">Start date:</label>
                    <input type="date" id="make-start" name="end"
                        value={tripData.end}
                        min="2022-01-02" max="2023-12-31"
                        onChange={(e) => handleTripChange(e)}>
                    </input>
                    <button>Create Trip!</button>
            </form>
        </div>)
        }

    }



    return (
        <div>
            <div className = "home-content">
                <div className = "trip-map">
                    <MapContainer tripList = {tripList}/>
                </div>
                <div className = "trip-list">
                    <h3>All Trips</h3>
                    <button onClick = {toggleCreate}>Add Trip</button>
                    <div className = "add-trip">Add</div>
                    {tripList.map(trip => <TripCard tripList = {tripList} setTripList = {setTripList} currentUser = {currentUser} key = {trip.id} trip = {trip} />)}
                    <button onClick = {homeTest}>Home Test</button>
                </div>
            </div>
            {renderForm()}
        </div>
    )
    
}