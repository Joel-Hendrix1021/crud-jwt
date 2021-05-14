const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    email: String,
    username:String,
    password:String,

})

UserSchema.methods.encryptPassword= async(password) =>{
    const salt = await bcrypt.genSalt(10)
    const encryptPassword = await bcrypt.hash(password, salt)
    return encryptPassword
}

UserSchema.methods.comparePassword= async function (password){
    return await bcrypt.compare(this.password, password)
}

module.exports = model('User', UserSchema)

