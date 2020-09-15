const express = require('express')
const router = express.Router()
const Cash = require('../models/cash');
const moment = require('moment')

// Get Routes
// Get Cash Information

router.get('/', async (req, res) => {
   try {
      let cashInfo = await Cash
      .find()
      .populate('customerId')
      .populate('vendorId')
      .lean();
      res.json(cashInfo)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Get Specific Cash Information
// private

router.get('/:id', async (req, res) => {
   try {
      let specificCashInfo = await Cash.findById(req.params.id);
      res.json(specificCashInfo)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Post Routes Handle
// Add Cash Info
// Sec Private

router.post('/add', async (req, res) => {
   let {
      transactionDate,
      In,
      Out,
      customerId,
      vendorId,
      remarks,
      description
   } = req.body
   try {
      let addCash = await new Cash({
         transactionDate,
         In,
         Out,
         customerId,
         vendorId,
         remarks,
         description
      }).save()
      res.json(addCash)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Update Cash Information
// Private

router.put('/:id', async (req, res) => {
   let {
      transactionDate,
      In,
      Out,
      customerId,
      vendorId,
      remarks,
      description
   } = req.body
   try {
      let updateCashInfo = await Cash.findByIdAndUpdate({
         _id: req.params.id
      }, {
         transactionDate,
         In,
         Out,
         customerId,
         vendorId,
         remarks,
         description
      })
      res.json(updateCashInfo)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Suspend Cash
// private

router.delete('/:Id', async (req, res) => {
   await Cash.findByIdAndUpdate({
      id: req.params.id
   }, {
      isSuspend: true,
      onSuspend: moment.now()
   })
   res.json({
      msg: 'data deleted!'
   })
})

module.exports = router