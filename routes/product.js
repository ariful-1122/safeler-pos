const express = require('express')
const router = express.Router()
const Category = require('../models/categories')
const Products = require("../models/products")
const {
   findById
} = require('../models/categories')

// Category Area
//@ get all Categories
// Public

router.get('/cat', async (req, res) => {
   try {
      let categories = await Category.find().lean()
      res.json(categories)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Private 
router.post('/cat/add', async (req, res) => {
   let {
      catName
   } = req.body
   try {
      if (catName == '') {
         res.redirect('/product-category')
      } else {
         let category = await new Category({
            catName
         }).save()
         // res.json(category)
         res.redirect('/product-category')
      }
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

//@ Private 
//@ find category By ID

router.get('/cat/:id', async (req, res) => {
   try {
      // let singleCategory=await Category.findById(req.params.id);

      // res.json(singleCategory)
      await Category.findByIdAndDelete(req.params.id)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Private
// Update Category
router.post('/cat/update/:id', async (req, res) => {
   try {
      let updateCategory = await Category.findByIdAndUpdate({
         _id: req.params.id
      }, {
         catName: req.body.catName
      })
      res.redirect('/product-category')
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

// Suspend Category

router.get('/cat/del/:id', async (req, res) => {
   try {
      let updateCategory = await Category.findByIdAndUpdate({
         _id: req.params.id
      }, {
         isSuspend: true
      })
      res.redirect('/product-category')
   } catch (error) {
      res.send(error)
   }
})

// undo suspend category

router.get('/cat/del/undo/:id', async (req, res) => {
   try {
      let updateCategory = await Category.findByIdAndUpdate({
         _id: req.params.id
      }, {
         isSuspend: false
      })
      res.redirect('/product-category')
   } catch (error) {
      res.send(error)
   }
})


// ===================================================================================
// @ Product Area

//@ get all products
// Public

router.get('/', async (req, res) => {
   try {
      let showAllProduct = await Products.find()
         .populate("catid")
         .lean();

      res.json(showAllProduct)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

//@ add product 
// Private

router.post('/', async (req, res) => {
   let {
      name,
      catid
   } = req.body;
   try {
      let product = await new Products({
         name,
         catid
      }).save();
      res.redirect('/product-list')
   } catch (error) {
      res.send(error)
   }
})

//@ Find By Id product 
// Private
router.get('/:id', async (req, res) => {
   try {
      let product = await Products.findById(req.params.id).populate("categories").lean();
      res.json(product)
   } catch (error) {
      res.statusCode(500).send(error)
   }
})

//@ Get Product By Id
// Private
router.post('/update/:id', async (req, res) => {
   let {
      name,
      catid
   } = req.body
   try {
      let product = await Products.findByIdAndUpdate({
         _id: req.params.id
      }, {
         name,
         catid
      })
      res.redirect('/product-list')
   } catch (error) {
      res.status(500).send(error)
   }
})



//@ Suspend Product
// Private
router.delete('/:id', async (req, res) => {
   try {
      await Products.findByIdAndUpdate({
         _id: req.params.id
      }, {
         isSuspend: true,
         onSuspend: moment.now()
      })
      res.json({
         msg: 'Data Deleted !'
      })
   } catch (error) {
      res.statusCode(500), send(error)
   }
})

module.exports = router