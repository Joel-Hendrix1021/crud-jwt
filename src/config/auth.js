const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/UserSchema')

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
  
    const user = await User.findOne({email})

    if(!user){
        return done(null, false, {message: 'user not found'});
    }else {
        const match = await user.comparePassword(password, user.password)
       
        if(!match){
            console.log(match)
            return done(null, false, { message: 'incorret password'} );
        }else {
            return done(null, user)
        }
    } 
})),

passport.serializeUser((user, done)=>{
    done(null, user._id)
})
passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user)
    })
})