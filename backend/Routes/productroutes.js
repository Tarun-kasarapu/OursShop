import express from 'express';
const router=express.Router();

import Product from "../schema/ProductModel.js";
import User from "../schema/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

///security middle wares custom before actullay going to routes

const protect = async (req,res,next) => {
   
    //reading the jwt from cookie
  
    let token;
    token = req.cookies.jwt;
    
    //console.log(token);
    if(token){
        try {
            const decoded= await jwt.verify(token,'abc123');
            console.log(decoded);
            req.user=await User.findById(decoded.userId);
            console.log(req.user);
            next();
        } catch (err) {
        
            res.status(401);
            res.send("token failed");
        }
    }else{
        res.status(401);
        res.send("No authorization,No token");
    }
}

///admin middle ware
 const admin = async (req,res,next)=>{
    console.log('checker');
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        res.send("not authorized as admin");
    }
 }
 
 router.get('/top',async (req,res)=>{
    console.log("hello");
    const Products=await Product.find({}).sort({rating:-1}).limit(3);
    
    res.status(200).json(Products);
})



router.get('/', async (req,res)=>{
    
   
    try{

        console.log(req.query);

        const keyword=req.query.keyword?{name:{$regex : req.query.keyword,$options:'i'}}:{};
        console.log(keyword);
        const Products=await Product.find({...keyword});
        res.json(Products);
    }catch(err){
        res.send(err);
    }
})

router.get('/:id', async (req,res)=>{
    //console.log(req.params);
    try{
        const product=await Product.findById(req.params.id);
        res.status(201).json(product);
    }catch(err){
        console.log(err);
        res.status(404);
        res.send("Product not found");
    }
})

router.post('/',protect,admin,async(req,res)=>{
    console.log("hello");
    try{
        const product= new Product({
            name:'Sample name',
            price:0,
            user:req.user._id,
            image:'/images/sample.jpg',
            category:"sample category",
            countInStock:0,
            numReviews:0,
            brand:'unknown',
            description:'Sample description'
        });
        console.log(product);
        const createdProduct=await product.save();
        res.status(201).json(createdProduct);
    }catch(err){
        console.log(err);
        res.status(404);
        res.send('cannot create product');
    }
})

router.put('/:id',protect,admin,async (req,res)=>{
    
    const {
        name,price,image,category,countInStock,numReviews,brand,description
    }=req.body;

    const   product=await Product.findById(req.params.id);
    console.log(product);
    console.log(req.user);
    if(product){
        product.name=name;
        product.price=price;
        product.user=req.user._id;
        product.image=image;
        product.category=category;
        product.countInStock=countInStock;
        product.numReviews=numReviews;
        product.brand=brand;
        product.description=description;
        
        const updatedproduct=await product.save();
        res.status(200).json(updatedproduct);
    }else{
        res.status(401);
        res.send("product not found");
    }
    
})

router.delete('/:id',protect,admin,async (req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
        await Product.deleteOne({_id:product._id});
        res.status(200).send("Product deleted successfully");
    }else{

        res.status(401).send("Product not found");
    }
})


export default router;