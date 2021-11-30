const mongoose= require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcryptjs')

const UserSchema= new Schema({
    name:{type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    date:{type: Date, default:Date.now}
})

UserSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hash(password,salt)
    return hash
}

// Para poder hacer referencia al password guardado en la base de datos se hace uso de la palabra this, y para ello
//solo se puede por medio de la escritura de la funcion tradicional
UserSchema.methods.matchPassword =  async function (password){
    return await bcrypt.compare(password, this.password)
} 

module.exports= mongoose.model('User',UserSchema)