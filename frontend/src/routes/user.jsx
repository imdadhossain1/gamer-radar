import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams, Navigate } from "react-router-dom";

export default function User() {
  const [cookies] = useCookies(['username'])

  const { user } = useParams()

  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    if(cookies.username != user) {
      fetch(`http://localhost:3001/user/${user}`, {
      method: 'GET',
      credentials: 'include'
    }).then((res) => res.json()).then((res) => {
      console.log(res)
      setUserInfo(res)
    })
    }
  }, [])

  if(cookies.username == user) return <Navigate to='/me' />
  return <div className="page">
    {userInfo ? (
      <>
        Username: {userInfo.username} <br />
        {userInfo.favoriteGamerGenres ?? "No Favorite Game Genres"} <br />
        {userInfo.preferredFOC ?? "No Preferred Form of Communication"}
      </>
    ) : "Loading"}
  </div>
}