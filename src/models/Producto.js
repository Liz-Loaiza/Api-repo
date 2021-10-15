const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const productoSchema = new Schema({
nombre_producto: {type: String},    
descripcion_producto: {type: String},    
precio: {type: Number},
id_categoria: {type: mongoose.ObjectId},
img: {type: String}
},
{collection : 'Producto'}
);

productoSchema.methods.setImg= function(file){
    this.img= '/public/'+file
}
module.exports= mongoose.model('Producto', productoSchema);
//export default usuario;