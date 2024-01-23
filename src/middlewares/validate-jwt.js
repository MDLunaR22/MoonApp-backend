const jwt = require('jsonwebtoken');

const Customer = require('../models/customer');

exports.validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { id } = jwt.verify( token, process.env.SECRET_KEY );

        const customer = await Customer.findByPk( id );

        if ( !customer ) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en la base de datos'
            });
        }
        
        req.user = customer;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}