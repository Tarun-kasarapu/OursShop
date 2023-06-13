import path from 'path';
import express from "express";
import ProductRoutes from './Routes/productroutes.js';
import UserRoutes from "./Routes/userroutes.js";
import OrderRoutes from "./Routes/orderroutes.js"
import cookieParser from "cookie-parser";
import UploadRoutes from "./Routes/uploadroutes.js"
import main from './connectdb.js';
import { dir } from 'console';

main();
const port=process.env.PORT || 5000;

const app=express();

/// body-parser middle-ware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

/// cookie-parser middle-ware
app.use(cookieParser());



app.use('/api/products',ProductRoutes); 
app.use('/api/users',UserRoutes);
app.use('/api/orders',OrderRoutes);
app.use('/api/upload',UploadRoutes);

const __dirname=path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }




app.listen(port,()=>{
    console.log("listening on port");
})


