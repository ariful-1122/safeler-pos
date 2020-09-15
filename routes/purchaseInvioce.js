const express = require('express');
const router = express.Router();
const PurchaseInvc = require('../models/purchaseInvoice');
const moment=require('moment')


// Get Routes
// Get Purchase Invoice
// private

router.get('/', async (req, res) => {
   try {
      let showInvc = await PurchaseInvc.find().populate('vendors', 'banks');
      res.json(showInvc)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Get Specific Invoice
// Private

router.get('/:id', async (req, res) => {
   try {
      specificInvc = await PurchaseInvc.findById(req.params.id)
      res.json(specificInvc)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})


// ======Post Route Handle======

// Add Purchase invoice
// private

router.post('/', async (req, res) => {
   let {
      invoiceNumber,
      vendorId,
      subTotal,
      discount,
      total,
      invoiceDate,
      paidAmount,
      dueAmount,
      remarks,
      cashPayment,
      bankPayment,
      isBankPayment,
      bankId
   }=req.body;
   try {
      let addInvoice=await new PurchaseInvc({
         invoiceNumber,
         vendorId,
         subTotal,
         discount,
         total,
         invoiceDate,
         paidAmount,
         dueAmount,
         remarks,
         cashPayment,
         bankPayment,
         isBankPayment,
         bankId
      }).save()
      res.json(addInvoice)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Update Purchase Invoice
// Private

router.put('/:id',async(req,res)=>{
   let {
      invoiceNumber,
      vendorId,
      subTotal,
      discount,
      total,
      invoiceDate,
      paidAmount,
      dueAmount,
      remarks,
      cashPayment,
      bankPayment,
      isBankPayment,
      bankId
   }=req.body
   try {
      let updateInvc=await PurchaseInvc.findByIdAndUpdate({_id:req.params.id},{
         invoiceNumber,
         vendorId,
         subTotal,
         discount,
         total,
         invoiceDate,
         paidAmount,
         dueAmount,
         remarks,
         cashPayment,
         bankPayment,
         isBankPayment,
         bankId
      })
      res.json({msg:'Invoice Updated'})
   } catch (error) {
      
   }
})

// Suspend Purchase Invoice
// Private

router.delete('/:id',async(req,res)=>{
   try {
      await PurchaseInvc.findOneAndUpdate({_id:req.params.id},{
         isSuspend:true,
         onSuspend:moment.now()
      })
      res.json({msg:'invoice Suspend'})
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

module.exports = router;