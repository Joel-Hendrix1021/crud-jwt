const {Router} = require('express');
const router = Router()

const {renderForm,renderTasks,deleteTask, addTask, editeFormTask, updateTask ,renderIndex} = require('../controllers/tasks.controllers')
const verifyAuth  = require('../helpers/verifyAuth')

router.get('/', renderIndex)

router.get('/add', renderForm)

router.get('/tasks',verifyAuth, renderTasks)

router.get('/delete/:id',verifyAuth, deleteTask)

router.post('/addTask',verifyAuth, addTask)

router.get('/edite/:id',verifyAuth, editeFormTask)

router.post('/edite/updateTask/:id',verifyAuth, updateTask)

module.exports = router