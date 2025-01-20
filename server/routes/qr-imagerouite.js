const express =require('express')
const multer =require('multer')


const router = express.Router()

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/Qrcode')
    },
    filename:(req,file,cb)=>{
        cb(null,`${req.body.appontmentId}`)
    }
})
const upload = multer({storage:storage})

router.post('/',upload.single('avatar'),(req,res)=>{
    
    console.log(req.file.filename);// it is showing undefined
    
const url = `http://localhost:8000/Qrcode/${req.file.filename}`
return res.status(200).json({url})
})

module.exports=router