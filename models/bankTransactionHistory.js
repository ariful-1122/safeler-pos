const mongoose=require('mongoose')
const moment =require('moment')
let bankTransactionHistory=mongoose.Schema({
   bankId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'banks',
      required:true
   },
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
   isActive: {
      type: Boolean,
      default: true
   },
   remarks: {
      type: String,
   },
   accHead:{
      type:String,
      required:true
   },
   customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer"
   },
   vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors"
   },
   isSuspend:{
      type:Boolean,
      default:false
   },
   onSuspend:{
      type:Date
   }
})

module.exports= BankTransactionHistory=mongoose.model('BankTransactionHistory',bankTransactionHistory);

