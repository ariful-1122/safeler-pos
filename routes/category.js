const express=require('express');
const router=express.Router();
const Category=require('../models/categories');
const moment=require('moment')


// Get Routes
// Get All Categories
// Public

router.get('/',async(req,res)=>{
   try {
      let allCategory=await Category.find().lean();
      res.json(allCategory)
   } catch (error) {
     res.statusCode(500).send(error) 
   }
})

// Get Specific Category
// Public

router.get('/:id',async(req,res)=>{
   try {
      let specificCat=await Category.findById(req.params.id);
      res.json(specificCat)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Add Category
// private

router.post('/:id',async(req,res)=>{
   let {CategoryName}=req.body;
   try {
      let addCat=await new Category({
         catName:CategoryName
      }).save()
      res.json(addCat)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Update Category
// private

router.put('/:id',async(req,res)=>{
   let {categoryName}=req.body;
   try {
      let updateCat=await Category.findByIdAndUpdate({_id:req.params.id},{
         catName:categoryName
      })
      res.json(updateCat)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Suspend Category
// Private

router.delete('/:id',async(req,res)=>{
   try {
      await Category.findByIdAndUpdate({_id:req.params.id},{
         isSuspend:true,
         onSuspend:moment.now()
      })
   } catch (error) {
      
   }
})





module.exports=router;