import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import { NavLink, Navigate } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function Connections() {

  const [cookies] = useCookies(['username'])

  const [int, setInt] = useState(null)
  const [goTo, setGoTo] = useState('')
  const [redir, setRedir] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3001/user/${cookies.username}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    }).then(async res => {
      const json = JSON.parse(await res.json())
      console.log(json)
      setInt(json.intProfiles)
    })
  }, [])
  
  return <div className="page" id="connections">

    <div id="search">

      <input type="text" id="goto" onChange={(e) => setGoTo(e.target.value)} placeholder="Goto User" />
      <div onClick={() => setRedir(true)} id='arr'><FontAwesomeIcon icon={faArrowRight} /></div>
    </div>

    { redir && <Navigate to={'/user/' + goTo} />}

    Profiles interested in
    { int && int.map(val => {
      return <div key={val}>
        <NavLink to={'/user/' + val}>{val}</NavLink>
      </div>
    })}
  </div>
}