const express = require('express');
const { admin, auth } = require('../../middleware/auth');
const AdminController = require('../../controllers/AdminController');
const ProductController = require('../../controllers/ProductController');
const CustomerController = require('../../controllers/CustomerController');
const OrderController = require('../../controllers/OrderController');

const router = express.Router();

// Admin
router.post('/admin/create', AdminController.createAdmin);

// Products
router.get('/products', auth, ProductController.getAllProducts);
router.get('/products/:id', auth, ProductController.getAllProductDetail);
router.post('/products/create', admin, ProductController.createProduct);

// Customers
router.get('/customers/detail', auth, CustomerController.getCustomer);
router.post('/customers/create', CustomerController.createCustomer);
router.post('/customers/update', auth, CustomerController.updateCustomer);

// Orders
router.post('/orders/create', auth, OrderController.createOrder);
router.post('/orders/update', auth, OrderController.updateOrder);

module.exports = router;
