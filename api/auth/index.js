const express = require('express');
const passport = require('passport');
const controller = require('./user.controller');
const ensureAuthenticated = require('../../../middleware/auth');
const router = express.Router();

router.get('/auth/facebook',passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook',{ successRedirect:'/login_success',
    failureRedirect:'/login_fail'})
);

router.get('/auth/google', passport.authenticate('google',{scope:['https://www.googleapis.com/auth/plus.login']}));

router.get('/auth/google/callback',
  passport.authenticate('google',{ successRedirect:'/login_success',
    failureRedirect:'/login_fail'})
);

router.get('/login_success',ensureAuthenticated,controller.login_success);

router.get('/login_fail',controller.login_fail);
    
router.get('/logout',controller.logout);

module.exports = router;