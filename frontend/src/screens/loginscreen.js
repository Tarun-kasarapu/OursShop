import {Container, Row, Col,Form, ListGroup, Button} from 'react-bootstrap';
import { useState ,useEffect} from 'react';
import { Link , useLocation , useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import { useLoginMutation } from '../slices/productapislice';
import { setCredentials } from '../slices/authslice';
import { useDispatch , useSelector} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginScreen(){

        const [email,setemail]=useState('');
        const [password,setpassword]=useState('');
        const dispatch=useDispatch();
        const navigate=useNavigate();

        const [login,{isLoading}]=useLoginMutation();
        const { userInfo}=useSelector((state) => state.auth);

        const {search } = useLocation();
        const sp=new URLSearchParams(search);
        const redirect = sp.get('redirect') || '/';

        useEffect(()=>{
             if(userInfo){
                navigate(redirect);
             }
        },[userInfo,redirect])
        const submitHandler=async (e)=>{
            e.preventDefault();
            try {
                const res= await login({email,password}).unwrap();
                const {email:emails,password:passwords,name:Name,isAdmin}=res;
                dispatch(setCredentials({emails,passwords,Name,isAdmin}));
               
                navigate(redirect);
                
            } catch (err) {
                
                toast(err.data);
                
             

            }
        }
        return (
            <>
           
            <Container >

                <Row className='justify-content-md-center'>

                <Col md={6}>
                    <h1 className='my-3'>Sign in</h1>
                
                
                    <Form onSubmit={submitHandler} >
                    <Form.Group>
                        <Form.Label><h5>Email Address</h5></Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange = { (e) => setemail(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Label><h5>Password</h5></Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange = { (e) => setpassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='my-3' disabled={isLoading}>
                        Sign In
                    </Button>
                    <div>
                        New customer?<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                            Register
                        </Link>
                    </div>
                    </Form>
                    
                
                </Col>

                </Row>
                <ToastContainer/>

            </Container>
            </>
        )

}

export default LoginScreen;