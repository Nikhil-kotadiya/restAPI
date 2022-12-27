require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 5000;

const products_routes = require("./routes/products");

app.get("/", (req, res) => {
    res.send("Hi, i'm live....");
})

// Middleware or set router

app.use("/api/products", products_routes);



const start = async () => {
    try {
        await connectDB(process.env.MONGODBURL);
        app.listen(PORT, () => {
            console.log(`${PORT} is connected`);
        })

    } catch (error) {
        console.log(error);
    }
}
start();