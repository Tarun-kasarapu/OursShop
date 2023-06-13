import {Container, Row, Col,Form, ListGroup, Button} from 'react-bootstrap';
import { useState } from 'react';
import { Link,useNavigate ,useLocation} from 'react-router-dom';
import Header from '../components/Header';
import { useRegisterMutation } from '../slices/productapislice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authslice';
import {toast} from 'react-toastify';


function RegisterScreen(){

        const [email,setemail]=useState('');
        const [password,setpassword]=useState('');
        const [name,setname]=useState('');

        const dispatch=useDispatch();
        const navigate=useNavigate();
        const [registeruser]=useRegisterMutation();

        const {search } = useLocation();
        const sp=new URLSearchParams(search);
        const redirect = sp.get('redirect') || '/';
        const submitHandler=async (e)=>{
            e.preventDefault();
            console.log(email);
            console.log(name);
            console.log(password);
            try {
                const res=await registeruser({name , email, password}).unwrap();
                const {email:emails,password:passwords,name:Name,isAdmin}=res;
                dispatch(setCredentials({emails,passwords,Name,isAdmin}));
                navigate(redirect);
            } catch (err) {
                console.log(err);
                toast(err.data);
            }
        }
        return (
            <>
            
            <Container >

                <Row className='justify-content-md-center'>

                <Col md={6}>
                    <h1 className='my-3'>Sign Up</h1>
                
                
                    <Form onSubmit={submitHandler} >
                    
                    <Form.Group>
                        <Form.Label><h5>Name</h5></Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange = { (e) => setname(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Label><h5>Email Address</h5></Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange = { (e) => setemail(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Label><h5>Password</h5></Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange = { (e) => setpassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='my-3'>
                        Register
                    </Button>

                    <div>
                        Already have an account? <Link to={redirect?`/login/redirect=${redirect}`:'/login'}>
                            Login
                        </Link>
                    </div>
                    </Form>
                    
                
                </Col>

                </Row>

            </Container>
            </>
        )

}

export default RegisterScreen;