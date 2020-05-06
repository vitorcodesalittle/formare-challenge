const router = require('express').Router();
const { createUserAction, getUsers } = require('../controllers/user');
/**
 * Simplesmente retorna todos os usuários
 */
router.get('/', getUsers);

/**
 * Cria um usuário
 * @apiParam { string } body.username
 * @apiResponse { string } data.user.userId
 */
router.post('/', createUserAction);

module.exports = Router;