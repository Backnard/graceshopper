const express = require('express');
const productsRouter = express.Router();
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../db');

productsRouter.use((req, res, next) => {
    console.log('A request is being made to /products');

    next();
});

productsRouter.get('/', async (req, res) => {
    const products = await getAllProducts();

    res.send({products});
});

productsRouter.patch('/:productId', async (req, res, next) => {
    const {productId} = req.params;
    const { title, description, price, inventory} = req.body;
    const updateFields = {};

    if (title) {
        updateFields.title = title;
    };

    if (description) {
        updateFields.description = description;
    };

    if (price) {
        updateFields.price = price;
    };

    if (inventory) {
        updateFields.inventory = inventory;
    };

    try {
        const originalProduct = await getProductById(productId);

        if(originalProduct) {
            const updatedProduct = await updateProduct(productId, updateFields);
            res.send({product: updatedProduct});
        } else {
            next({
                name: 'UpdateProductError',
                message: 'Error updating product'
            })
        }
    } catch({name, message}) {
        next({name, message})
    }
})

productsRouter.post('/', async (req, res, next) => {
    const {title, description, price, inventory} = req.body;

    const productData = { title, description, price, inventory };

    try {
        const product = await createProduct(productData);

        if(product) {
            res.send({product});
        } else {
            next({
                name: 'CreateProductError',
                message: 'Error creating product'
            })
        }

    } catch({name, message}) {
        next({name, message});
    }
})

productsRouter.delete('/:productId', async (req, res, next) => {
    try {
        const product = await deleteProduct(req.params.productId);

        if(routine) {
            res.send({product});
        }

    } catch(error) {
        console.error(error);
        throw error;
    }
})


module.exports = productsRouter;