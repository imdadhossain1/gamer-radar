import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./home";
import { useEffect, useState } from "react";
import User from "./user";
import Threads from "./threads/index";
import CreateThread from "./threads/create";
import Thread from "./threads/thread";


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
    return  <div>
      <nav id="nav">
        <NavLink to='me'>Me</NavLink>
        <NavLink to='threads'>Threads</NavLink>
        <NavLink to='connections'>Connections</NavLink>
      </nav>
      <div id="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:user" element={<User />} />
          <Route path="/threads">
            <Route path="/threads/" element={<Threads />} />
            <Route path="/threads/create" element={<CreateThread />} />
            <Route path="/threads/edit/:id" element={<CreateThread />} />
            <Route path="/threads/:id" element={<Thread />} />
          </Route>
        </Routes>
      </div>
    </div>
  } else if (!isLoggedIn && isLoggedIn != null) {
    return <Navigate to='/auth/login' />
  }

}
