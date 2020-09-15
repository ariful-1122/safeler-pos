const express = require('express');
const router = express.Router();
const Vendor = require('../models/vendor');
const moment=require('moment')

// Get Route  Handle
// Get All Vendors
// Private

router.get('/', async (req, res) => {
   try {
      let allVendor = await Vendor.find().lean();
      res.json(allVendor)
   } catch (error) {
      res.send(error)
   }
})

// Get Specific Vendor
// Private

router.get('/:id', async (req, res) => {
   try {
      let specificVendor = await Vendor.findById(req.params.id);
      res.json(specificVendor)
   } catch (error) {
      res.send(error)
   }
})

// Post route Handle
// Add Vendor
// Private

router.post('/add', async (req, res) => {
   let {
      fName,
      lName,
      phone,
      email,
      currentAddress,
      billingAddress
   }=req.body;
   try {
      let addVendor = await new Vendor({
         fName,
         lName,
         phone,
         email,
         currentAddress,
         billingAddress
      }).save();
      res.redirect('/vendor-list')
   } catch (error) {
      res.send(error)
   }
})

// Update Vendor
// private

router.post('/edit/:id', async (req, res) => {
   let {fName,lName,phone,email,currentAddress,billingAddress}=req.body;
   try {
      let updateVendor = await Vendor.findByIdAndUpdate({
         _id:req.params.id
      }, {
         fName,
         lName,
         phone,
         email,
         currentAddress,
         billingAddress
      })
      res.redirect('/vendor-list')
   } catch (error) {
      res.send(error)
   }
})

// Suspend Vendor
// Private

router.get('/suspend/:id',async(req,res)=>{
      try {
         await Vendor.findByIdAndUpdate({_id:req.params.id},{
            isSuspend:true
         })
         res.redirect('/vendor-list')
      } catch (error) {
         res.send(error)
      }

})
router.get('/suspend/undo/:id', async (req, res) => {
   try {
      await Vendor.findByIdAndUpdate({
         _id: req.params.id
      }, {
         isSuspend: false
      })
      res.redirect('/vendor-list')
   } catch (error) {
      res.send(error)
   }

})


module.exports=router;



