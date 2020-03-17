const admin = require('../../config/firebase');
const database = admin.firestore();
const ordersRef = database.collection('orders');

exports.createOrder = async ({ uid }, { product_id, quantity }) => {
    const data = await ordersRef.doc(uid).collection('orders').add({
        product_id, quantity, status: "pending"
    });

    return data;
};

exports.updateOrder = async ({ uid }, { id, firebaseId, status }) => {
    const data = await ordersRef.doc(uid).collection('orders').doc(firebaseId).update({
        status
    });

    return data;
};
