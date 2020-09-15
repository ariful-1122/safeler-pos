const express = require('express');
const router = express.Router();
const BankHis = require('../models/bankTransactionHistory');
const moment =require('moment')

// Get Routes Handle

// Get Bank Transaction History
// Private

router.get('/', async (req, res) => {
   try {
      let BankTransHis = await BankHis.find()
      .populate('bankId')
      .populate('customerId')
      .populate('vendorId')
      .lean();

      res.json(BankTransHis)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Get Specific Bank Transaction History
// Private

router.get('/:id', async (req, res) => {
   try {
      let specificHis = await BankHis
      .findById(req.params.id)
      .populate('bankId')
      .populate('customerId')
      .populate('vendorId');
      res.send(specificHis)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// ==========Post Routes Handle==========

// Add Transaction History
// Private

router.post('/add', async (req, res) => {
   let {
      bankId,
      transactionDate,
      In,
      Out,
      remarks,
      accHead,
      customerId,
      vendorId
   } = req.body;
   try {
      let addHistory = await new BankHis({
         bankId,
         transactionDate,
         In,
         Out,
         remarks,
         accHead,
         customerId,
         vendorId
      }).save()
      res.json(addHistory)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Update Transaction History
// Private

router.put('/:id', async (req, res) => {
   let {
      bankId,
      transactionDate,
      In,
      Out,
      remarks,
      accHead,
      customerId,
      vendorId
   } = req.body;
   try {
      let updateHis=await BankHis.findByIdAndUpdate({_id:req.params.id},{
         bankId,
         transactionDate,
         In,
         Out,
         remarks,
         accHead,
         customerId,
         vendorId
      })
      res.send(updateHis)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Suspend History
// private

router.delete('/:id',async(req,res)=>{
   try {
      await BankHis.findByIdAndUpdate({_id:req.params.id})
      res.json({msg:'history Deleted ! you can Undo it'})
   } catch (error) {
      res.statusCode(500).send(error)
   }
})



module.exports=router;