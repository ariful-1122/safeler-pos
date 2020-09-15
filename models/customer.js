const mongoose = require('mongoose');
const customerSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required:true
    },
    phoneOtp:{
        type: Number
    },
    email: {
        type: String
    },
    currentAddress: {
        type: String
    },
    billingAddress: {
        type: String
    },
    password: {
        type: String,
        default:""
    },
    isSuspend:{
        type:Boolean,
        default:false
    },
    onSuspend:{
        type:Date
    },
    status: {
        type: Boolean,
        default: true
    }

})
module.exports = Customer = mongoose.model('customer', customerSchema)