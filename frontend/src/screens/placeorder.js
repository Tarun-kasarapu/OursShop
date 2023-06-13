import { useSelector,useDispatch } from "react-redux";
import {Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {Row,Col,ListGroup,Image,Form,Button,Card,Container, Toast} from 'react-bootstrap';
import {FiFrown } from "react-icons/fi";
import { clearcartItems } from "../slices/cartslice";
import { useCreateOrderMutation } from "../slices/productapislice";
import {toast} from 'react-toastify'

function PlaceOrder(){

    const navigate=useNavigate();
    const cart = useSelector((state)=>state.cart);
    const dispatch=useDispatch();
    const {cartItems}=cart;
    const [createorder]=useCreateOrderMutation();
    
    useEffect(()=>{
        if(!cart.shippingAddress.address){
            navigate('/shipping');
        }else if(!cart.paymentMethod){
            navigate('/payment');
        }
    },[cart.shippingAddress.address,cart.paymentMethod,navigate]);

    const placeorderhandler=async ()=>{
        console.log("hello");
        try {
            const res= await createorder({
                orderItems:cart.cartItems,
                shippingAddress:cart.shippingAddress,
                paymentMethod:cart.paymentMethod,
                itemPrices:cart.itemPrices,
                shippingPrice:cart.shippingPrice,
                taxPrice:cart.taxPrice,
                totalPrice:cart.totalPrice,
            }).unwrap();
            dispatch(clearcartItems());
            navigate(`/order/${res._id}`)
        } catch (err) {
            console.log(err);
            toast(err.data);
        }
    }
    return(
        <>
            <Container>
                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>
                                        Address:
                                    </strong>
                                    {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}{cart.shippingAddress.postalcode},{' '}
                                    {cart.shippingAddress.country}
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>
                                        Method:
                                    </strong>
                                    {' '}{cart.paymentMethod}
                                </p>
                            </ListGroup.Item>

                                {cartItems.length==0?
                                    <ListGroup.Item>
                                        <h2 style={{marginTop:"20px"}} > <FiFrown/>  Oops!! No items in the cart</h2>
                                            <Link to="/">
                                            <Button className="my-3" variant="light">Go Back</Button>
                                             </Link>
                                    </ListGroup.Item>
                                :
                                    <ListGroup.Item>
                                        <h2>Order Items</h2>
                                    <ListGroup variant="flush">
                                    { cartItems.map((item) =>{
                            
                                    return (<ListGroup.Item key={item._id}>
                                            <Row>
                                                <Col md={4}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col md={3}>
                                                    <Link to={`/product/${item._id}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={3}>
                                                    {item.Qty}*${item.price}
                                                </Col>
                                                <Col md={2}>
                                                    ${item.Qty*item.price}
                                                </Col>
                                                
                                                
                                            </Row>
        
                                    </ListGroup.Item>); 
                                   
        
        
                                })
                                
                            }
                            </ListGroup>
                            </ListGroup.Item>
                                
                            }
                            
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Items:
                                    </Col>
                                    <Col>
                                        ${cart.itemPrices}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping:
                                    </Col>
                                    <Col>
                                        ${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Taxes:
                                    </Col>
                                    <Col>
                                        ${cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total cost:
                                    </Col>
                                    <Col>
                                        ${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className="btn-block" onClick={placeorderhandler}>
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default PlaceOrder;