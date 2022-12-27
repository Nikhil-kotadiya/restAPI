const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const { company, name, sort, select } = req.query;
    let qobj = {};
    if (company) {
        qobj.company = company;
        // console.log(qobj.company);
    }
    if (name) {
        qobj.name = { $regex: name, $options: "i" };
        // console.log(qobj.name);
    }
    // console.log(qobj);

    let apidata = Product.find(qobj);

    if (sort) {
        //let sortFix = sort.replace(",", " ");
        let sortFix = sort.split(",").join(" ");
        apidata = apidata.sort(sortFix);
    }

    if (select) {
        let selectFix = select.split(",").join(" ");
        apidata = apidata.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page - 1) * limit;

    // page = 2;
    // limit = 3;
    // skip = 1 * 3 = 3

    apidata = apidata.skip(skip).limit(limit);


    const mydata = await Product.find(req.query);
    res.status(200).json({ mydata });

}
const getAllProductsTest = async (req, res) => {

    const mydata = await Product.find(req.query).select("name company");
    console.log(":::::", req.query);
    res.status(200).json({ mydata });
}

module.exports = { getAllProducts, getAllProductsTest }