const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
nombreusuario: {type: String},    
contraseña: {type: String},    
nombres: {type: String},
apellidos: {type: String},
email: {type: String},
telefono: {type: String}
},
{collection : 'Usuarios'}
);

module.exports= mongoose.model('usuario', usuarioSchema);
//export default usuario;