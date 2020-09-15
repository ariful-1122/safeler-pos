const mongoose=require('mongoose');

let userSchema=mongoose.Schema({
   name:{
      type:String,
      trim:true
   },
   username:{
      type:String,
      required:true
   },
   password:{
      type: String,
      required: true
   },
   status:{
      type:String,
      default:true
   }
})

module.exports=User=mongoose.model('users',userSchema)