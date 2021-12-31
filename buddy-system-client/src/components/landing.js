import {useState, useEffect} from 'react'
import '../component-styles/landing.css'


export default function Landing({currentUser, setCurrentUser}) {

    //State
    const [loginFields, setLoginFields] = useState({
        email: '',
        password: ''
    })

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
        password: '',
        password_confirmation: ''
    })

    //Functions
    const handleLogInChange = (e) => {
        setLoginFields({...loginFields, [e.target.name]: e.target.value})
    }

    const handleSignUpChange = (e) => {
        setRegisterData({...registerData, [e.target.name]: e.target.value})
    }

    // function used to test values and outputs. 
    const test = () => {
        // fetch('http://localhost:3000/test', {
        //     credentials: "include"
        // })
        // .then((res) => { 
        //     console.log(res)
        //     return res.json()})
        // .then(console.log)
        console.log(registerData)

    }

    const submitLogin = (e, loginFields) => {
        e.preventDefault()
        const {email, password} = loginFields

        fetch('http://localhost:3000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, 
                password
            })
        })
        .then(res => res.json())
        .then(user => setCurrentUser(user))
    }

    const submitSignup = (e, registerData) => {
        e.preventDefault()
        const { age, email, gender, name, password, password_confirmation} = registerData
        fetch('http://localhost:3000/users', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                age, 
                email, 
                gender,
                name, 
                password,
                password_confirmation
            })

        })
        .then(res => res.json())
        .then(user => console.log(user))
    }

    return (
        <div className = 'landing-page'>
            <div className = "login-container">
                <form className="login-form" onSubmit={(e) => submitLogin(e, loginFields)}>
                    <label for = "login-email">Email: </label>
                    <input
                        type='text'
                        className='input-field'
                        id = 'login-email'
                        name = 'email'
                        required='required'
                        value={loginFields.email}
                        placeholder='User Email'
                        onChange={(e) => handleLogInChange(e)}>
                    </input>
                    <label for = "login-password">Password: </label>
                    <input
                        type='text'
                        id ='login-password'
                        name = 'password'
                        required='required'
                        className='input-field'
                        value={loginFields.password}
                        placeholder='Password'
                        onChange={(e) => handleLogInChange(e)}>
                    </input>
                    <button>Log In</button>
                </form>
          </div>
          <div className = "signup-container">
              <form className = "signup-form" onSubmit={(e) => submitSignup(e, registerData)}>
                <label >Sign Up: </label>
                <input value={registerData.name}
                    onChange = {(e) => handleSignUpChange(e)}
                    name = "name"
                    required = 'required'
                    placeholder = "Full Name"
                    className = "input-field"/>
                <input value={registerData.age}
                    onChange = {(e) => handleSignUpChange(e)}
                    name = "age"
                    required = 'required'
                    placeholder = "Age"
                    className = "input-field"/>
                <input value={registerData.email}
                    onChange = {(e) => handleSignUpChange(e)}
                    name = "email"
                    required = 'required'
                    placeholder = "email address"
                    className = "input-field"/>
                <div>
                    <p>Gender</p>
                    <input type="radio" id="Male" name="gender" value="Male" onChange = {(e) => handleSignUpChange(e)}/>
                        <label for="Male">Male</label>
                    <input type="radio" id="Female" name="gender" value="Female" onChange = {(e) => handleSignUpChange(e)}/>
                        <label for="Female">Female</label>
                    <input type="radio" id="Non-Binary" name="gender" value="Non-Binary" onChange = {(e) => handleSignUpChange(e)}/>
                        <label for="Non-Binary">Non-Binary</label>
                    <input type="radio" id="Other" name="gender" value="Other" onChange = {(e) => handleSignUpChange(e)}/>
                        <label for="Other">Other</label>
                </div>
                <input value={registerData.password}
                    onChange = {(e) => handleSignUpChange(e)}
                    name = "password"
                    required = 'required'
                    placeholder = "Enter Password"
                    className = "input-field"/>
                <input value={registerData.password_confirmation}
                    onChange = {(e) => handleSignUpChange(e)}
                    name = "password_confirmation"
                    required = 'required'
                    placeholder = "Enter Password Again"
                    className = "input-field"/>
                <button>Sign Me Up!</button>

              </form>
          </div>
          <button onClick = {test} >test</button>
        </div>
    )
}