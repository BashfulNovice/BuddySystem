import {useState, useEffect} from 'react'
import '../component-styles/home.css'
import MapContainer from './map-container'
import TripCard from './trip-card'
import {anything} from '../anything'
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

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
    // const mapStyles = {
    //     height: '250px',
    //     width: '250px',
    //   };


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
        console.log(tripData)
    }
    
    const toggleCreate = () => {
        setCreating(!creating)
    }

    const cancelCreate = () => {
        toggleCreate()
        setTripData({
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
    }

    const handleTripChange = (e) => {
        setTripData({...tripData, [e.target.name]: e.target.value})
    }

    const logMap = (e) => {
        console.log("the map was clicked")
    }

    const createNewTrip = (e, tripData) => {
        
            e.preventDefault()
            const {title, latitude, longitude, description, requirements, max_participants, minimum_participants, start, end} = tripData
            const host_user = currentUser.id

            toggleCreate()

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
            .then(setTripData({
                title: '',
                latitude: '',
                longitude: '',
                description: '',
                requirements: '',
                max_participants: '',
                minimum_participants: '',
                start: '',
                end: ''
            }))
            
        }
        
    

    const renderForm = () => {
        if (creating) {
            return (<div className = "trip-add-form-background">
            <form className = "trip-add-form" onSubmit = {(e) => createNewTrip(e, tripData)}>
                <div className = 'form-row'>
                <div className = 'form-element'>
                <label for = "make-title">Trip Title</label>
                    <input
                        type='text'
                        className='input-field'
                        required='required'
                        id = 'make-title'
                        name = 'title'
                        value={tripData.title}
                        placeholder='Title'
                        onChange={(e) => handleTripChange(e)}
                        >
                    </input>
                </div>
                <div className = 'form-element'>
                <label for="make-start">Start date:</label>
                    <input type="date" id="make-start" name="start"
                        value={tripData.start}
                        required='required'
                        min="2022-01-01" max="2023-12-30"
                        onChange={(e) => handleTripChange(e)}>
                    </input>
                </div>
                <div className = 'form-element'>
                <label for="make-end">End date:</label>
                    <input type="date" id="make-start" name="end"
                        value={tripData.end}
                        min="2022-01-02" max="2023-12-31"
                        onChange={(e) => handleTripChange(e)}>
                    </input>
                </div>
                </div>

                <div className = 'form-element'>
                <label for = "make-requirements">Participant Requirements:</label>
                    <textarea
                        type='text'
                        className='input-requirments'
                        id = 'make-requirements'
                        name = 'requirements'
                        value={tripData.requirements}
                        placeholder='Requirements'
                        onChange={(e) => handleTripChange(e)}
                        >
                    </textarea>
                </div>
                <div className = 'form-row'>
                <div className = 'form-element'>
                <label for = "make-lat">Trip Start Latitude</label>
                    <input
                        type='text'
                        required='required'
                        className='input-field'
                        id = 'make-lat'
                        name = 'latitude'
                        value={tripData.latitude}
                        placeholder='Latitude'
                        onChange={(e) => handleTripChange(e)}
                        >
                    </input>
                </div>
                <div className = 'form-element'>
                <label for = "make-lng">Trip Start Longitude:</label>
                    <input
                        type='text'
                        required='required'
                        className='input-field'
                        id = 'make-lng'
                        name = 'longitude'
                        value={tripData.longitude}
                        placeholder='Longitude'
                        onChange={(e) => handleTripChange(e)}
                        >
                    </input>
                </div>
                </div>
                <div className = 'form-row'>
                    <button onClick = {toggleCreate}>Choose Start Location on Map</button>
                </div>
                
                {/* <LoadScript googleMapsApiKey={'AIzaSyDxSmnrwcZHrmkVJGjhHiilppW4wKX6nRs'}>
                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={14}
                    center={{lat: 40.4406,lng: -79.9959,}}
                    onClick={(e) => logMap(e)}>
                        
                  </GoogleMap>
                </LoadScript> */}
                <div className = 'form-element'>
                <label for = "make-description">Trip Description:</label>
                    <textarea
                        type='text'
                        className='input-description'
                        id = 'make-description'
                        name = 'description'
                        value={tripData.description}
                        placeholder='description'
                        onChange={(e) => handleTripChange(e)}
                        >
                    </textarea>
                </div>
                <div className = 'form-row'>
                <div className = 'form-element'>
                <label for="max_participants">Max Number of Participants:</label>
                    <input 
                        type="number" 
                        required='required'
                        id="max_participants" 
                        name="max_participants" 
                        min="2" max="25"
                        className = "input-field"
                        value = {tripData.max_participants}
                        placeholder = "Max Participants"
                        onChange={(e) => handleTripChange(e)}
                        >  
                    </input>
                </div>
                <div className = 'form-element'>
                <label for="minimum_participants">Minimum Number of Participants:</label>
                    <input 
                        type="number" 
                        required='required'
                        id="minimum_participants" 
                        name="minimum_participants" 
                        min="2" max="25"
                        className = "input-field"
                        value = {tripData.minimum_participants}
                        placeholder = "Minimum Participants"
                        onChange={(e) => handleTripChange(e)}
                        >  
                    </input>
                </div>
                </div>
                    <button>Create Trip!</button>
                    <button onClick = {cancelCreate}>Discard</button>
            </form>
        </div>)
        }

    }


    if (!currentUser) return <h1>You are not logged in!</h1>

    return (
        <div>
            <div className = "home-content">
                <div className = "trip-map">
                    <MapContainer creating = {creating} setCreating = {setCreating} tripData = {tripData} setTripData = {setTripData} tripList = {tripList}/>
                </div>
                <div className = "trip-list">
                    <div className = 'list-header'>
                        <h2>All Trips</h2>
                        <button className = 'add-trip-bttn' onClick = {toggleCreate}>Add Trip</button>
                    </div>
                    {/* <div className = "add-trip">Add</div> */}
                    <div className = 'card-container'>
                    {tripList.map(trip => <TripCard tripList = {tripList} setTripList = {setTripList} currentUser = {currentUser} key = {trip.id} trip = {trip} />)}
                    </div>
                    <button onClick = {homeTest}>Home Test</button>
                </div>
            </div>
            {renderForm()}
        </div>
    )
    
}