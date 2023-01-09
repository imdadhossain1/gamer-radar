import { useState } from "react"
import { Navigate, useParams } from "react-router-dom"

export default function EditThread() {

  const [title, setTitle] = useState('')
  const { id } = useParams()
  const [success, setSuccess] = useState(false)

  function EditThread() {
    fetch('http://localhost:3001/threads', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title, id
      }),
      credentials: 'include'
    })
    .then(async res => {
      setSuccess(true)
    })
  }

  return <div id="create-thread">
    {id && <Navigate to={'/threads/' + id} />}
    <input type='text' onChange={(e) => setTitle(e.target.value)} required id="inp-cre"></input>
    <button onClick={EditThread}>Edit</button>
  </div>
}