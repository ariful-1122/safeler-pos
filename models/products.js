const mongoose=require('mongoose');

let productScema=mongoose.Schema({
   name: {
      type: String,
      require: true
   },
    catid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories',
        required:true
    },
   status: {
      type: Boolean,
      default:true
   },
   onSuspend:{
      type:Boolean,
   },
   isActive:{
      type:Boolean,
      default:true
   }
})

module.exports = Product = mongoose.model('products',productScema);
