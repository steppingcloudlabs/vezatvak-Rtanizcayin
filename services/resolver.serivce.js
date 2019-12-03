const Masters = require("../models/index")
const service = require('../models/servicesSchema')
module.exports = () => {
    /**
     *
     * @param {JSON} payload
     * @param {String} logger
     * @param {String} db
     */

    const resolver = (payload, logger) =>
        new Promise(async(resolve, reject) => {
            try {
                const { company_id } = payload
                const response = await Masters.findOne({ company_id }, { master_username: 1, master_password: 1, service_name: 1 }).populate('service_name')
                resolve(response)

            } catch (error) {
                reject(error);
                logger.error(
                    "Error while matching signin data with masterdata collection and adding to login collection"
                );
            }
        });

    return {
        resolver
    };
};