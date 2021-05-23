const passport = require('passport')


const verifyAuth = (req, res, next)=>{
   if(req.isAuthenticated()){
      console.log('autorizado')
      next()
   }else {
      req.flash('error_msg', 'not authorized')
      res.redirect('/user/signin')
   } 
}

module.exports = verifyAuth
