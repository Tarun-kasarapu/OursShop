import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import Rating from "./Rating.js";
import "./card.css";


function Product({item}){

        
        return (
            <Card className="my-3 p-3 rounded ">
                
                <Link to={`/product/${item._id}`}>

                    <Card.Img src={item.image}  varient="top"/>
                </Link>
                <Card.Body>
                    <Link to={`/product/${item._id}`}>
                        <Card.Title className="product-title"> {item.name}</Card.Title>
                        
                    </Link>
                    <Rating value={item.rating} text={`${item.numReviews}Reviews`}/>
                    <Card.Text as="h3">${item.price}</Card.Text>
                </Card.Body>
            </Card>
        )



}

export default Product;