const express = require('express');
const router = express.Router();
const SalesInvc=require('../models/salesInvoice')
const moment = require('moment')


// Get Routes
// Get Sales Invoice
// private

router.get('/', async (req, res) => {
   try {
      let allSalesInvc = await SalesInvc.find().populate('vendors', 'banks');
      res.json(allSalesInvc)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Get Specific Invoice
// Private

router.get('/:id', async (req, res) => {
   try {
      specificInvc = await SalesInvc.findById(req.params.id)
      res.json(specificInvc)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})


// ======Post Route Handle======

// Add Sales invoice
// private

router.post('/', async (req, res) => {
   let {
      invoiceNumber,
      customerId,
      subtotal,
      duscount,
      total,
      paidAmount,
      dueAmount,
      decs
   }=req.body;
   try {
      let addInvoice = await new SalesInvc({
         invoiceNumber,
         customerId,
         subtotal,
         duscount,
         total,
         paidAmount,
         dueAmount
      }).save()
      res.json(addInvoice)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Update Purchase Invoice
// Private

router.put('/:id', async (req, res) => {
   let {
      invoiceNumber,
      customerId,
      subtotal,
      duscount,
      total,
      paidAmount,
      dueAmount
   } = req.body;
   try {
      let updateInvc = await SalesInvc.findByIdAndUpdate({
         _id: req.params.id
      }, {
         invoiceNumber,
         customerId,
         subtotal,
         duscount,
         total,
         paidAmount,
         dueAmount,
         decs
      })
      res.json({
         msg: 'Invoice Updated'
      })
   } catch (error) {

   }
})

// Suspend Sales Invoice
// Private

router.delete('/:id', async (req, res) => {
   try {
      await SalesInvc.findOneAndUpdate({
         _id: req.params.id
      }, {
         isSuspend: true,
         onSuspend: moment.now()
      })
      res.json({
         msg: 'Sales Invoice Suspend!'
      })
   } catch (error) {
      res.statusCode(500).send(error)
   }
})


module.exports = router;