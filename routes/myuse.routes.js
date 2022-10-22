module.exports = (app) => {
    const myuseController = require('../controllers/myuse.control');

    const router = require('express').Router();

    router.post('/protfolio-form', myuseController.addProtfolioForm);

    app.use('/api', router)
}