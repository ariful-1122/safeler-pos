const express = require('express')
const router  = express.Router();
const Customer = require('../models/customer')
const moment = require('moment');
const { findByIdAndUpdate } = require('../models/customer');
// @desc get all customer
// @sec  public
router.get('/', async(req, res) => {
    try {
        let allCustomer=await Customer.find().lean();
        res.json(allCustomer)
    } catch (error) {
        res.statusCode(500).send(error)
    }
})

// @find customer
// @sec  private
router.get('/:id', async (req, res) => {
    try {
        let customer = await Customer.findById(req.params.id);
        res.json(customer)
    } catch (error) {
        res.statusCode(500).send(error)
    }
})

// @desc add new customer
// @sec  private

router.post('/add', async(req, res) => {
    let {fname, lname,phone, email ,currentAddress, billingAddress }=req.body;
    try{
        let customer=await new Customer({
            fname,
            lname,
            phone,
            email,
            currentAddress,
            billingAddress
        }).save();
        res.redirect('/customer-list')
    }catch(error){
        res.send(error)
    }
})


// @desc update customer
// @sec  private

router.post('/edit/:id', async(req, res) => {
    let {fname, lname,phone, email ,currentAddress, billingAddress }=req.body;
    try{
        await Customer.findByIdAndUpdate({_id:req.params.id},{
            fname,
            lname,
            phone,
            email,
            currentAddress,
            billingAddress
        })
        res.redirect('/customer-list')
    }catch(error){
        res.send(error)
    }
})

// @desc suspend Customer customer
// @sec  private

router.get('/suspend/:id', async(req, res) => {
    try{
        await Customer.findByIdAndUpdate({_id:req.params.id},{
            isSuspend: true,
        })
        res.redirect('/customer-list')
    }catch(error){
        res,send(error)
    }
})
router.get('/suspend/undo/:id', async (req, res) => {
    try {
        await Customer.findByIdAndUpdate({
            _id: req.params.id
        }, {
            isSuspend: false,
        })
        res.redirect('/customer-list')
    } catch (error) {
        res.send(error)
    }
})




module.exports = router;