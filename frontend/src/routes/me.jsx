import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Me() {
  const [cookie] = useCookies(['username'])

  const [favGen, setFavGen] = useState([])
  const [availableGenres, setAvGen] = useState([])
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
      setAvGen(res.availableGenres)
      console.log(favGen)

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

  return <div id="me" className="page">

    {success && <p>Success!</p>}

    <p>Favorite Game Genres</p>
    { availableGenres[0] &&
      availableGenres.map((val) => {
        return <div key={val.genreId}>
          <input type='checkbox' id={val.genreId}  checked={ favGen.findIndex(v => v == val.genreId ) != -1 } onChange={(e) => setFavGen(favGen.findIndex(v => v == val.genreId ) == -1 ? [...favGen, val.genreId] : favGen.filter(v => v != favGen[favGen.findIndex(v1 => v1 == val.genreId)] ))} />
          <label htmlFor={val.genreId}>{val.name}</label>
        </div>
      })
    }
    <p>Preferred Form of Communication</p>
    <input value={foc} onChange={(e) => setFOC(e.target.value)} required/><br />
    <button onClick={set}>Set</button>
  </div>
}