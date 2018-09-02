var express = require('express');
var router = express.Router();
var passport = require('passport');
var isNotAuth = require('../middlewares/authorize').isNotAuth;
var db = require('../db');
var bcrypt = require('bcrypt');

router.get('/login', isNotAuth, (req ,res ,next)=>{
  res.render('login');
});


router.post('/login', passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/error',

}));

router.get('/logout', (req, res, next)=> {
  req.session.destroy();
  res.redirect('/')
});

router.get('/register', isNotAuth, (req ,res ,next)=>{
  res.render('add', {
    isAuth: req.isAuthenticated(),
    action: '/register'
  });
});

router.post('/register', isNotAuth, (req,res,next)=>{

  // TODO chamar método post do route /add

  if (req.body.senha !== req.body.confirmaSenha){
    res.render('error', {
      error: 'Senhas não conferem!'
    });
    return;
  }

  req.body.senha = bcrypt.hashSync(req.body.senha, 10);
  delete req.body.confirmaSenha;

  db("login_usuario").insert(req.body).then((ids) => {
    res.redirect('/');
  },next)

});

module.exports = router;
