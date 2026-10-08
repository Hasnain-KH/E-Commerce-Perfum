import express from "express";
const myrouter = express.Router();

const products = [
    {
        id: 1,
        name: "Royal Oud",
        price: 4500,
        category: "Men",
        image: "royal-oud.jpg",
        stock: 10,
        description: "A long-lasting woody fragrance for men."
    },
    {
        id: 2,
        name: "Rose Noir",
        price: 3800,
        category: "Women",
        image: "rose-noir.jpg",
        stock: 15,
        description: "A soft and elegant floral fragrance for women."
    },
    {
        id: 3,
        name: "Ocean Mist",
        price: 4200,
        category: "Unisex",
        image: "ocean-mist.jpg",
        stock: 8,
        description: "A fresh and refreshing fragrance suitable for everyone."
    }
];



myrouter.get('/products', (req, res) => {
    res.status(200).send({ status: 200, message: "data fecthed", data: [products] });
});


myrouter.get('/products/:id', (req, res) => {
    const productID = Number(req.params.id);
    const product = products.find((u) => u.id === productID);

    if (!product) {
        return res.status(404).send({
            status: 404,
            message: "Product is not Availible"
        })
    }

    res.status(200).send({
        status: 200,
        message: "Specific Product Fecthed Successfully!",
        data: product
    })
})



let nextproductId = 4;

myrouter.post('/products', (req, res) => {
    const { name, price, category, image, stock, description } = req.body;


    if (!name || !price || !category || !image || !stock || !description) {
        return res.status(400).send({
            status: 400,
            message: "All Products Fields are Required"
        })
    }


    if (
        typeof name !== "string" ||
        typeof price !== "number" ||
        typeof category !== "string" ||
        typeof image !== "string" ||
        typeof stock !== "number" ||
        typeof description !== "string"
    ) {
        return res.status(400).send({
            status: 400,
            message: "Invalid Product Data Type"
        })
    }

    const newproduct = {
        id: nextproductId++,
        ...req.body
    }
    products.push(newproduct);
    res.status(201).send({
        status: 201,
        message: "New Product added Successfully!",
        data: [newproduct]

    })

})


export default myrouter;