const express = require('express');
const router = express.Router();
const PurStockHis = require('../models/purchaseStockHistory');
const moment = require('moment')

// Get Routes
// Get All History
// private

router.get('/', async (req, res) => {
   try {
      let allHis = await PurStockHis.find().populate('PurchaseInvoice');
      res.json(allHis)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Get Specific History
// private

router.get('/:id', async (req, res) => {
   try {
      let specificHis = await PurStockHis.findById(req.params.id)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})


// ========Post Routes Handle=========
// Add Purchase Stock History
// Private

router.post('/', async (req, res) => {
   let {
      invoiceId,
      productId,
      quantity,
      price,
      totalPrice,
      unitType,
      unitQuantity,
      currentDate
   }=req.body;
   try {
      let addStockHis = await new PurStockHis({
         invoiceId,
         productId,
         quantity,
         price,
         totalPrice,
         unitType,
         unitQuantity,
         currentDate
      })
      res.json({msg:'Purchase History Added'})
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Update Purchase Stock History
// Private

router.put('/:id',async(req,res)=>{
   let {
      invoiceId,
      productId,
      quantity,
      price,
      totalPrice,
      unitType,
      unitQuantity,
      currentDate
   }=req.body;
   try {
      let updateHis=await PurStockHis.findByIdAndUpdate({_id:req.params.id},{
         invoiceId,
         productId,
         quantity,
         price,
         totalPrice,
         unitType,
         unitQuantity,
         currentDate
      })
      res.json({msg:'Stock History Updated!'})
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Suspend Purchase Stock History
// Private

router.delete('/:Id', async (req, res) => {
   await PurStockHis.findByIdAndUpdate({
      id: req.params.id
   }, {
      isSuspend: true,
      onSuspend: moment.now()
   })
   res.json({
      msg: 'Stock History Suspended!'
   })
})



module.exports = router;