
import { useState } from "react";
import { Container,Row,Col ,Form,Button} from "react-bootstrap";
import Header from "../components/Header";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveshippingAddress } from "../slices/cartslice";

function ShippingScreen(){

    const cart=useSelector( (state) =>state.cart);
    
    const {shippingAddress }=cart;

    const [address,setaddress]=useState(shippingAddress?.address|| '');
    const [city,setcity]=useState(shippingAddress?.city || '');
    const [postalcode,setpostalcode]=useState(shippingAddress?.postalcode || '');
    const [country,setcountry]=useState(shippingAddress?.country || '');

    
    

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(saveshippingAddress({address,city,postalcode,country}));
        navigate('/payment');
    }

    return(
            <>
            
            <Container>
                <Row  className='justify-content-md-center'>
                    <Col md={6}>
                            <h1 className='my-3'>Shipping</h1>
                
                
                            <Form onSubmit={submitHandler} >
                                <Form.Group>
                                    <Form.Label><h5>Address</h5></Form.Label>
                                    <Form.Control type='text' placeholder='Enter Address' value={address} onChange = { (e) => setaddress(e.target.value)}>

                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className='mt-2'>
                                <Form.Label><h5>City</h5></Form.Label>
                                <Form.Control type='text' placeholder='Enter City' value={city} onChange = { (e) => setcity(e.target.value)}>

                                </Form.Control>
                                </Form.Group>
                                <Form.Group className='mt-2'>
                                <Form.Label><h5>PostalCode</h5></Form.Label>
                                <Form.Control type='text' placeholder='Enter Postalcode' value={postalcode} onChange = { (e) => setpostalcode(e.target.value)}>

                                </Form.Control>
                                </Form.Group>
                                <Form.Group className='mt-2'>
                                <Form.Label><h5>Country</h5></Form.Label>
                                <Form.Control type='text' placeholder='Enter Country' value={country} onChange = { (e) => setcountry(e.target.value)}>

                                </Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary' className='my-3' >
                                    Continue to Payment
                                </Button>
                
                            </Form>
                    </Col>
                </Row>
            </Container>
            </>
    )

}

export default ShippingScreen;