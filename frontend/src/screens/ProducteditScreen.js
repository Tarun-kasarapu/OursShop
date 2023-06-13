import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {Button, Container,Row, Col, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUpdateProductMutation,useUploadimageMutation } from '../slices/productapislice';
import {toast} from 'react-toastify';
function ProductEditScreen(){

    const { id}=useParams();

    const [ name,setname]=useState('');
    const [price,setprice]=useState(0);
    const [image,setimage]=useState('');
    const [brand,setbrand]=useState('');
    const [category,setcategory]=useState('');
    const [countInStock,setcountInStock]=useState(0);
    const [description,setdescription]=useState('');
    const [numReviews,setnumreviews]=useState(0);

    const [EditProduct]=useUpdateProductMutation();
    const [ uploadimage ]=useUploadimageMutation();

    const submitHandler=async (e)=>{
        e.preventDefault();
        console.log("ki");
        try {
            const res=await EditProduct({
                _id:id,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
                numReviews,
            }).unwrap();
            console.log(res);
        } catch (err) {
            console.log(err);
        }
       
    }

    const uploadfilehandler=async(e)=>{
        e.preventDefault();
        console.log(e.target.files[0]);
        const formdata=new FormData();
        formdata.append('image',e.target.files[0]);
        try{
            const res=await uploadimage(formdata).unwrap();
            toast(res.message);
            setimage(res.image);

        }catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <Container>
                <Link to='/admin/products'>
                    <Button variant='primary' >
                        Go Back
                    </Button>
                </Link>
                
                <Row className='justify-content-md-center'>
                    <Col md={6}>
                        <h2>Edit Product</h2>
                        <Form onSubmit={submitHandler}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                type='text'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e)=> setname(e.target.value)}>

                                </Form.Control>
                            </Form.Group>
                            <Form.Group className='my-2'> 
                                <Form.Label>Price</Form.Label>
                                <Form.Control 
                                type='number'
                                placeholder='Enter Price'
                                value={price}
                                onChange={(e)=> setprice(e.target.value)}>

                                </Form.Control>
                            </Form.Group>
                            <Form.Group className='my-2'> 
                                <Form.Label>Image</Form.Label>
                                <Form.Control 
                                type='file'
                                label='choose Image'
                                
                                onChange={uploadfilehandler}>

                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='my-2'> 
                                <Form.Label>Category</Form.Label>
                                <Form.Control 
                                type='text'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e)=> setcategory(e.target.value)}>

                                </Form.Control>
                            </Form.Group>
                            <Form.Group className='my-2'> 
                                <Form.Label>Brand</Form.Label>
                                <Form.Control 
                                type='text'
                                placeholder='Enter Brandname'
                                value={brand}
                                onChange={(e)=> setbrand(e.target.value)}>

                                </Form.Control>
                            </Form.Group>
                            <Form.Group className='my-2'> 
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control 
                                type='number'
                                placeholder='Enter CountInStock'
                                value={countInStock}
                                onChange={(e)=> setcountInStock(e.target.value)}>

                                </Form.Control>
                            </Form.Group>
                            <Form.Group className='my-2'> 
                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                type='text'
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e)=> setdescription(e.target.value)}>

                                </Form.Control>
                            </Form.Group>
                            <Button type='submit' className='btn-button block my-2'>
                                Update
                            </Button>
                        </Form>
                    </Col>

                </Row>
                

            </Container>
        </>
    )
}

export default ProductEditScreen;