import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPlus, faTrash,  } from '@fortawesome/free-solid-svg-icons'

export default function Threads() {

  const [threads, setThreads] = useState([])
  const [cookies] = useCookies(['username'])

  useEffect(() => {
    fetch('http://localhost:3001/threads', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    }).then(async res => {
      res = JSON.parse(await res.json())
      setThreads(res.threads)
      console.log(threads)
    })
  }, [])

  function deleteThread(id) {
    fetch('http://localhost:3001/threads', {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setThreads(threads.filter(thread => thread.id != id ))
    })
  }

  return <div className="page">
    <NavLink to='/threads/create' id="create-th-btn">
      <FontAwesomeIcon icon={faPlus} />
    </NavLink>
    <div id="threads">
      {threads.map((thread => {
        return <div className="th" id={thread.id} key={thread.id}>
          <h3 className="thread-title" id={thread.id}><NavLink to={'/threads/'+thread.id}>{thread.title}</NavLink></h3>
          { thread.author == cookies.username && <div onClick={() => deleteThread(thread.id)} id={thread.id} className="thread-control"><FontAwesomeIcon icon={faTrash} /></div>}
          { thread.author == cookies.username && <NavLink to={'/threads/edit/'+thread.id} className="thread-control"><FontAwesomeIcon id={thread.id} icon={faPencil} /></NavLink>}
        </div>
      }))}
    </div>
  </div>
}