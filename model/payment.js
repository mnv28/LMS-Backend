const mongoose = require('mongoose')
const paymentSchema = mongoose.Schema({
    // userID:  Schema.Types.ObjectId, ref: 'User',
    // standard: {
    //     type:String
    // },
    // status: {
    //     type: String
    // },
    // payment: {
    //     type: String
    // }
    razorpay_order_id:{
        type:String,
        required:true,
    },
    razorpay_payment_id:{
        type:String,
        required:true,
    },
    razorpay_signature:{
        type:String,
        required:true,
    }
},
{
    timestamps: true
  });

  module.exports = mongoose.model("Payment", paymentSchema);