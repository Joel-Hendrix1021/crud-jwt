const {Router} = require('express');
const router = Router()

const {renderForm,renderTasks,deleteTask, addTask, editeFormTask, updateTask ,renderIndex} = require('../controllers/index.controllers')

router.get('/', renderIndex)

router.get('/add', renderForm)

router.get('/tasks', renderTasks)

router.get('/delete/:id',deleteTask)

router.post('/addTask', addTask)

router.get('/edite/:id', editeFormTask)

router.post('/edite/updateTask/:id', updateTask)

module.exports = router