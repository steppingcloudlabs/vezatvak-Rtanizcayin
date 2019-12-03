const mongo = require('mongoose');
const config = require('./config');
const logger = require('./logger')();

const { env } = config;
let uri = '';

if (config.isMongoUri) {
    uri = config.mongo_uri;
} else if (env === 'production') {
    uri = `mongodb://${config.mongo_username}:${config.mongo_password}@${
    config.mongo_host
    }:${config.mongo_port}/${config.mongo_dbname}`;
} else {
    uri = `mongodb://${config.mongo_host}:${config.mongo_port}/${
    config.mongo_dbname
    }`;
}

mongo.connect(
    uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            throw new Error('Error connecting mongoose');
        } else {
            logger.info('Connection successfull');
        }
    },
);

module.exports = mongo;