 require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());


const connectToMongo = require('./utils/db');


const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 500 * 2024 * 1024 },
  })
);
app.use('/api/course',require('./routes/courseRoute'))
app.use('/api/enquiry',require('./routes/enquiryRoute'))

app.use("/api/user", require('./routes/Auth'));
app.use("/api",require("./routes/paymentRoute"))

app.listen(process.env.PORT,()=>{
   console.log("Server is connected with",process.env.PORT)
   connectToMongo();
})