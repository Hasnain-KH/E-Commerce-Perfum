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


    if (price <= 0) {
        return res.status(400).send({ status: 400, message: "price must be greater than 0" })
    }


    if (stock < 0) {
        return res.status(400).send({ status: 400, message: "Stock Can't be negative" })
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



// PUt Used

myrouter.put('/products/:id', (req, res) => {

    const { name, price, category, image, stock, description } = req.body;
    const userID = Number(req.params.id);
    const Productposition = products.findIndex((products) => products.id === userID);

    if (Productposition === -1) {
        return res.status(404).send({ status: 404, message: "Product not Found" })
    }

    if (!name || !price || !category || !image || !stock || !description) {
        return res.status(400).send({
            status: 400,
            message: "All Products Fields are Required"
        })
    }
    if (typeof name !== "string" || typeof price !== "number" || typeof category !== "string" || typeof image !== "string" || typeof stock !== "number" || typeof description !== "string") {
        return res.status(400).send({ status: 400, Message: "Invalid Product Data Type!" })
    }
    if (price <= 0) {
        return res.status(400).send({
            status: 400,
            message: "Price Must be greater than 0"
        })
    }
    if (stock < 0) {
        return res.status(400).send({
            status: 400,
            message: "Stock Can not be In Negative"
        })
    }

    products[Productposition] = {
        ...req.body,
        id: userID,
    }


    res.status(200).send({
        status: 200,
        data: products,
        message: "Product Updated Successfylly!"
    })

})


// myrouter.patch('/products/:id', (req, res) => {

//     const { name, price, category, image, stock, description } = req.body;

//     const ProductID = Number(req.params.id);

//     let selecteProduct = products.find((pro) => ProductID === pro.id);


//     if (!selecteProduct) {
//         return res.status(404).send({
//             status: 404,
//             message: "Product Not Found!"
//         })
//     }

//     if (name) {
//         selecteProduct.name = name;
//     }

//     if (price <= 0) {
//         res.status(400).send({
//             status: 400,
//             message: "Price Must Be Greater than 0"
//         })
//     }

//     if (price) {
//         selecteProduct.price = price;
//     }
//     if (category) {
//         selecteProduct.category = category;
//     }
//     if (image) {
//         selecteProduct.image = image;
//     }

//     if (stock < 0) {
//         res.status(400).send({
//             status: 400,
//             message: "Stock Can't be 0"
//         })
//     }

//     if (stock) {
//         products[selecteProduct] = stock;
//     }
//     if (description) {
//         products[selecteProduct] = description;
//     }


//     res.status(200).send({
//         status: 200,
//         message: "User Partially Updated Successfully!",
//         data: products
//     })


// })



myrouter.patch('/products/:id', (req, res) => {
    const ProductID = Number(req.params.id);

    const selecteProduct = products.find(
        (pro) => pro.id === ProductID
    );

    if (!selecteProduct) {
        return res.status(404).send({
            status: 404,
            message: "Product Not Found!"
        });
    }

    const allowedFields = [
        "name",
        "price",
        "category",
        "image",
        "stock",
        "description"
    ];

    const updates = Object.keys(req.body);

    if (updates.length === 0) {
        return res.status(400).send({
            status: 400,
            message: "At least one field is required"
        });
    }

    const invalidField = updates.find(
        (field) => !allowedFields.includes(field)
    );

    if (invalidField) {
        return res.status(400).send({
            status: 400,
            message: `Invalid field: ${invalidField}`
        });
    }

    const { name, price, category, image, stock, description } = req.body;

    if (name !== undefined && typeof name !== "string") {
        return res.status(400).send({
            status: 400,
            message: "Name must be a string"
        });
    }

    if (price !== undefined &&
        (typeof price !== "number" || price <= 0)) {
        return res.status(400).send({
            status: 400,
            message: "Price must be a number greater than 0"
        });
    }

    if (category !== undefined && typeof category !== "string") {
        return res.status(400).send({
            status: 400,
            message: "Category must be a string"
        });
    }

    if (image !== undefined && typeof image !== "string") {
        return res.status(400).send({
            status: 400,
            message: "Image must be a string"
        });
    }

    if (stock !== undefined &&
        (typeof stock !== "number" || stock < 0)) {
        return res.status(400).send({
            status: 400,
            message: "Stock must be a number and cannot be negative"
        });
    }

    if (description !== undefined &&
        typeof description !== "string") {
        return res.status(400).send({
            status: 400,
            message: "Description must be a string"
        });
    }

    if (name !== undefined) selecteProduct.name = name;
    if (price !== undefined) selecteProduct.price = price;
    if (category !== undefined) selecteProduct.category = category;
    if (image !== undefined) selecteProduct.image = image;
    if (stock !== undefined) selecteProduct.stock = stock;
    if (description !== undefined) selecteProduct.description = description;

    return res.status(200).send({
        status: 200,
        message: "Product Partially Updated Successfully!",
        data: selecteProduct
    });
});



export default myrouter;