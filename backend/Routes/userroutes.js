import express from "express";
const router=express.Router();
import User from "../schema/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

///security middle wares custom before actullay going to routes

const protect = async (req,res,next) => {
   
    //reading the jwt from cookie

    let token;
    token = req.cookies.jwt;
   
    console.log(token);
    if(token){
        try {
            const decoded= await jwt.verify(token,'abc123');
            console.log(decoded);
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


/// post request 
/// api/users/login
const authuser = async (req,res) => {
    const { email , password } = req.body 
    const user = await User.findOne({email});
    if(!user){
        res.status(401);
        res.send("Cannot find user");
        return;
    }

    const check= await bcrypt.compareSync(password,user.password);
    if(user && check){
        const token = jwt.sign({userId : user._id},'abc123',{
            expiresIn:'30d'
        })

        //set jwt as htttp-only-cookie
        res.cookie('jwt',token,{
            httpOnly:true,
            samesite:'strict',
            maxAge:30*24*60*60*1000,
        })
        res.status(200).json(user);
    }else{
        res.status(401);
        res.send("Invalid email or password");
    }
   
}

///post request
///api/users/

const registeruser = async (req,res) => {
    let { name, email,password}=req.body;
    

    const userexist= await User.findOne({email});

    password=bcrypt.hashSync(password,10);

    if(userexist){
        res.status(400);
        res.send("user already exist");
    }else{

        const user = await User.create({
            name,
            email,
            password        
        })
        if(user){
            const token = jwt.sign({userId : user._id},'abc123',{
                expiresIn:'30d'
            })
    
            //set jwt as htttp-only-cookie
            res.cookie('jwt',token,{
                httpOnly:true,
                samesite:'strict',
                maxAge:30*24*60*60*1000,
            })
            res.status(201).json(user);
        }else{
            res.status(400);
            res.send("cannot create user");
        }
    }

}

//post request
//api/users/logout
const logoutuser = async (req,res) => {
    res.cookie('jwt', '', {
        httpOnly:true,
        expires:new Date(0),
    });
     
    res.status(200);
    res.send("logout successfully");

}

///get request
///api/users/profile

const getuserprofile = async (req,res) => {
    
    const user = await User.findById(req.user._id);
    if(user){
        res.status(201).json(user);
    }else{
        res.status(404);
        res.send("cannot get profile");
    }
    
}

///put request
// api/users/profile

const updateuserprofile = async (req,res) => {
    const user = await User.findById(req.user._id);
    

    if(user){
        user.name = req.body.name || user.name;
        user.email= req.body.email || user.email;
        if(req.body.password){
            user.password=bcrypt.hashSync(req.body.password,10);
        }
        const updateuser=await user.save();

        res.status(201).send(updateuser);

    }else{
        res.send("cannot find user");
    }
}

///admin access


//get request
//api/users/
const getusers = async (req,res) => {
    res.send("get all users");
}

///delete request
///api/users/:id

const deleteuser = async (req,res) =>{
    res.send("delete users");
}



router.route('/').get(protect,admin,getusers).post(registeruser);
router.route('/logout').post(protect,logoutuser);
router.route('/profile').get(protect,getuserprofile).put(protect,updateuserprofile);
router.route('/login').post(authuser);
router.route('/:id').delete(protect,admin,deleteuser);


export default router;




