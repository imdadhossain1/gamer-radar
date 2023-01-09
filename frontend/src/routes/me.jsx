import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Me() {
  const [cookie] = useCookies(['username'])

  const [favGen, setFavGen] = useState([])
  const [foc, setFOC] = useState('')

  const [success, setSucces] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3001/user/${cookie.username}`, {
      method: "GET",
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    }).then(async res => {
      res = JSON.parse(await res.json())
      setFavGen(res.favoriteGameGenres ?? [])
      setFOC(res.preferredFOC ?? '')
      console.log(res)
    })
  }, [])
  
  async function set() {
    fetch('http://localhost:3001/user', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        favoriteGameGenres: favGen,
        preferredFOC: foc
      })
    }).then(res => {
      setSucces(true)
      console.log(favGen)
    })
  }

  return <div id="me">

    {success && <p>Success!</p>}

    <p>Favorite Game Genres</p>
    <input value={favGen.join(",")} onChange={(e) => setFavGen(e.target.value.split(",").filter(gen => gen))} required/>
    <p>Preffered Form of Communication</p>
    <input value={foc} onChange={(e) => setFOC(e.target.value)} required/><br />
    <button onClick={set}>Set</button>
  </div>
}