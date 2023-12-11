const crypto = require("crypto");
var axios = require("axios");

const newPayment = async (req, res) => {
  try {
    const merchantTransactionId = "M" + Date.now();
    const { user_id, price, phone, name } = req.body;
    const data = {
      merchantId: "PGTESTPAYUAT",
      merchantTransactionId: merchantTransactionId,
      merchantUserId: "MUID" + user_id,
      name: name,
      amount: price * 100,
      redirectUrl: "http://localhost:5000/api/phonepe/status",
      redirectMode: "POST",
      mobileNumber: phone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const payload = JSON.stringify(data);
    console.log("payload =>", payload);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string =
      payloadMain + "/pg/v1/pay" + "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;
    console.log("checksum=>", checksum);
    const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/pay";
    const options = {
      method: "POST",
      url: prod_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        //return res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
      })
      .catch(function (error) {
        console.log(error);
        res.send(error);
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  newPayment,
};
