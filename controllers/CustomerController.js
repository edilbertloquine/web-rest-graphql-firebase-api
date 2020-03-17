const admin = require('../config/firebase');
const { getCustomerDetail, createCustomer, updateCustomer } = require('../queries/gql/customers');
const auth = admin.auth();

exports.getCustomer = async (req, res) => {
    try {
        const customer = await getCustomerDetail({ firebaseId: req.authId });

        return res.send({
            success: true, 
            customer
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

exports.createCustomer = async (req, res) => {
    try {
        const { 
            email,
            password, 
            display_name: displayName, 
            phone_number: phoneNumber 
        } = req.body;

        const customer = await auth.createUser({
            email, 
            password, 
            displayName, 
            phoneNumber
        });

        await createCustomer({
            firebaseId: customer.uid,
            displayName,
            phoneNumber
        });

        return res.send({
            success: true, 
            customer_id: customer.uid 
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error
        })
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const {
            firebase_id: firebaseId,
            password, 
            display_name: displayName, 
            phone_number: phoneNumber 
        } = req.body;

        const uid = firebaseId;

        const customer = await auth.updateUser(uid, {
            password, 
            displayName, 
            phoneNumber
        });


        const cust = await getCustomerDetail({ firebaseId });

        await updateCustomer({
            id: cust.id,
            displayName,
            phoneNumber
        });

        return res.send({
            success: true, 
            customer_id: customer.uid 
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error
        })
    }
};
