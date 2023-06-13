import {Link , useNavigate, } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

import {Row,Col,ListGroup,Image,Form,Button,Card,Container} from 'react-bootstrap';

import {FaCommentsDollar, FaTrash} from "react-icons/fa";
import {FiFrown } from "react-icons/fi";
import Header from '../components/Header';
import { addtoCart ,removefromCart} from '../slices/cartslice';
function CartScreen(){

    
    const {cartItems}=useSelector((state)=>state.cart);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const addtoCartHandler=async (item,Qty)=>{
        
        dispatch(addtoCart({...item,Qty}));
        
    }
    const removefromCartHandler= (id)=>{
        dispatch(removefromCart(id));
    }

    const checkoutHandler=()=>{
       
        navigate('/login?redirect=/shipping');
    }
    return (
        <div>
            
            <Container>
                <h1 style={{marginTop:"10px",marginBottom:"20px"}} >Shopping Cart</h1>
                {cartItems.length==0?
                    <div>
                    <h2 style={{marginTop:"20px"}} > <FiFrown/>  Oops!! No items in the cart</h2>
                    <Link to="/">
                        <Button className="my-3" variant="light">Go Back</Button>
                    </Link>
                    </div>
                    :
                    <Row>
                    <Col md={8}>
                    <ListGroup variant='flush'>
                        {cartItems.map((item) =>{
                            
                            return (<ListGroup.Item key={item._id}>
                                    <Row>
                                        <Col md={3}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={2}>
                                            <Link to={`/product/${item._id}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>
                                            ${item.price}
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control as="select" value={item.Qty} onChange={(e)=> addtoCartHandler(item,Number(e.target.value))}>
                                                {[...Array(item.countInStock).keys()].map((x)=>{
                                                    
                                                    return (<option key={x+1} value={x+1}>
                                                                {x+1}
                                                            </option>
                                                            )
                                                })}
                                           </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                                <Button type="button" variant='light' onClick={()=>{
                                                    return removefromCartHandler(item._id);
                                                }}>
                                                    <FaTrash/>
                                                </Button>
                                        </Col>
                                    </Row>

                            </ListGroup.Item>); 


                        })}

                    </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>
                                    Subtotal({cartItems.reduce((acc,item)=> acc+(Number)(item.Qty),0)})items
                                </h2>
                                $({cartItems.reduce((acc,item)=> acc+(Number)(item.Qty)*(item.price),0)})
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' onClick={()=> checkoutHandler()}>
                                    Go to Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                        </Card>
                    
                    </Col>


                    </Row>
                }
            </Container>
        </div>
    );

}

export default CartScreen;