const { Router } = require('express');
const { getCustomers, createUser, updateUser, getCustomerById, deleteAccount } = require('../controllers/customer');
const { login } = require('../controllers/auth');
const router = Router();

router.get('/', getCustomers);
router.get('/:id', getCustomerById);
router.post('/login', login);
router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteAccount);

module.exports = router;