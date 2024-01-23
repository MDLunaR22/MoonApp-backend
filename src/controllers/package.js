const Package = require('../models/package');
const Customers = require('../models/customer');
const Status = require('../models/status');

Package.belongsTo(Status, {foreignKey:'state_id'})

exports.detailsPackage = async (req, res) => {
    const { id } = req.params;
    const detailPackage = await Package.findByPk(id, {
        include: Status
    });

    if(!detailPackage) return res.send({msg: 'Package not found'});
    return res.send(detailPackage);
}

exports.viewMyPackage = async (req, res) => {
    const { id } = req.user

    console.log(id);

    const myPackage = await Package.findAll({
        where: {
            customer_id: id
        }
    })

    if(!myPackage) return res.send({msg: 'Not found'})

    return res.send(myPackage)
}
