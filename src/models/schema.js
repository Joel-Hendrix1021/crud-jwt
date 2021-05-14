const {Schema, model} = require('mongoose')

const taskSchema = new Schema({
    title: String,
    description: String,
    date:{
        type:Date,
        default: Date.now(),
    } 

})




module.exports = model('task',taskSchema)