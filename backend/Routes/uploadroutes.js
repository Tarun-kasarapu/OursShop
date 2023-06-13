import path from 'path';
import express from 'express';
import multer from 'multer';



const router=express.Router();

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'../frontend/public/images');
    },
    filename(req,file,cb){
        cb(null,`${file.filename}-${Date.now()}${path.extname(file.originalname)}`);
    }
})
function checkFileType(file,cb){
    const filetypes=/jpg|jpeg|png/;
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype=filetypes.test(file.mimetype);
    if(extname && mimetype){
        return cb(null,true)
    }else{
        cb('Images Only');
    }
}

const upload=multer({
    storage,
})

router.post('/',upload.single('image'),async (req,res)=>{
        
        res.send({
            message:"Image uploaded successfully",
            image:`/images/${req.file.filename}`,
        })
})

export default router;
