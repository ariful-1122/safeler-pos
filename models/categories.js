const mongoose=require('mongoose');

let categories=mongoose.Schema({
   catName: {
      type: String,
      require: true
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
      default:true
   }
})

module.exports = Categories = mongoose.model('categories',categories);
