/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const JsonValidator = require("jsonschema").Validator;
const validatator = new JsonValidator();

const resolverService = require("../services/resolver.serivce")();

module.exports = () => {
    /**
     *
     * @param {String} req
     * @param {String} res
     * @param {} next
     * @param {} param3
     */

    const resolver = async(req, res, next, { logger, db }) => {
        try {
            const payload = req.body;
            /**
             * Post body validation
             */

            //Creating a schema to test the post body against
            const resolverUserSchema = {
                id: "/resolverUserSchema",
                type: "object",
                properties: {
                    company_id: { type: "string" },
                },
                required: ["company_id"]
            };

            validatator.addSchema(resolverUserSchema, "/resolverUserSchema");
            const validatorResponse = validatator.validate(
                payload,
                "/resolverUserSchema"
            ).valid;

            if (validatorResponse) {
                const { master_username, master_password, service_name } = await resolverService.resolver(payload, logger, db);
                res.status(200).send({
                    status: "200",
                    result: {
                        master_username,
                        master_password,
                        service_name: service_name[0].service_name
                    }
                });
            } else {
                res.status(200).send({
                    status: "400",
                    result: "Not a valid JSON, checkout help for json schema ",
                    help: {
                        company_id: { type: "string" },
                        master_username: { type: "string" },
                        master_password: { type: "string" }
                    }
                });
            }
        } catch (error) {
            next(error);
            logger.error(`Error while creating user `);
        }
    };

    return {
        resolver
    };
};