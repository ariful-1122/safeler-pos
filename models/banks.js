const mongoose=require('mongoose');

let bankScema=mongoose.Schema({
   name: {
      type: String,
      require: true
   },
   bankAccountNumber: {
      type: String,
      require: true
   },
   branchName: {
      type: String
   },
   accountHolder: {
      type: String
   },
   openingBalance:{
      type:Number,
      require:true,
      default:0
   },
   isSuspend:{
      type:Boolean,
      default:false
   },
   onSuspend:{
      type:Date
   },  
   status: {
      type: Boolean,
      default: true
   }
})

module.exports = Bank =mongoose.model('banks',bankScema);

