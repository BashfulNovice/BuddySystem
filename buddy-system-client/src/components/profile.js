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

        fetch(`http://localhost:3000/users/${currentUser.id}`, {
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

    if (!currentUser) return <h1>You are not logged in!</h1>

    if (!displayedUser.name)
        {return <><h1>Loading</h1><button onClick = {testProfile}>Profile test</button></>}
    
    return (
        <div className = 'profile-page'>
            {!editing?
                <div className = 'profile-info-container'>
                    <img className = 'profile-pic' src = {displayedUser.profile_pic} ></img>
                    <div className = 'profile-info-list'>
                    <h3>Name: {displayedUser.name}</h3>
                    <p className = 'profile-item'>Age: {displayedUser.age}</p>
                    <p className = 'profile-item'>Gender: {displayedUser.gender}</p>
                    <p className = 'profile-item'>Area: {displayedUser.city}</p>
                    <p className = 'profile-item'>Primary Activity: {displayedUser.activity}</p>
                    {/* <p className = 'profile-item'>Contact: {displayedUser.email}</p> */}
                    <p className = 'profile-item'>Bio: {displayedUser.bio}</p>
                    <button className = 'edit-info-bttn' onClick = {startEdit}>Edit Info</button>
                    </div>
                </div>
                :
                <div className = "profile-info-container">
                    <img className = 'profile-pic' src = {displayedUser.profile_pic} ></img>
                    <form className = 'profile-edit-form' onSubmit = {(e) => saveEdit(e, formData)}>
                        <div className = 'form-element'>
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
                        </div>
                        <div className = 'form-element'>
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
                        </div>
                        {/* Gender radio buttons go here */}
                        <div className = 'gender-element'>
                            <input type="radio" id="updateMale" name="gender" value="Male" onChange = {(e) => handleInfoChange(e)}/>
                                <label for="updateMale">Male</label>
                            <input type="radio" id="updateFemale" name="gender" value="Female" onChange = {(e) => handleInfoChange(e)}/>
                                <label for="updateFemale">Female</label>
                            <input type="radio" id="updateNon-Binary" name="gender" value="Non-Binary" onChange = {(e) => handleInfoChange(e)}/>
                                <label for="updateNon-Binary">Non-Binary</label>
                            <input type="radio" id="updateOther" name="gender" value="Other" onChange = {(e) => handleInfoChange(e)}/>
                                <label for="updateOther">Other</label>
                        </div>
                        <div className = 'form-element'>
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
                        </div>
                        <div className = 'form-element'>
                        <label for = "edit-activity">Primary Activities:</label>
                        <textarea
                            type='text'
                            className='edit-info'
                            id = 'edit-activity'
                            name = 'activity'
                            value={formData.activity}
                            placeholder='User Email'
                            onChange={(e) => handleInfoChange(e)}
                            >
                        </textarea>
                        </div>
                        {/* <label for = "edit-contact">Contact Email:</label>
                        <input
                            type='text'
                            className='input-field'
                            id = 'edit-contact'
                            name = 'email'
                            value={formData.email}
                            placeholder='Contact Email'
                            onChange={(e) => handleInfoChange(e)}
                            >
                        </input> */}
                        <div className = 'form-element'>
                        <label for = "edit-bio">Bio:</label>
                        <textarea
                            type='text'
                            className='edit-info'
                            id = 'edit-bio'
                            name = 'bio'
                            value={formData.bio}
                            placeholder='Bio'
                            onChange={(e) => handleInfoChange(e)}
                            >
                        </textarea>
                        </div>
                        <button>Save</button>
                    </form>
                </div>

            }
            <div className = 'profile-trips-container'>
                <h2>Trips You're Attending</h2>
                <div className = 'trips-list'>
                {/* <TripCard trip = {displayedUser.trips[0]}></TripCard> */}
                {profileList.map(trip => <TripCard tripList = {tripList} setTripList = {setTripList} rerender = {rerender} setRerender = {setRerender} currentUser = {currentUser} key = {trip.id} trip = {trip} />)}
                </div>
                {/* <button onClick = {testProfile}>Profile test</button> */}
            </div>
            
        </div>
        
    )
}