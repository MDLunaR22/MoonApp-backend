const { Router } = require('express');
const { getCustomers, deleteAccount, getAccount, updateAccount } = require('../controllers/customer');
const { login, register } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/', [validateJWT] , getCustomers);
router.get('/view/account', [validateJWT], getAccount);
router.post('/login',login);
router.post('/register', register);
router.put('/updateAccount', [validateJWT], updateAccount);
router.delete('/deleteAccount',[ validateJWT ] , deleteAccount);

module.exports = router;