require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const connectToMongo = () => {
    mongoose.connect(process.env.LOCAL_DATABASE)

    .then((data)=> 
        console.log(`connection established with ${data.connection.host}`))
        .catch((err) => {
            console.log(err.message);
            
        })
    } 
module.exports = connectToMongo
