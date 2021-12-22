import {useState, useEffect} from 'react'
import '../component-styles/home.css'
import MapContainer from './map-container'
import TripCard from './trip-card'

export default function Home() {

    //State
    const [tripList, setTripList] = useState([])
    const [displayedTrips, setDisplayedTrips] = useState([])
    const [creating, setCreating] = useState(false)
    const [tripData, setTripData] = useState({
        title: '',
        latitude: '',
        longitude: ''
    })

    useEffect(() => {
        fetch("http://localhost:3000/trips", {
            credentials: "include"
        })
        .then(res => res.json())
        .then((trips) => {
            setTripList(trips)
            setDisplayedTrips(trips)
        })


    }, []);

    //Functions/methods
    const homeTest = () => {
        console.log(tripList[0].longitude)
    }

    const handleTripChange = (e) => {
        setTripData({...tripData, [e.target.name]: e.target.value})
    }

    const renderForm = () => {
        if (creating) {
            return <div className = "trip-add-form">
            <form>
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
                        placeholder='Name'
                        onChange={(e) => handleTripChange(e)}
                        >
                    </input>
                    <button>Create Trip!</button>
            </form>
        </div>
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
                    <div className = "add-trip">Add</div>
                    {displayedTrips.map(trip => <TripCard key = {trip.id} trip = {trip} />)}
                    <button onClick = {homeTest}>Home Test</button>
                </div>
            </div>
            {renderForm}
        </div>
    )
    
}