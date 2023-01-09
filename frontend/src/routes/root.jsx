import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import { useEffect, useState } from "react";
import User from "./user";


export default function Root() {
  const [cookies, setCookie] = useCookies(['username']);
  const [isLoggedIn, setLogin] = useState(null)
  
  useEffect(() => {
   if(cookies.username) {
    setLogin(true)
   } else {
    setLogin(false)
   }
  })

    

  if(isLoggedIn) {
    return  <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/:user" element={<User />} />
            </Routes>
  } else if (!isLoggedIn && isLoggedIn != null) {
    return <Navigate to='/auth/login' />
  }

}
