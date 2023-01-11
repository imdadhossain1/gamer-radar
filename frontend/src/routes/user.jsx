import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams, Navigate } from "react-router-dom";

export default function User() {
  const [cookies] = useCookies(['username'])

  const { user } = useParams()

  const [userInfo, setUserInfo] = useState(null)
  const [availGen, setAvailGen] = useState([])
  const [favGen, setFavGen] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if(cookies.username != user) {
      fetch(`http://localhost:3001/user/${user}`, {
      method: 'GET',
      credentials: 'include'
    }).then(async (res) => {
      if(res.status == 404) {
        setNotFound(true)
      }
      let json = JSON.parse(await res.json())
      setAvailGen(json.availableGenres)
      setFavGen(json.favoriteGameGenres)
      setUserInfo(json)
      console.log(json)
    })
    }
  }, [])

  if(cookies.username == user) return <Navigate to='/me' />
  return <div className="page">
    {userInfo ? (
      <>
        Username: {userInfo.username} <br />

        <br />

        Favorite Game Genres: 
        {userInfo.favoriteGameGenres ? 
          favGen.map(v => {
            if(availGen[v]) {
              return <div key={v.genreId}>
                <p>{availGen[v].name}</p>
              </div>
            }
          })
        : "No Favorite Game Genres"} <br />
        Preferred form of communication: {userInfo.preferredFOC ?? "Not set"}
      </>
    ) : notFound ? "User Not Found" : "Loading"}
  </div>
}