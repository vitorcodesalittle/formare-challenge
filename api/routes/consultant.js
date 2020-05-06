const router = require('express').Router();
const { createConsultantAction } = require('../controllers/consultant');

/**
 * Cria um consultant
 * @apiParam { string } body.username
 * @apiParam { string } body.password
 * @apiResponse { string } data.consultant._id
 */
router.post('/', createConsultantAction);
module.exports = Router;