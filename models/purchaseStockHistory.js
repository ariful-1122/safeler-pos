const mongoose=require('mongoose');
let purchaseStockHistorySchema=mongoose.Schema({
   invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PurchaseInvoice'
   },
   productId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'products'
   },
   quantity: {
      type: Number,
      require: true
   },
   price: {
      type: Number,
      require: true
   },
   totalPrice: {
      type: Number,
      require: true
   },
   unitType: {
      type: String,
      require: true
   },
   unitQuantity:{
      type:Number,
      require:true
   },
   currentDate:{
      type:Date,
      default:Date.now()
   },
   isSuspend: {
      type: Boolean,
      default: false
      },
      onSuspend: {
      type: Boolean,
      }
})


module.exports=PurchaseStockHistory=mongoose.model('PurchaseStockHistory',purchaseStockHistorySchema)
