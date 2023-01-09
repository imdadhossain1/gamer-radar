import { useState } from "react"
import { Navigate } from "react-router-dom"

export default function CreateThread() {

  const [title, setTitle] = useState('')
  const [id, setID] = useState(null)

  function createThread() {
    fetch('http://localhost:3001/threads', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title
      }),
      credentials: 'include'
    })
    .then(async res => {
      const json = await JSON.parse(await res.json())
      console.log(json)
      if(res.status == 201) {
        setID(json.id)
        console.log(json['id'])
      }
    })
  }

  return <div id="create-thread">
    {id && <Navigate to={'/threads/' + id} />}
    <input type='text' onChange={(e) => setTitle(e.target.value)} required id="inp-cre"></input>
    <button onClick={createThread}>Create</button>
  </div>
}