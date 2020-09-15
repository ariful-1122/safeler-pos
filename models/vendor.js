const mongoose=require('mongoose');

let vendorSchema=mongoose.Schema({
   fName: {
      type: String,
      require: true
   },
   lName: {
      type: String,
      require: true
   },
   phone: {
      type: Number,
      require: true
   },
   phoneOtp:{
      type:Number
   },
   email: {
      type: String,
   },
   currentAddress:{
      type:String,
   },
   billingAddress:{
      type:String,
   },
   password: {
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
      default: true
   }

})

module.exports= Vendor =mongoose.model('vendors',vendorSchema)