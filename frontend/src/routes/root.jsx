import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";


export default function Root() {
  const [cookies, setCookie] = useCookies(['username']);
  if(!cookies.username) return <Navigate to='/auth/login' />
}
