import { useState, useEffect } from "react"
import { Link, Navigate } from "react-router-dom"
import { useCookies } from "react-cookie"

export default function Register() {
  const [cookies, setCookie, removeCookie] = useCookies(['username']);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setLogin] = useState(false)
  const [registerFail, setRegisterFail] = useState(false)

  useEffect(() => {
    if(cookies.username) {
      setLogin(true)
    }
  })

  function register() {
    fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      }),
      credentials: 'include'
    })
    .then(async res => {
      if(res.status == 201) return setLogin(true);
      if(res.status == 409) return setRegisterFail(true)
    })
  }

  return (
    <>
      <h1 className="gr">Gamer Radar</h1>
      <div className="form">
        {registerFail &&
          <p>Username taken!</p>
        }
        {isLoggedIn &&
          <Navigate to='/'/>
        }
        <input type='text' onChange={(e) => setUsername(e.target.value)}/>
        <input type='password' onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={register}>Register</button>
        <Link to='/auth/login'>Already have an account?</Link>
      </div>
    </>
  )
}