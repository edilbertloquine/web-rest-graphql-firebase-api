const admin = require('../../config/firebase');
const database = admin.firestore();
const dataRef = database.collection('data');

exports.createOrder = async ({ uid }, { product_id, quantity }) => {
    const data = await dataRef.doc('customer_orders').collection('orders').add({
        firebaseId: uid, product_id, quantity, status: "pending"
    });

    return data;
};

exports.updateOrder = async ({ uid }, { id, firebaseId, status }) => {
    const order = await dataRef.doc('customer_orders').collection('orders').where('firebase_id', '==', firebaseId).get();
    console.log(order);
    const update = order.update({
        status
    });

    return data;
};
