const mongoose = require('mongoose');
const moment = require('moment')
const SalesInvoiceSchema = mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    subtotal: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    invoice_date: {
        type: Date,
        default: moment.now()
    },
    paidAmount: {
        type: Number,
        default: 0
    },
    dueAmount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    desc: {
        type: String,
        default: ""
    }
})
module.exports = SalesInvoice = mongoose.model('sales_invoice', SalesInvoiceSchema)