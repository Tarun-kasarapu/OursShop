import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button ,Container,Row,Col,Image,ListGroup, Card} from "react-bootstrap";
import Rating from "../components/Rating.js";
import { useGetProductQuery } from "../slices/productapislice.js";
import Loader from "../components/Loader.js";
import { addtoCart } from "../slices/cartslice.js";
import { useDispatch } from "react-redux";

function ProductScreen(){

    //const [Product,Setproduct]=useState({});
    const {id}=useParams();
    const [Qty, SetQty]=useState((1));

    const { data: Product, isFetching, isSuccess } = useGetProductQuery(id);

    /*useEffect(()=>{

         async function getData(){
            const res = await axios.get(`/api/products/${id}`);
            console.log(res);
            Setproduct(res.data);
         }
         getData();

    },[]);*/
    
    const dispatch= useDispatch();
    const navigate=useNavigate();

    const addtoCartHandler=()=> {
        dispatch(addtoCart({...Product,Qty}));
        navigate("/Cart");
    }


    //console.log([...Array(Product.countInStock).keys()]);
        
        return (
            <>
            {
                isFetching?<Loader/>:
            <>
                <Container>
                <Link to="/">
                    <Button className="my-3" variant="light">Go Back</Button>
                </Link>
                <Row>
                    <Col md={5}>
                        <Image  src={Product.image} alt={Product.name} fluid/>
                    </Col>
                    <Col md={4}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{Product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={Product.rating} text={`${Product.numReviews}Reviews`}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price:${Product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {Product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Price:
                                        </Col>
                                        <Col>
                                            <strong>${Product.price}</strong>
                                        </Col>
                                    </Row>  
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Status:
                                        </Col>
                                        <Col>
                                            <strong>{Product.countInStock>0? "In Stock": "Out of Stock" }</strong>
                                        </Col>
                                    </Row> 
                                    
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Qty:    
                                        </Col>
                                        <Col>
                                            
                                           <Form.Control type='number' as="select" value={Qty} onChange={(e)=>{
                                                SetQty(e.target.value);
                                           }}>
                                                {[...Array(Product.countInStock).keys()].map((x)=>{
                                                    
                                                    return (<option key={x+1} value={x+1}>
                                                                {x+1}
                                                            </option>
                                                            )
                                                })}
                                           </Form.Control>
                                        </Col>
                                    </Row> 
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button variant="dark" onClick={addtoCartHandler} disabled={Product.countInStock==0}>
                                        Add to Card
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                </Container>
            </>

            };
            </>
        );

}

export default ProductScreen;