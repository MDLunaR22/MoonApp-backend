const shortid = require("shortid");
const { createToken } = require("../helpers/jwt-generate");
const customers = require("../models/customer")
const bcryptjs = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body
        if (email == '' || password == '') return res.status(400).send({ message: 'The passoword and email are required' })
        let customerCredentials = await customers.findOne({
            where: {
                email: email,
            }

        })
        if (!customerCredentials) return res.status(404).send({ message: 'Email not registred' })
        if (customerCredentials && await bcryptjs.compare(password, customerCredentials.dataValues.password)) {
            console.log('Password match!');
            let token = await createToken(customerCredentials)
            return res.send({ message: 'User logged succesfully', token })
        } else {
            console.log('Password mismatch or user not found');
            return res.status(404).send({ message: 'Invalid Credentials' });
        }
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creating accout', err })
    }
}

exports.register = async (req, res) => {
    try {
        const { name, surname, email, password, phone } = req.body;
        if (name == '' || surname == '' || email == '' || password == '' || phone == '') return res.status(400).send({ message: 'Credentials is required' })
        let existCredential = await customers.findOne({
            where: {
                email: email,
            }

        })
        if (existCredential) return res.status(400).send({ message: 'Email registred' })

        const code = shortid.generate().substring(0, 4);

        // Contraseña encriptada
        const salt = bcryptjs.genSaltSync();
        const passwordHash = bcryptjs.hashSync(password, salt);

        const newCustomer = await customers.create({ name, surname, code, email, password: passwordHash, phone });

        let token = await createToken(newCustomer);


        return res.json({
            msg: 'Create user',
            user: newCustomer,
            token
        })
    } catch(error){
        res.json({msg:'Error to register', error});
    }
}