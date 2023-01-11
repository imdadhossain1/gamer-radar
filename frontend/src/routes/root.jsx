import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./home";
import { useEffect, useState } from "react";
import User from "./user";
import Threads from "./threads/index";
import CreateThread from "./threads/create";
import Thread from "./threads/thread";
import Me from "./me";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faLink, faUser } from '@fortawesome/free-solid-svg-icons'
import EditThread from "./threads/edit";
import Connections from "./connections";


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
    return  <>
      <div id="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:user" element={<User />} />
          <Route path="/threads">
            <Route path="/threads/" element={<Threads />} />
            <Route path="/threads/create" element={<CreateThread />} />
            <Route path="/threads/edit/:id" element={<EditThread />} />
            <Route path="/threads/:id" element={<Thread />} />
          </Route>
          <Route path="/me" element={<Me />} />
          <Route path="/connections" element={<Connections />} />
        </Routes>
        <nav id="nav">
          <NavLink to='threads'><FontAwesomeIcon icon={faBars} /></NavLink>
          <NavLink to='connections'><FontAwesomeIcon icon={faLink} /></NavLink>
          <NavLink to='me'><FontAwesomeIcon icon={faUser} /></NavLink>
        </nav>
      </div>
    </>
  } else if (!isLoggedIn && isLoggedIn != null) {
    return <Navigate to='/auth/login' />
  }

}
