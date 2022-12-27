require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");

const productJson = require("./product.json");

const start = async () => {
    try {
        await connectDB(process.env.MONGODBURL);
        await Product.deleteMany();
        await Product.create(productJson);
    } catch (error) {
        console.log(error);
    }
}
start();