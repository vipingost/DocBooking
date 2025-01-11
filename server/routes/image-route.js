const express =require('express')
const uniqid= require('uniqid')
const multer =require('multer')


const router = express.Router()

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,`${uniqid()}-${file.originalname}`)
    }
})
const upload = multer({storage:storage})

router.post('/', upload.single('avatar'),(req,res)=>{
const url = `http://localhost:8000/images/${req.file.filename}`
return res.status(200).json({url})
})

module.exports=router