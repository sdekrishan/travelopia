const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
name:{
    type:String,
    required:true,
    minLength:3
},
email:{
    type:String,
    required:true
},
destination:{
    type:String,
    enum:["India","Africa","Europe"],
    required:true
},
totalTravellers:{
    type:Number,
    default:1
},
budget:{
    type:Number,
    default:100
}
},{timestamps:true});

const FormModel = mongoose.model("form",formSchema);


module.exports= {FormModel};