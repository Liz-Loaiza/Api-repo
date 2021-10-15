const jwt = require('jsonwebtoken')
const user = require('../models/Usuario')
//const aes = require('../helpers/aes.cipher')
const bcrypt= require('bcrypt')
const authService ={
    signToken: async function(id){
        return jwt.sign({id}, 'my App', {
            expiresIn: 60 * 60 * 24 * 365
        })
    },

    login: async function(data){
    try {
            const {nombreusuario, contraseña}= data;
           // let pass = aes.encrypt(contraseña);
            let userExists = await user.findOne({nombreusuario: nombreusuario},'nombreusuario email contraseña').exec()
           // if(userExists)
            if(await bcrypt.compare(contraseña, userExists.contraseña).then(res => res))
            {
                const token = await this.signToken(userExists.id)
                return {
                user: userExists,
                code: 200,
                token
                }
             } else{
                return {
                    code:400,
                    error: true,
                    msg: "Los datos de ingreso no son validos"
                }            
             }
          
        } catch (error) {
              return error
        }
    },

    register: async function(userData){
        try {
           // let pass = aes.encrypt(userData.contraseña)
           let pass = await bcrypt.hash(userData.contraseña,10).then(res => res)
            console.log(userData.nombreusuario)
            userData.contraseña = pass
            await userData.save();
            let token = await this.signToken(userData._id)
            return {               
                user: userData,
                code: 200,
                token
            }
        } catch (error) {
            return error
        }
    }
}

module.exports= authService