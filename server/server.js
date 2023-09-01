const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const connectDB = require("./helpers/connectDB");
const cors = require("cors");

const api = require("./routers/index");


app.use(express.static('public'));


// listening
app.listen(process.env.PORT,(arg) => {
    connectDB.then(() => {
        console.log("server started Successfully");
    })
})


// default middlewares

app.use(cors());
app.use(express.json());

//router

app.use("/api" , api)

