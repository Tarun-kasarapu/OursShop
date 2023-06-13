import {Badge,Container} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "./logo.png";
import { FaShoppingCart, FaUser} from 'react-icons/fa';
import { LinkContainer} from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/productapislice';
import { useDispatch } from 'react-redux';
import { logOut } from '../slices/authslice';
import { useNavigate } from 'react-router-dom';
import SearchBox from './searchbox';



function Header() {
  const {cartItems} =useSelector((state)=>state.cart);
  const {userInfo} = useSelector((state)=>state.auth);
  //console.log(cartItems);

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [logoutcall]=useLogoutMutation();
  const logoutHandler=async ()=>{
      try {
        await logoutcall();
        dispatch(logOut());
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
  }
  return (

    <Navbar bg="dark" expand="lg" variant="dark" >
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand href="/">
            <img src={logo} alt='logo'/>
             OURsShop
        </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox/>
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
            <Nav.Link href="#home"><FaShoppingCart/>Cart{
              cartItems.length>0?
              <Badge pill bg="secondary">
                  {cartItems.length}
              </Badge>:
              ""
            }</Nav.Link>
            </LinkContainer>

            {
            userInfo && userInfo.isAdmin?
            
          
            <NavDropdown title={userInfo.Name} >
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/products'>
                  <NavDropdown.Item>products</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
           
            :userInfo?
            
            <NavDropdown title={userInfo.Name} >
            <LinkContainer to='/profile'>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>


            :
            <LinkContainer to="/login">

              
              <Nav.Link href="#link"><FaUser/>Sign in</Nav.Link>
              
            
            </LinkContainer >
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;