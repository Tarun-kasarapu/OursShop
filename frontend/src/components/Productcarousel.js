import { Carousel, Image } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productapislice";
import { Link } from "react-router-dom";
import Loader from "./Loader";
function ProductCarousel(){

    const  {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error
      }= useGetTopProductsQuery();
    console.log(useGetTopProductsQuery());

    return (
        <>
            {
                isLoading?<Loader/>:
                <Carousel pause='hover' className="bg-primary mb-4">
                    {
                        products.map((product)=>{
                            return (
                                <Carousel.Item key={product._id}>
                                    <Link to={`product/${product._id}`}>
                                        <Image src={product.image} alt={product.name}></Image>
                                        <Carousel.Caption>
                                                <h3>{product.name}</h3>
                                                   
                                        </Carousel.Caption>
                                    </Link>
                                    
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
            }
        </>
    )
}
export default ProductCarousel;