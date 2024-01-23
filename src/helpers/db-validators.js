const Customers = require('../models/customer');
const bcryptjs = require('bcryptjs')

exports.searchCustomerByEmail = async (email, password) => {
    const customer = await Customers.findOne({where:{email: email}}, {
        attributes: ['name', 'surname', 'code', 'email', 'phone']
    });
    if(email != customer.dataValues.email && !bcryptjs.compareSync(password, customer.dataValues.password)) throw new Error('Email and password incorrect or not exist');

}