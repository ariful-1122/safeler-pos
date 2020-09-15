const mongoose=require('mongoose');
let purchaseInvoiceSchema=mongoose.Schema({
   invoiceNumber: {
      type: Number,
      require: true
   },
   vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors"
   },
   subTotal: {
      type: Number,
      require: true
   },
   discount: {
      type: Number,
      require: true
   },
   total: {
      type: Number,
      require: true
   },
   invoiceDate: {
      type: Date,
      default:Date.now()
   },
   paidAmount: {
      type: Number,
      require: true
   },
   dueAmount: {
      type: Number,
      require: true
   },
   isActive:{
      type:Boolean,
      default:true
   },
   remarks: {
      type: String,
   },
   cashPayment: {
      type: Number,
      require: true
   },
   bankPayment:{
      type:Number,
      require:true
   },
   isBankPayment: {
      type: Boolean,
   },
   bankId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "banks"
   },
   isSuspend:{
      type:Boolean,
      default:false
   },
   onSuspend:{
      type:Date
   }
})

module.exports=PurchaseInvoice=mongoose.model('PurchaseInvoice',purchaseInvoiceSchema);

