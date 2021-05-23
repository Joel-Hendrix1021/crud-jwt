const {Schema, model, SchemaType} = require('mongoose')

const taskSchema = new Schema({
    title: String,
    description: String,
    userId: { type: Schema.ObjectId, ref: "Autor" } ,
    date:{
        type:Date,
        default: Date.now(),
    } 
})

module.exports = model('task',taskSchema)