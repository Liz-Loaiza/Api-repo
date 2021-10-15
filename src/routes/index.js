const express = require('express');
const router =express.Router();
const usuario =require('../models/Usuario')
const authService =require('../services/auth.service')
const Producto = require('../models/Producto')
const categoria= require('../models/Categorias')
const upload= require('../helpers/storage');
//const Producto = require('../models/Producto');
//routes
router.get('/',async(req,res)=>{  
    res.send('Enviando datos get ...')  
});

router.post('/registro', async(req, res) => {
  
  try {
    const user = new usuario(req.body)
    console.log(user.nombreusuario)
    const userData = await authService.register(user)
   // res.status(200).json(userData)
    res.send(userData)
   
  } catch (error) {
  return res.status(500).json({
  mensaje: 'Ocurrio un error',
  error
  })
  }
  });

  // router.post('/',async(req,res)=>{
  //   //  res.send(new Item(req.body));
  //   //const item=new Item(req.body);
  //   //await item.save();
  //   res.send('Enviando datos post ...');
  // });  

  // router.post('/producto', async(req, res) => {
  //   const body = req.body;
  //   try {
  //     console.log("hola")
  //   const productDB = await producto.create(body);
  //   res.status(200).json(productDB);
  //   res.send(productDB);
  //   } catch (error) {
  //   return res.status(500).json({
  //   mensaje: 'Ocurrio un error',
  //   error
  //   })
  //   }
  //   });


  //INTENTO 1-IMG
/*   router.post('/producto', async(req, res) => {
    const body = req.body;
    try {
    console.log("hola")
    const {filename}=req.file;
    productDB.setImg(filename);
    const productDB = await producto.create(body);
    res.status(200).json(productDB);
    res.send(productDB);
    } catch (error) {
    return res.status(500).json({
    mensaje: 'Ocurrio un error',
    error
    })
    }
    }); */

  //INTENTO 2-IMG
  router.post('/producto', upload.single('img'), async(req, res) => {
    
    try {
    const producto = new Producto(req.body);    
    const {filename}=req.file;
    producto.setImg(filename);
    console.log(req.file);
    await producto.save();
    res.send(producto);
    } catch (error) {
    return res.status(500).json({
    mensaje: 'Ocurrio un error',
    error
    })
    }
    });
    
    router.get('/producto/:id', async(req, res)=>{

      const _id=req.params.id;
  
      try {
  
          const prodDB= await Producto.findOne({_id});
          res.json(prodDB);
          
      } catch (error) {
  
          return res.status(500).json({
  
              mensaje:'Ocurrio un error',
              error
          })
          
      }  
  });
  router.get('/productoxcat/:id', async(req, res)=>{
    const _id = req.params.id;
    console.log(_id)
    try {
        const prodDB= await Producto.find({id_categoria:_id});
        res.json(prodDB);
        
    } catch (error) {

        return res.status(500).json({
            mensaje:'Ocurrio un error '+_id,
            error
        })
        
    }  
});
  //Get con todos los documentos
  
  router.get('/productos',async(req,res)=>{
  
      try {
  
          const prodDB=await Producto.find();         
          res.json(prodDB);
          
      } catch (error) {
  
          return res.status(500).json({
  
              mensaje:'Ocurrio un error al traer los productos',
              error
          })
      }    
  });
  router.get('/categorias',async(req,res)=>{
  
    try {

        const categoriaDB=await categoria.find();
        res.json(categoriaDB);
        
    } catch (error) {

        return res.status(500).json({

            mensaje:'Ocurrio un error',
            error
        })
    }    
});
 //Delete 

router.delete('/producto/:id', async(req,res)=>{
  const _id=req.params.id;

  try {

      const prodDB=await Producto.findByIdAndDelete({_id});
      if(!prodDB){ 
          return res.status(400).json({ 
              mensaje: 'No se encontró el id indicado', error 
          }) 
      } 
      res.json(prodDB);
      
  } catch (error) {

      return res.status(500).json({

          mensaje:'Ocurrio un error',
          error
      })
      
  }
});

//Actualizar 

router.put('/producto/:id', async(req,res)=>{

  const _id=req.params.id;
  const body =req.body;

  try {

      const prodDB= await Producto.findByIdAndUpdate(_id,body,{new:true});
      res.json(prodDB);      
  } catch (error) {

      return res.status(500).json({

          mensaje:'Ocurrio un error',
          error
      })
      
  }
})

//---------------auth routes
 router.post('/login', async (req,res)=>{
    try {
      const {nombreusuario, contraseña} = req.body
      if(!nombreusuario || !contraseña)
      {
        return res.status(400).json('usuario y password requeridos')
      }
      let token = await authService.login(req.body)
      if(token)
      {
        res.status(token.code).json(token)
      }
    } catch (error) {
      res.send(error)
    }
}),
/*router.post('/register', async (req,res)=>{
  try {
    const user = new User(req.body)
    const userData = await authService.register(user)
    res.send(userData)
  } catch (error) {
    res.send(error)
  }
}) */

module.exports = router
