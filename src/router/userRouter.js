const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs')

const User = require('../models/UserSchema')

router.get('/user/signup', (req, res)=>{  
    res.render('signup')
})

router.post('/user/login', async (req, res)=>{
    const errors = []
    const {username, email , password, confirmPassword} = req.body
  
    if(password !== confirmPassword){
        errors.push({text: 'las contrasenas no coinciden'})     
    }
    if(password.length < 4){
        errors.push({text: 'la contrasena debe ser mayor a 4 caracteres'})
    }

    if(errors.length>0){  
        res.render('signup',{errors, username, email})
    }
    const user = new User({username, email})
    user.password =await user.encryptPassword(password)
    console.log(user)
   
    res.send('login')
})

module.exports = router;