const express = require('express');
const router = express.Router();
const SalesHis = require('../models/salesHistory');
const moment = require('moment')

// Get Routes
// Get All History
// private

router.get('/', async (req, res) => {
   try {
      let allHis = await SalesHis.find().populate('sales_invoice', 'products');
      res.json(allHis)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Get Specific History
// private

router.get('/:id', async (req, res) => {
   try {
      let specificHis = await SalesHis.findById(req.params.id)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})


// ========Post Routes Handle=========
// Add Sales History
// Private

router.post('/', async (req, res) => {
   let {
      salesInvoiceId,productId,qty,price,totalPrice,unitTypeId
   }=req.body;
   try {
      let addSalesHis = await new SalesHis({
         salesInvoiceId, productId, qty, price, totalPrice, unitTypeId
      })
      res.json({
         msg: 'Sales History Added'
      })
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Update Sales History
// Private

router.put('/:id', async (req, res) => {
   let {
      salesInvoiceId, productId, qty, price, totalPrice, unitTypeId
   }=req.body;
   try {
      let updateHis = await SalesHis.findByIdAndUpdate({
         _id: req.params.id
      }, {
         salesInvoiceId, productId, qty, price, totalPrice, unitTypeId
      })
      res.json({
         msg: 'Sales Hidtory Updated!'
      })
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Suspend Purchase Stock History
// Private

router.delete('/:Id', async (req, res) => {
   await SalesHis.findByIdAndUpdate({
      id: req.params.id
   }, {
      isSuspend: true,
      onSuspend: moment.now()
   })
   res.json({
      msg: 'Sales History Suspended!'
   })
})



module.exports = router;