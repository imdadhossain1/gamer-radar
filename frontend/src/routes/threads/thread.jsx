import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import io from 'socket.io-client'

export default function Thread() {
  const { id } = useParams()
  const [title, setTitle] = useState('')

  const [message, setMessage] = useState('')
  const [replies, setReplies] = useState([])

  async function socketReply(socket) {

  }

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
      console.log(json.replies)
    })

    socket.on('reply', (reply) => {
      replies.push(reply)
      setReplies(old => [...old, reply])
      console.log(replies)
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
    <div className="page" id="thread-page">
      {title && <h1>{title}</h1>}

      <input type='text' required onChange={(e) => setMessage(e.target.value)} id="inp-cre"></input>
      <button onClick={addReply}>Post</button>
      {replies.length && 
      <div id="replies">
        {replies.map(reply => {
          return <div className="reply-container" key={reply.id}>
            <h3>Author: {reply.author}</h3>
            <p>{reply.message}</p>
            <hr></hr>
          </div>
        })}
      </div>
      }
    </div>
  )
}