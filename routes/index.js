const express = require('express')
const router = express.Router()
const Cash = require('../models/cash');
const moment = require('moment')
const Category = require('../models/categories')
const Products=require("../models/products")
const Vendor=require('../models/vendor')
const Customer=require('../models/customer')


// main Route
router.get('/', (req, res) => {
    res.render('login',{layout:'login'})
})


router.get('/dashboard',(req,res)=>{
    res.render('index')
})
router.get('/setting', (req, res) => {
    res.render('setting/setting')
})

// Product category
router.get('/product-category', async(req, res) => {

    let categories = await Category.find().lean()
    res.render('product/category/list', {
        categories
    })
})
router.get('/product-category-add', (req, res) => {
    res.render('product/category/add')
})

router.get('/product-category-:id',async(req,res)=>{
    let category = await Category.findById(req.params.id).lean()
    res.render('product/category/edit',{
        category
    })
})

// =========Product Configaration==========
// list

router.get('/product-list',async(req,res)=>{
    let products=await Products.find().populate('catid').lean()
    res.render('product/list',{
        products
    })
})

// add product

router.get('/product-add',async(req,res)=>{
    let categories=await Category.find().lean()
    res.render('product/add',{
        categories
    })
})
  
// edit product

router.get('/product-edit-:id',async(req,res)=>{
    let product=await Products.findById(req.params.id).lean()
    let category=await Category.find().lean();
    let productCatId=product.catid.toString()
    category.forEach(item=>{
        let catId=item._id.toString();
        if(catId==productCatId){
            item.match=true
        }else{
            item.match=false
        }
    })
    res.render('product/edit',{
        product,
        category
    })
})

// ===========vendor area==========
// add
router.get('/vendor-add',(req,res)=>{
    res.render('vendor/add')
})


router.get('/vendor-list',async(req,res)=>{
    let vendor=await Vendor.find().lean()
    res.render('vendor/list',{
        vendor
    })
})

router.get('/vendor-edit-:id',async(req,res)=>{
    let vendorEdit=await Vendor.findById(req.params.id).lean()
    res.render('vendor/edit',{
        vendorEdit
    })
})


// =========Customer Area==========

router.get('/customer-add',(req,res)=>{
    res.render('customer/add')
})

router.get('/customer-list',async(req,res)=>{
    let customers=await Customer.find().lean()
    res.render('customer/list',{
        customers
    })
})

router.get('/customer-edit-:id',async(req,res)=>{
    let customer=await Customer.findById(req.params.id).lean();
    res.render('customer/edit',{
        customer
    })
})

// Bank

// Report

router.get('/invoice',async(req,res)=>{
    let customer =await Customer.find().lean();
    let product=await Products.find().lean();
    res.render('invoice/customer_invoice',{
        customer,
        product
    })
})


module.exports = router