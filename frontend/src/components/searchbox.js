import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function SearchBox(){
     const navigate=useNavigate();
     const [keyword,setkeyword]=useState('');

    const submithandler=(e)=>{
            e.preventDefault();
            if(keyword.trim()){
                navigate(`/search/${keyword}`);
            }else{
                navigate('/');
            }
    }
     return (
        <Form onSubmit={submithandler} className="d-flex">
            <Form.Control type='text' onChange={(e) => setkeyword(e.target.value)} value={keyword} placeholder="Search Products">
                
            </Form.Control>
            <Button type='submit' variant="outline-success" className="p-2 mx-2" >
                Search
            </Button>
        </Form>
     )

}

export default SearchBox;