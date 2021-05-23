const {Router} = require('express');
const router = Router();


const {renderRegister, login,renderSignin,logout,validateAuth} = require('../controllers/user.controllers')

router.get('/user/signup', renderRegister)

router.post('/user/login', login)

router.get('/user/signin', renderSignin)

router.post('/user/signin', validateAuth)

router.get('/user/logout', logout);


module.exports = router;