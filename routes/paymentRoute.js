const router = require('express').Router();
const crypto = require("crypto");
const Razorpay = require('razorpay');
const dotenv = require("dotenv");
const Payment = require("../model/payment")
dotenv.config();
const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// checkout api
router.post("/checkout",async(req,res)=>{

  const options ={
      amount:Number(req.body.amount*100),
      currency:"INR",
  };
  const order = await instance.orders.create(options);
  console.log(order);
  res.status(200).json({
      success:true,order
  })

})

// payemnt verification
router.post("/paymentverification",async(req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
    const body = razorpay_order_id + "|" +razorpay_payment_id;
    const expectedsgnature =crypto.createHmac('sha256',process.env.SECRET).update(body.toString()).digest('hex')
    const isauth = expectedsgnature === razorpay_signature;
    if(isauth){
     await Payment.create({
         razorpay_order_id,razorpay_payment_id,razorpay_signature 
     })
     res.redirect(`http://localhost:5000/paymentsuccess?reference=${razorpay_payment_id}`)
    }
    else{
     res.status(400).json({success:false});
    }
 })
 
 router.get("/getkey",(req,res)=>{
     return res.status(200).json({key:process.env.KEY_ID})
 })


module.exports = router;