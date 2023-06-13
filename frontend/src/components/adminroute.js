import { Outlet,Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

function AdminRoute(){
    const { userInfo }=useSelector((state)=>state.auth);
    
    return userInfo && userInfo.isAdmin ?<Outlet/>:
    <Container>
        <h1>Oops!! Not authorized as Admin, Try with another Account</h1>
    </Container>

}

export default AdminRoute;