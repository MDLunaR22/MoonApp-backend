
const Customers = require('../models/customer');
const bcryptjs = require('bcryptjs');

exports.getCustomers = async (req, res) => {
    const customers = await Customers.findAll()
    res.status(200).json(customers);
}

exports.getAccount = async (req, res) =>{
    const { id } = req.user;
    const customer = await Customers.findByPk(id, {
        attributes: ['name', 'surname', 'code', 'email', 'phone']
    });


    return res.json({
        msg:'View user',    
        user: customer
    })
}

exports.getMyPackages = async (req, res) => {
    const { id } = req.user;
    
}

exports.updateAccount = async (req, res) =>{

    const {name, surname, email, password, phone} = req.body;
    const { id } = req.user

    // Contraseña encriptada
    const salt = bcryptjs.genSaltSync();
    const passwordHash = bcryptjs.hashSync(password, salt);
    
    const updateCustomer = await Customers.update({name, surname, email, password: passwordHash, phone}, 
        {where: {id: id }}
    )
    return res.json({
        msg:'Update user',
        user: updateCustomer
    })
}

exports.deleteAccount = async(req, res) => {
    try{
        let { id } = req.user
        let existCustomer = await Customers.findByPk(id)

        if(!existCustomer) return res.status(404).send({message: 'Account not found'})

        await existCustomer.destroy()
        return res.send({message: 'Account delete succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting yor account'})
    }
}
