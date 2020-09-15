const mongoose = require('mongoose');
const moment   = require('moment')
let cashSchema=mongoose.Schema({  
   transactionDate: {
      type: Date,
      default:moment.now()
   },
   In: {
      type: Number,
      require: true
   },
   Out: {
      type: Number,
      require: true
   },
   customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer"
   },
   vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors"
   },
   remarks: {
      type: String,
   },
   description: {
      type: String,
   },
   isSuspend:{
      type:Boolean,
      default:false
   },
   onSuspend:{
      type:Boolean
   }
})

module.exports=Cash=mongoose.model('Cash',cashSchema);
