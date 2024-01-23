const shortid = require('shortid');
const Customers = require('../models/customer');
const bcryptjs = require('bcryptjs');

const searchCustomerById = async (id) => {
    const customer = await Customers.findByPk(id, {
        attributes: ['name', 'surname', 'code', 'email', 'phone']
    });
    return customer;
}

exports.getCustomers = async (req, res) => {
    const customers = await Customers.findAll()
    res.status(200).json(customers);
}

exports.getYourInfo = async(req, res) => {
    try{
        let { id } = req.params
        console.log(req.customers);
        let customerExist = await Customers.findOne({
            where:{
                id: id
            },
            attributes: {
                exclude: ['password', 'id']

            }
        })
        if(!customerExist) return res.status(404).send({message: 'Customer not found'})
        return res.send(customerExist)
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting your info', err})
    }
}

exports.getCustomerById = async (req, res) =>{
    const {id} = req.params;
    const customer = await searchCustomerById(id);
    res.json({
        msg:'View user',    
        user: customer
    })
}

exports.createUser = async (req, res) => {
    const {name, surname, email, password, phone} = req.body;
    const code = shortid.generate().substring(0, 4);

    // Contraseña encriptada
    const salt = bcryptjs.genSaltSync();
    const passwordHash = bcryptjs.hashSync(password, salt);
    
    const newCustomer = await Customers.create({name, surname, code, email, password: passwordHash, phone});
    res.json({
        msg:'Create user',
        user: newCustomer
    })
}

exports.updateUser = async (req, res) =>{
    const {id} = req.params;
    const {name, surname, email, password, phone} = req.body;

    // Contraseña encriptada
    const salt = bcryptjs.genSaltSync();
    const passwordHash = bcryptjs.hashSync(password, salt);
    
    const updateCustomer = await Customers.update({name, surname, email, password: passwordHash, phone}, 
        {where: {id: id}}
        )
    res.json({
        msg:'Update user',
        user: updateCustomer
    })
}

exports.deleteAccount = async(req, res) => {
    try{
        let customerId = req.user.sub
        let existCustomer = await Customers.findByPk(customerId)
        if(!existCustomer) return res.status(404).send({message: 'Account not found'})
        let hasPackage = await Packages.findAll({
            where: {
                customer_id: customerId
            }
        })
        if(hasPackage.length != 0) return res.status(400).send({message: 'You cannot delete your account because you have a pending package'})
        await existCustomer.destroy()
        return res.send({message: 'Account delete succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting yor account'})
    }
}


