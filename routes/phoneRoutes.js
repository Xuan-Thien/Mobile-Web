const express = require('express');
const PhoneController = require('../controllers/PhoneController');
const router = express.Router();
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')

router.get('/', PhoneController.phone_index);

router.get('/products', PhoneController.phone_all);

router.get('/add-product', PhoneController.phone_create_get);

router.post('/add-product',upload.single('image'), PhoneController.phone_create_post);

router.get('/stored-phones', PhoneController.stored_phones);

router.get('/edit/:id', PhoneController.phone_edit);

router.post('/edit/:id',upload.single('image'), PhoneController.phone_update);

router.delete('/delete/:id', PhoneController.phone_delete);

router.get('/:id', PhoneController.phone_detail);

module.exports = router;