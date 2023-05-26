const mongoose = require("mongoose")
const express = require("express");
require('dotenv').config()
const cors = require("cors");
const { formRouter } = require("./routes/formRoute");
const app = express();
mongoose.set('strictQuery', false);

app.use(express.json());
app.use(cors({ origin: true }));

app.use("/",formRouter)

const port = process.env.PORT || 5000

app.listen(port,()=>{
    mongoose.connect(
        process.env.MONGO_DB,
      )
      .then(()=>console.log(`server has been connected to ${port}`))
      .catch(e=>console.log(e));
})
