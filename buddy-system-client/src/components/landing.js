import {useState, useEffect} from 'react'


export default function Landing() {

    //State
    const [loginFields, setLoginFields] = useState({
        email: '',
        password: ''
    })

    //Functions
    const handleLogInChange = (e) => {
        setLoginFields({...loginFields, [e.target.name]: e.target.value})
    }

    const submitLogin = (e, loginFields) => {
        e.preventDefault()
        const {email, password} = loginFields

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email, 
                password
            })
        })
    }

    return (
        <div>
            <div>
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
        </div>
    )
}