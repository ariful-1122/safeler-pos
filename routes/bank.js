const express   = require('express')
const router    = express.Router()
const Bank      = require('../models/banks');
const moment    = require('moment')


// Get Routes
// Get Bank Information

router.get('/', async(req, res) => {
    try {
        let bankInfo=await Bank.find().lean();

        res.json(bankInfo)
    } catch (error) {
       res.statusCode(500).send(error) 
    }
})

// @info Get Specific Bank Information
// @sec private

router.get('/:id',async(req,res)=>{
    try {
        let bankInfo=await Bank.findById(req.params.id);
        res.json(bankInfo)
    } catch (error) {
      res.statusCode(500).send(error)  
    }
})

// Post Routes Handle
// Add Bank Info
// Sec Private

router.post('/add',async(req,res)=>{
    let {name,bankAccountNumber,branchName,accountHolder,openingBalance}=req.body
    try {

        let newBank = new Bank({
            name,
            bankAccountNumber,
            branchName,
            accountHolder,
            openingBalance
        })

        let  addBank= await newBank.save()
        res.json(addBank)
    } catch (error) {
        res.statusCode(500).send(error)
    }
})

// Update Bank Information
// Private

router.put('/:id',async(req,res)=>{
    let {
        name,
        bankAccountNumber,
        branchName,
        accountHolder,
        openingBalance
    } = req.body
    try {
        let updateBankInfo=await Bank.findByIdAndUpdate({_id:req.params.id},{
          name,
          bankAccountNumber,
          branchName,
          accountHolder,
          openingBalance
        })
        res.json(updateBankInfo)
    } catch (error) {
       res.statusCode(500).send(error) 
    }
})

// Suspend Bank
// private

router.delete('/:Id',async(req,res)=>{
    await Bank.findByIdAndUpdate({id:req.params.id},{
        isSuspend:true,
        onSuspend:moment.now()
    })
    res.json({msg:'data deleted!'})       
})

module.exports = router