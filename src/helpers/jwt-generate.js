const Customers = require('../models/customer');
const jwt = require('jsonwebtoken');

exports.createToken = async( user )=>{
    try{
        let payload = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            code: user.code,
            email: user.email,
            iat: Math.floor(Date.now()/ 1000),
            exp: Math.floor(Date.now()/ 1000) + (60 * 120)
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        return token; 
    }catch(err){
        console.error(err);
        return err;
    }
}
