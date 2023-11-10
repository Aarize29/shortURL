const mongoose=require('mongoose');

const URL=new mongoose.Schema({
    detail:{
        type:String,
        
    },
    longURL:{
        type:String,
        required:true
    },
    shortURL:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('URL',URL);