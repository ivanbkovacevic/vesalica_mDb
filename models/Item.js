const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Create Schema
const ItemSchema= new Schema({
    city:{
        type:String,
        required:true
    },
    country:{
        type:String
    },
    continent:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
});

module.exports = Item = mongoose.model('item',ItemSchema);