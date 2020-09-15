const mongoose = require('mongoose');
const moment = require('moment')
const salesInvoiceHistorySchema = mongoose.Schema({
    salesInvoiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sales_invoice"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    qty: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    unitTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'unit_type'
    },
    current_date: {
        type: Date,
        default: moment.now()
    }
})
module.exports = SalesInvoiceHistory = mongoose.model('sales_invoice_history', salesInvoiceHistorySchema)