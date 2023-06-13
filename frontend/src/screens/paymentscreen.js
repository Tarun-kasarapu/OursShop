import { useState , useEffect} from "react";
import { Container,Row,Col,Form, Button } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { saveshippingAddress,savePaymentMethod } from "../slices/cartslice";
import { useNavigate } from "react-router-dom";
import { FaCommentsDollar } from "react-icons/fa";


function PaymentScreen(){
    const [paymentMethod,setpaymentMethod]= useState('paypal');

    const cart=useSelector( (state) =>state.cart);
    
    const {shippingAddress }=cart;
    const navigate=useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
            
            if(!shippingAddress){
                
                navigate('/shipping');
            }
    },[shippingAddress,navigate]);

    const submitHandler=(e)=>{
        
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    }

    return (
        <Container>
            <Row  className='justify-content-md-center'>
                <Col md={6}>
                    <h1>Payment Method</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Label>Select Method</Form.Label>
                        <Form.Check type='radio' className="my-2" label="Paypal or Credit Card" id='Paypal' name='paymentMethod' value='Paypal' checked onChange={(e)=>setpaymentMethod(e.target.value)}>

                        </Form.Check>
                        <Button type='submit' variant='primary' className="my-2">
                            Continue
                        </Button>
                    </Form>
                    
                </Col>

            </Row>

        </Container>    
    );


}

export default PaymentScreen;