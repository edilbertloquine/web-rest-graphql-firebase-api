const { 
    createProduct,
    getAllProducts
} = require('../queries/gql/products');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await getAllProducts();

        return res.send({
            success: true,
            products
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const {
            sku,
            name,
            description,
            price,
            stock 
        } = req.body;

        const product = await createProduct({
            sku,
            name,
            description,
            price,
            stock 
        });

        console.log(product);

        return res.send({
            success: true,
            product
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
};