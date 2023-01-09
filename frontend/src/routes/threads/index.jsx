import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";

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

  function deleteThread(e) {
    fetch('http://localhost:3001/threads', {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({ id: e.target.id }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setThreads(threads.filter(thread => thread.id != e.target.id ))
    })
  }

  function editThread() {

  }

  return <div className="page">
    <NavLink to='/threads/create'>
      <button>Create Thread</button>
    </NavLink>
    {threads.map((thread => {
      return <div className="th" id={thread.id} key={thread.id}>
        <NavLink to={'/threads/'+thread.id}><h3 id={thread.id}>{thread.title}</h3></NavLink>
        { thread.author == cookies.username && <button onClick={deleteThread} id={thread.id}>Delete</button>}
        { thread.author == cookies.username && <NavLink to={'/threads/edit/'+thread.id} ><button id={thread.id}>Edit</button></NavLink>}
      </div>
    }))}
  </div>
}