const passport = require('passport')
const ctrlUserRouter = {}

const User = require('../models/UserSchema')

ctrlUserRouter.renderRegister =(req, res)=>{  
    res.render('user/signup')
}

ctrlUserRouter.login = async (req, res)=>{
    const errors = []
    const {username, email , password, confirmPassword} = req.body
  
    if(password !== confirmPassword){
        errors.push({text: 'the passwords do not match'})     
    }
    if(password.length < 4){
        errors.push({text: 'passwords must be longer than 4 characters'})
    }

    if(errors.length>0){  
        res.render('user/signup',{errors, username, email})
    } else {
        const user = await User.findOne({email})
        console.log(user)
        if (user) {
            errors.push({text: 'user exist'})
            res.render('user/signup', {errors, username, email})  
        }else {
            const user = new User({username, email})
            user.password =await user.encryptPassword(password)
            user.save()
            res.render('user/signin')
        }
      
    }
}

ctrlUserRouter.renderSignin =(req, res)=>{ 
    res.render('user/signin')
}


ctrlUserRouter.logout =(req, res) => {
    req.logout();
    res.redirect('/user/signup');
}

ctrlUserRouter.validateAuth = passport.authenticate('login', { 
    successRedirect: '/tasks',
    failureRedirect: '/user/signin', 
    failureFlash: true
})

module.exports = ctrlUserRouter