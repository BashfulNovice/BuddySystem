import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import '../component-styles/trip_detail.css'
import Message from './message'


export default function TripDetail({currentUser}) { 

    const [tripInfo, setTripInfo] = useState(null)
    const { trip_id } = useParams()
    const [newContent,setNewContent] = useState('')

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
            <div className = "trip-info"></div>
            <div className = "trip-message-container">
                {tripInfo.messages.map(message => <Message currentUser = {currentUser} message = {message} />)}
                <div>
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