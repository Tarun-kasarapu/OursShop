import { Container ,Row, Col, ListGroup, Form, Button, Table} from "react-bootstrap";

import { useState,useEffect } from "react";
import { useDispatch } from 'react-redux';

import { useSelector } from "react-redux";
import { useProfileMutation } from "../slices/productapislice";
import {toast} from 'react-toastify';
import { setCredentials } from "../slices/authslice";
import Loader from '../components/Loader.js'
import { useGetmyordersQuery } from "../slices/productapislice";
import { Link } from "react-router-dom";

function ProfileScreen(){

    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [checkpassword,setcheckpassword]=useState('');

    const dispatch=useDispatch();
    const {userInfo}=useSelector((state)=>state.auth);

    const [updateuser,{isLoading}]=useProfileMutation();
    const  {
        data: orders,
        isLoading:Loading,
        isSuccess,
        isError,
        error
      } = useGetmyordersQuery();

      
  
    const submitHandler= async (e)=>{
        e.preventDefault();
        if(password!=checkpassword){
            toast("passwords did not match");
        }else{
            try {
                const res=await updateuser({name,email,password}).unwrap();

                dispatch(setCredentials({Name:res.name, emails:res.email,passwords:res.password,isAdmin:res.isAdmin}));
                toast("profile updated successfully");

            } catch (err) {
                console.log(err);
                toast(err.data);
            }
        }
    }
    
    
    return (
        <>
        {
            isLoading? <Loader/> :
       <Container>
       <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder="Enter Name" value={name} onChange={(e)=> setname(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder="Enter Email" value={email} onChange={(e)=> setemail(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder="Enter Password" value={password} onChange={(e)=> setpassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder="confirm Password" value={checkpassword} onChange={(e)=> setcheckpassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant="primary"  className="my-2">
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                {
                Loading?<Loader/>:
                <Table striped hover responsive className="table-sm">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {orders.map((order)=>{
                                return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.paid?"YES":"NO"}</td>
                                    <td>{order.isDelivered?"YES":"NO"}</td>
                                    <td><Link to={`/order/${order._id}`}>Details</Link></td>
                                </tr>
                                )
                            })}
                        </tbody>
                   

                </Table>
                }   
            </Col>
       </Row>
       </Container>

        }
        </>
    )
}

export default ProfileScreen;