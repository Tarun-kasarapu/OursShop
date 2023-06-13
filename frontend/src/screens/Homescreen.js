import Product from "../components/card.js"
import {Row, Col, Container} from "react-bootstrap";
//import axios from 'axios';
//import { useEffect, useState } from "react";
import { useGetProductsQuery } from '../slices/productapislice.js';
import Loader from "../components/Loader.js";
import { useParams } from "react-router-dom";
import ProductCarousel from "../components/Productcarousel.js";

function Homescreen(){

    /*const [products,Setproducts]=useState([]);

    useEffect(()=>{

         async function getData(){
            const res = await axios.get('/api/products');
            console.log(res);
            Setproducts(res.data);
         }
         getData();

    },[]);*/

    const {keyword}=useParams();
    console.log(keyword);
    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetProductsQuery(keyword);
      /*console.log(useGetPostsQuery());
      console.log("Hello");
      console.log(products);*/
    return (
        <Container>
           
                {
                    isLoading?<Loader/>:isError?{error}:

                            <>
                            <ProductCarousel/>
                            <h2>Latest Products</h2>
                            <Row >
                           { products.map((item)=>{

                            return (<Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                                <Product item={item}/>
                            </Col>) })
                            }
                            </Row>
                            </>

                }
            
        </Container>
    );
}

export default Homescreen;