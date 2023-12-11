const router = require('express').Router();
const { newPayment } = require('../controller/paymentController');
router.post("/payment",newPayment);
module.exports = router;