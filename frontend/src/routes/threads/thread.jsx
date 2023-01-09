import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import io from 'socket.io-client'

export default function Thread() {
  const { id } = useParams()
  const [title, setTitle] = useState('')

  const [message, setMessage] = useState('')
  const [replies, setReplies] = useState([])

  useEffect(() => {
    const socket = io('http://localhost:3001', { query: { id: `${id}` }})

    fetch(`http://localhost:3001/threads/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      credentials: 'include'
    }).then(async res => {
      const json = JSON.parse(await res.json())
      setTitle(json.title)
      setReplies(json.replies)
      console.log(replies)
    })

    
    socket.on('connect', console.log)

    console.log(socket)

    socket.on('reply', (reply) => {
      console.log([...replies, reply])
      setReplies([...replies, reply])
    })
  }, [])

  function addReply() {
    fetch(`http://localhost:3001/threads/${id}`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        threadId: id
      })
    })
  }

  return (
    <>
      {title && <h1>{title}</h1>}

      <input type='text' required onChange={(e) => setMessage(e.target.value)} id="inp-cre"></input>
      <button onClick={addReply}>Send</button>
      {replies.length && 
      <>
        {replies.map(reply => {
          return <div className="reply-container" key={reply.id}>
            <h3>Author: {reply.author}</h3>
            <p>{reply.message}</p>
          </div>
        })}
      </>
      }
    </>
  )
}