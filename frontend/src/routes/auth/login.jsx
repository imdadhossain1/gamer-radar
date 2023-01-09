import { useState, useEffect } from "react"
import { Link, Navigate } from "react-router-dom"
import { useCookies } from "react-cookie"


export default function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(['username']);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setLogin] = useState(false)
  const [loginFail, setLoginFail] = useState(false)

  useEffect(() => {
    if(cookies.username) {
      setLogin(true)
    }
  })

  function login() {
    console.log(username)
    fetch('http://localhost:3001/auth/login', {
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
      if(res.status == 200) return setLogin(true);
      if(res.status == 404) return setLoginFail(true)
    })
  }

  return (
    <>
      <h1 className="gr">Gamer Radar</h1>
      <div className="form">
        {loginFail &&
          <p>Invalid Username or Password</p>
        }
        {isLoggedIn &&
          <Navigate to='/'/>
        }
        <input type='text' onChange={(e) => setUsername(e.target.value)}/>
        <input type='password' onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={login}>Login</button>
        <Link to='/auth/register'>Already have an account?</Link>
      </div>
    </>
  )
}