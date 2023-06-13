
import { useParams } from "react-router-dom";
import { useGetorderdetailsQuery } from "../slices/productapislice";
import Loader from "../components/Loader";
import { Container,Row, Col, ListGroup ,Image, Card, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDeliverOrderMutation } from "../slices/productapislice";

import {toast} from "react-toastify";
function OrderScreen(){
    const {userInfo}=useSelector((state)=>state.auth);
    const {id}=useParams();
    const  {
        data: order,
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetorderdetailsQuery(id);
    
    const [DeliveryOrder]=useDeliverOrderMutation();

    
    const Markasdelivered =async () =>{
       
        try {
            const res=await DeliveryOrder(id).unwrap();
        
        } catch (err) {
           
            toast(err.data);
        }
    }
    console.log(order);
    return (
        <div>
        {
            isLoading?<Loader/>:
        
            <Container>
                <h1>{order._id}</h1>
                <Row>
                    <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>
                                            Name:
                                        </strong>
                                           {' '} {userInfo.Name}
                                    </p>
                                    <p>
                                        <strong>
                                            Email:
                                        </strong>
                                           {' '} {userInfo.emails}
                                    </p>
                                    <p>
                                        <strong>
                                            Address:
                                        </strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}{order.shippingAddress.postalcode},{' '}
                                        {order.shippingAddress.country}
                                    </p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Delivery Status</h2>
                                    { order.isDelivered? (
                                        <p>
                                            Delivered on {order.deliveredAt}
                                        </p>
                                    ):(
                                        <p>
                                            Not Delivered
                                        </p>
                                    )
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>
                                            Method:
                                        </strong>
                                        {' '}{order.paymentMethod}
                                    </p>
                                    
                                        {order.isPaid?
                                            <p>Paid</p>:
                                            <p>Not Paid</p>
                                        }
                                    
                            </ListGroup.Item>
                            <ListGroup.Item>
                                        <h2>Order Items</h2>
                                    <ListGroup variant="flush">
                                    { order.orderItems.map((item) =>{
                            
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
                                                    {item.qty}*${item.price}
                                                </Col>
                                                <Col md={2}>
                                                    ${item.qty*item.price}
                                                </Col>
                                                
                                                
                                            </Row>
        
                                    </ListGroup.Item>); 
                                   
        
        
                                })
                                
                            }
                            </ListGroup>
                            </ListGroup.Item>
                            </ListGroup>
                    </Col>
                    <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Price</h2>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total cost:
                                    </Col>
                                    <Col>
                                        ${order.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <div>
                                {userInfo && userInfo.isAdmin?
                                <ListGroup.Item>
                                    {order.isDelivered?
                                    <Button variant='primary'>
                                        Delivered
                                    </Button>:
                                    <Button onClick={Markasdelivered} variant="primary">
                                        Mark as delivered
                                    </Button>
}
                                </ListGroup.Item>:
                                    ""
                                }
                            </div>
                            
                        </ListGroup>

                        </Card>
                    </Col>
                </Row>
            </Container>
        
        }
        </div>
    )
    
}

export default OrderScreen;