import mongoose from "mongoose";


const url="mongodb+srv://tarun123:1234567890@cluster0.vtdygf6.mongodb.net/";

async function main() {

    try{
        
        const conn= await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("mongodb connected");
    }catch(err){

        console.log(err);
    }
  
}

export default main;