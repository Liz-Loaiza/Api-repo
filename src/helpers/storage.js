const multer=require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,next){
        next(null, './uploads/img/')
    },
    filename: function(req,file,next)
    {
        next(null, Date.now()+file.originalname)
    }
})

const upload=multer({storage: storage})

module.exports= upload