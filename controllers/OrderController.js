const { createOrder, updateOrder } = require('../queries/nodes/orders');
const { 
    createOrder: createOrderQ, 
    updateOrder: updateOrderQ
} = require('../queries/gql/orders');
const { getCustomerDetail } = require('../queries/gql/customers');

exports.createOrder = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        await createOrder({ uid: req.authId }, { product_id, quantity });

        const customer = await getCustomerDetail({ firebaseId: req.authId });

        const order = await createOrderQ({
            productId: product_id,
            customerId: customer.id,
            quantity,
            status: 'pending'
        });

        return res.send({
            success: true,
            order
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { id, firebaseId, status } = req.body;

        await updateOrder({ uid: req.authId }, { id, firebaseId, status });

        const order = await updateOrderQ({ id, status });

        return res.send({
            success: true,
            order
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
};
