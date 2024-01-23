const Customers = require('../models/customer');
const jwt = require('jsonwebtoken');

exports.createToken = async( user )=>{
    try{
        let payload = {
            sub: user.id,
            name: user.name,
            surname: user.surname,
            code: user.code,
            email: user.email,
            iat: Math.floor(Date.now()/ 1000),
            exp: Math.floor(Date.now()/ 1000) + (60 * 120)
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        console.log(token);
        return token; 
    }catch(err){
        console.error(err);
        return err;
    }
}

exports.authToken = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({message: `Doesn´t contain headers "Authorization"`});
    }else{
        try{
            let token = req.headers.authorization.replace(/['"]+/g, '');
            var payload = jwt.decode(token, `${process.env.SECRET_KEY}`);
            if(Math.floor(Date.now() / 1000) >= payload.exp){
                return res.status(401).send({message: 'Expired token'});
            }
        }catch(err){
            console.error(err);
            return res.status(400).send({message: 'Invalid Token'});
        }
        req.user = payload;
        next();
    }
}
