const express = require('express');
const morgan = require ('morgan');
const helmet = require ('helmet');
const cors = require ('cors');
const app = express();
const port = process.env.PORT;

const routes = {
    customer: '/customer',
    package: '/package'
}

//Configuracion del servidor
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//Seteo de rutas
app.use(routes.customer, require('../routes/customer'));
app.use(routes.package, require('../routes/package'));

exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}