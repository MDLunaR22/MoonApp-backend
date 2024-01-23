const { Router } = require('express');
const { detailsPackage, viewMyPackage } = require('../controllers/package');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/myPackage', [ validateJWT ], viewMyPackage)
router.get('/:id', detailsPackage);

module.exports = router