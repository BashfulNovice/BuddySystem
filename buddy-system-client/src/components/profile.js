import {useState, useEffect} from 'react'
import '../component-styles/profile.css'
import TripCard from './trip-card'


export default function Profile({currentUser, rerender, setRerender, tripList, setTripList, profileList}) {

    //State
    
    const [editing, setEditing] = useState(false)
    const [displayedUser, setDisplayedUser] = useState({})
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        city: '',
        activity: '',
        email: '',
        bio: ''
    })


    useEffect(() => {
        if (currentUser)
        fetch(`http://localhost:3000/profile`, {
          credentials: 'include'
        }).then((response) => {
          if (response.ok) {
            response.json()
            //.then(user => console.log(user))
            .then((user) => {
                setDisplayedUser(user)
                console.log(user)})
          }
        });
    }, [currentUser, rerender]);

    
    // Functions
    const testProfile = () => {
        console.log(tripList)
    }

    const toggleEdit = () => {
        setEditing(!editing)
    }
    const handleInfoChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const startEdit = () => {
        setFormData({
            name: displayedUser.name,
            age: displayedUser.age,
            gender: displayedUser.gender,
            city: displayedUser.city,
            activity: displayedUser.activity,
            email: displayedUser.email,
            bio: displayedUser.bio
        })
        toggleEdit(!editing)
    }
    const saveEdit = (e, formData) => {
        e.preventDefault()
        const {name, age, gender, city, activity, email, bio} = formData

        fetch('http://localhost:3000/users', {
            method: 'PATCH',
            credentials: 'include',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name, 
                age,
                gender,
                city,
                activity,
                email,
                bio
            })
        })
        .then(res => res.json())
        .then(user => setDisplayedUser(user))
        toggleEdit(!editing)
    }

    if (!displayedUser.name)
        {return <><h1>Loading</h1><button onClick = {testProfile}>Profile test</button></>}
    return (
        <div className = 'profile-page'>
            {!editing?
                <div className = 'profile-info-container'>
                    <img className = 'profile-pic' src = {displayedUser.profile_pic} ></img>
                    <h3>Name: {displayedUser.name}</h3>
                    <p>Age: {displayedUser.age}</p>
                    <p>Gender: {displayedUser.gender}</p>
                    <p>Area: {displayedUser.city}</p>
                    <p>Primary Activity: {displayedUser.activity}</p>
                    <p>Contact: {displayedUser.email}</p>
                    <p>Bio: {displayedUser.bio}</p>
                    <button onClick = {startEdit}>Edit Info</button>
                </div>
                :
                <div className = "profile-info-container">
                    <img className = 'profile-pic' src = {displayedUser.profile_pic} ></img>
                    <form className = 'profile-edit-form' onSubmit = {(e) => saveEdit(e, formData)}>
                        <label for = "edit-name">Name:</label>
                        <input
                            type='text'
                            className='input-field'
                            id = 'edit-name'
                            name = 'name'
                            value={formData.name}
                            placeholder='Name'
                            onChange={(e) => handleInfoChange(e)}
                            >
                        </input>
                        <label for = "edit-age">Age:</label>
                        <input
                            type='text'
                            className='input-field'
                            id = 'edit-age'
                            name = 'age'
                            value={formData.age}
                            placeholder='Age'
                            onChange={(e) => handleInfoChange(e)}
                            >
                        </input>
                        {/* Gender radio buttons go here */}
                        <div>
                            <input type="radio" id="updateMale" name="gender" value="Male" onChange = {(e) => handleInfoChange(e)}/>
                                <label for="updateMale">Male</label>
                            <input type="radio" id="updateFemale" name="gender" value="Female" onChange = {(e) => handleInfoChange(e)}/>
                                <label for="updateFemale">Female</label>
                            <input type="radio" id="updateNon-Binary" name="gender" value="Non-Binary" onChange = {(e) => handleInfoChange(e)}/>
                                <label for="updateNon-Binary">Non-Binary</label>
                            <input type="radio" id="updateOther" name="gender" value="Other" onChange = {(e) => handleInfoChange(e)}/>
                                <label for="updateOther">Other</label>
                        </div>
                        <label for = "edit-area">Area/City:</label>
                        <input
                            type='text'
                            className='input-field'
                            id = 'edit-area'
                            name = 'city'
                            value={formData.city}
                            placeholder='Geographical Area/City'
                            onChange={(e) => handleInfoChange(e)}
                            >
                        </input>
                        <label for = "edit-activity">Primary Activity:</label>
                        <input
                            type='text'
                            className='input-field'
                            id = 'edit-activity'
                            name = 'activity'
                            value={formData.activity}
                            placeholder='User Email'
                            onChange={(e) => handleInfoChange(e)}
                            >
                        </input>
                        <label for = "edit-contact">Contact Email:</label>
                        <input
                            type='text'
                            className='input-field'
                            id = 'edit-contact'
                            name = 'email'
                            value={formData.email}
                            placeholder='Contact Email'
                            onChange={(e) => handleInfoChange(e)}
                            >
                        </input>
                        <label for = "edit-bio">Bio:</label>
                        <input
                            type='text'
                            className='input-field'
                            id = 'edit-bio'
                            name = 'bio'
                            value={formData.bio}
                            placeholder='Bio'
                            onChange={(e) => handleInfoChange(e)}
                            >
                        </input>
                        <button>Save</button>
                    </form>
                </div>

            }
            <div className = 'profile-trips-container'>
                <h2>Trips You're Attending</h2>
                {/* <TripCard trip = {displayedUser.trips[0]}></TripCard> */}
                {profileList.map(trip => <TripCard tripList = {tripList} setTripList = {setTripList} rerender = {rerender} setRerender = {setRerender} currentUser = {currentUser} key = {trip.id} trip = {trip} />)}
                <button onClick = {testProfile}>Profile test</button>
            </div>
            
        </div>
        
    )
}