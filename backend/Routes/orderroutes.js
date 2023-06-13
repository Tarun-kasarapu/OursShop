import Order from "../schema/orderModel.js";
import express from 'express';
const router=express.Router();
import jwt from 'jsonwebtoken';
import User from "../schema/userModel.js";
import Product from "../schema/ProductModel.js";


///security middle wares custom before actullay going to routes

const protect = async (req,res,next) => {
   
    //reading the jwt from cookie

    let token;
    token = req.cookies.jwt;
    console.log(token);
   
    if(token){
        try {
            const decoded= await jwt.verify(token,'abc123');
            
            req.user=await User.findById(decoded.userId);
            
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
   
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        res.send("not authorized as admin");
    }
 }

///createorder
///post request 
/// api/orders

const addorder=async(req,res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    }=req.body;
    if(orderItems && orderItems.length==0){
        res.status(400);
        res.send("No order Items");
    }else{
        
        const changedItems=orderItems.map( (x) => {
                
            return { 
             name: x.name,
             qty: x.Qty,
             image: x.image,
             price: x.price,
             product: x._id,
            }

     }
     )
     //console.log(changedItems);
        
        const order=new Order({
            orderItems:changedItems.map((x)=>{
                console.log(x);
                return {
                    ...x
                };
            }),
            user:req.user._id,
            shippingAddress:{
                ...shippingAddress,
                postalCode:shippingAddress.postalcode,
            },
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
        //console.log(order);
        const createorder = await order.save();

        res.status(201).json(createorder);
    }
}

///get request api/orders/myorders

const getmyorders=async (req,res) => {
    const orders=await Order.find({user:req.user._id});
    console.log(orders);
    res.status(200).json(orders);
}

//get orderby id api/orders/:id

const getorderbyid=async (req,res) => {
      
    const order = await Order.findById(req.params.id);
    
    if(order){
        res.status(200).json(order);
    }else{
        res.status(401);
        res.send("Order not found");
    }
}

///update order to paid
//put  api/orders/:id/pay

const updateordertopaid=async (req,res)=>{
    res.send("order paid");
}


// admin access


///update order to delivered
//put api/orders/:id/deliver

const updateordertodeliver=async (req,res)=>{
    const order = await Order.findById(req.params.id);
    console.log(order);
    if(order){

        order.isDelivered=true;
        order.deliveredAt=Date.now();

        const updatedOrder=await order.save();
        console.log(updatedOrder);
        res.status(201).json(updatedOrder);
    }else{
        res.status(404);
        res.send("Order not found");
    }
}


///get all orders
//get api/orders/

const getallorders=async (req,res)=>{
    
    const orders=await Order.find({});
    
    res.status(201).json(orders);
}

router.route('/').post(protect,addorder).get(protect,admin,getallorders);
router.route('/myorders').get(protect,getmyorders)
router.route('/:id').get(protect,getorderbyid);
router.route('/:id/pay').put(protect,updateordertopaid);
router.route('/:id/deliver').put(protect,admin,updateordertodeliver); 
 


export default router;








