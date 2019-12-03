const express = require('express');

const router = express.Router();

const resolverController = require('../controller/resolver.controller')();
module.exports = ({
    logger,
    db,
}) => {
    router
        .route('/resolver')
        .post((req, res, next) => resolverController.resolver(req, res, next, {
            logger,
            db,
        }));

    return router;
};