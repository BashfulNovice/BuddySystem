import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import '../component-styles/trip_detail.css'
import Message from './message'
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


export default function TripDetail({currentUser}) { 

    const [tripInfo, setTripInfo] = useState(null)
    const { trip_id } = useParams()
    const [newContent,setNewContent] = useState('')

    const mapStyles = {
      height: '300px',
      width: '100%',
    };

    useEffect(() => {
        fetch(`http://localhost:3000/trips/${trip_id}`, {
          credentials: 'include'
        }).then(res => res.json())
          .then(info => setTripInfo(info))
      }
    , []);

      const testTrip = () => {
        console.log(tripInfo)
      }

      const handleMessageChange = (e) => {
        setNewContent(e.target.value)
      }

      const postMessage = (e, content) => {
        e.preventDefault()
        fetch('http://localhost:3000/messages', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               content: content,
               trip_id: trip_id,
               sender_id: currentUser.id
            })

        })
        .then(res => res.json())
        .then((message) => {
          console.log(message)
          let temp = tripInfo
          let temp2 = [...tripInfo.messages, message]
          temp.messages = temp2
          setTripInfo(temp)
          console.log(temp)
          setNewContent('')
      })
    }


    if (!tripInfo) return <h1>Loading</h1>

    return (
      <div>
        <div className = "trip-detail-page">
            <div className = "trip-info-container">
              <h3 className = "trip-comunication">Trip Details</h3>
              <div className = "trip-info">
                <h2>{tripInfo.title}</h2>
                <h4>Hosted by: {tripInfo.host.name}</h4>
                <h4>Start Date: {tripInfo.start}</h4>
                <p><b>Requirements</b>: {tripInfo.requirements}</p>
                <p>{tripInfo.description}</p>

                <ul className = 'attendees'>Attendees:
                  {tripInfo.users.map(user => <p className = 'attendee'><img src={user.profile_pic} width="40" height="40" /><Link to = {`/user/${user.id}`} key = {user.id}>{user.name}</Link></p>)}
                </ul>
                <div className = "detail-map">
                <LoadScript googleMapsApiKey={'AIzaSyDxSmnrwcZHrmkVJGjhHiilppW4wKX6nRs'}>
                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={14}
                    center={{lat: tripInfo.latitude,lng: tripInfo.longitude,}}>
                      <Marker position = {{lat: tripInfo.latitude,lng: tripInfo.longitude,}} />    
                  </GoogleMap>
                </LoadScript>
                </div>

              </div>
            </div>
            <div className = "trip-message-container">
              <h3 className = "trip-comunication">Trip Comunication</h3>  
                <div className = "trip-message-list">
                {tripInfo.messages.map(message => <Message currentUser = {currentUser} message = {message} />)}
                </div>
                <div className = "message-form">
                <form className="new-message" onSubmit={(e) => postMessage(e, newContent)}>
                    <label for = "new-message">New Message: </label>
                    <input
                        type='text'
                        className='input-field'
                        id = 'new-message'
                        name = 'new-message'
                        required='required'
                        value={newContent}
                        placeholder='New Message...'
                        onChange={(e) => handleMessageChange(e)}>
                    </input>
                    <button>Post</button>
                  </form>
                </div>
            </div>
          </div>
          <button onClick = {testTrip}>test</button>
        </div>
    )

}