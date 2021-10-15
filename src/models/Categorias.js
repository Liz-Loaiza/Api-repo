const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const categoriaSchema = new Schema({
nombre_categoria: {type: String},   
},
{collection : 'categorias'}
);

module.exports= mongoose.model('categoria', categoriaSchema);
//export default usuario;