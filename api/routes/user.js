const router = require('express').Router();
const { createUserAction, getUsersAction } = require('../controllers/user');
/**
 * Simplesmente retorna todos os usuários
 */
router.get('/', getUsersAction);

/**
 * Cria um usuário
 * @apiParam { string } body.username
 * @apiResponse { string } data.user.userId
 */
router.post('/', createUserAction);

module.exports = router;