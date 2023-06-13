import { Button, Container, Row, Col, Table } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productapislice";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { useCreateProductMutation,useDeleteProductMutation } from "../slices/productapislice";
import {toast} from 'react-toastify';

function ProductListScreen(){

    const  {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetProductsQuery();
      console.log(products);

    const [createProduct,{isLoading:Loadingcreate}]=useCreateProductMutation();
    const [deleteProduct]=useDeleteProductMutation();
    const createProducthandler=async ()=>{
        try {
            const res=await createProduct();
            console.log(res);
            toast("product created Successfully");
        } catch (err) {
            toast(err.data);
        }
    }
    const deletehandler=async(id)=>{
        try {
            
            const res=await deleteProduct(id);
            toast(res);
        } catch (err) {
            toast(err.data);
        }
    }

    return(
        <Container>
            <Row>
                <Col>
                    <h2>Products</h2>
                </Col>
                <Col className='text-end'>
                    <Button className="btn-sm" onClick={createProducthandler}>
                        CreateProduct
                    </Button>
                </Col>
            </Row>
            {
                isLoading?<Loader/>:
                <Table striped hover responsive className="table-sm">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {products.map((product)=>{
                                return (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td><Link to={`/product/${product._id}`}>Details</Link> </td>
                                    <td><Link to={`/admin/products/${product._id}`}>Edit</Link></td>
                                    <td><Button variant='danger' onClick={()=>deletehandler(product._id)} >Delete</Button></td>
                                </tr>
                                )
                            })}
                        </tbody>
                   

                </Table>
            }
        </Container>
        
    )
}

export default ProductListScreen;