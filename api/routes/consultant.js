const router = require('express').Router();
const { createConsultantAction, loginAction } = require('../controllers/consultant');

/**
 * Cria um consultant
 * @apiParam { string } body.username
 * @apiParam { string } body.password
 * @apiResponse { string } data.consultant._id
 */
router.post('/', createConsultantAction);

router.post('/login', loginAction);

module.exports = router;