const router = require('express').Router();
const { getMessagesAction, createMessageAction, deleteMessageAction } = require('../controllers/message');

/**
 * retorná as mensagens baseado na querystring (query). se nenhuma query for enviada, retorna todas as mensagens da mais nova para mais antiga
 * A query é um json em forma de string, que deve ser "parsed"
 * @apiParam { string } query.userId
 * @apiParam { date } query.beginDate
 * @apiParam { date } query.endDate
 * @apiParam { 'older' | 'newer' } query.first
 * @apiParam { number } query.skip
 * @apiParam { number } query.limit
 * @apiResponse { Message[] } data.messages
 */
router.get('/', getMessagesAction);

/**
 * cria uma mensagem
 * @apiParam { string } body.content 
 * @apiParam { string } body.userId
 * @apiParam { date } body.sendDate -- para caso eu decida usar a data de envio (quando usuário clickou em enviar) ao invés da data de inserção no db
 * @apiResponse { Message } data.message
 */
router.post('/', createMessageAction);

/**
 * deleta uma mensagem. deve verificar se é de um consultor.
 */
router.delete('/:message_id', deleteMessageAction)

module.exports = router;