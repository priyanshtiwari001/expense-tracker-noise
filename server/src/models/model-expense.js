const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expanseSchema = new Schema({
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },
    Description:{
            type:String,
            required:true
    }
})

const Expanse = mongoose.model('Expanse',expanseSchema);

module.exports = Expanse;