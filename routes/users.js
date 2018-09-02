var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuth = require('../middlewares/authorize').isAuth;
var db = require('../db');
var bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
  db("login_usuario").then((usuario)=>{
    res.render('index',{
      usuarios: usuario,
      isAuth: req.isAuthenticated()
    });
  },next);

});

router.get('/add', isAuth, (req,res,next)=>{
  res.render('add',{
    isAuth: req.isAuthenticated(),
    action: '/add'
  });

});

router.post('/add', isAuth, (req,res,next)=>{
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

router.get('/edit/:id', isAuth, (req,res,next)=>{
  const {id} = req.params;

  db("login_usuario")
  .where("id_usuario", id)
  .first()
  .then((user) => {
    if (!user) {
      return res.send(400);
    }

    res.render("edit",{
      usuario: user, 
      _ativo: (user.ativo==1)?"checked":""
    });
  },next);

});

router.put('/edit/:id', isAuth, (req,res,next)=>{
  const {id} = req.params;

  req.body.ativo = (!req.body._ativo)?0:1;
  delete req.body._ativo;

  db("login_usuario")
  .where('id_usuario', id)
  .update(req.body)
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/');
  },next)
});

router.delete('/delete/:id', isAuth, (req,res,next)=>{
  const {id} = req.params;
  
  db("login_usuario")
  .where('id_usuario', id)
  .delete()
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/');
  },next)
});

router.get('/password/:id', isAuth, (req,res,next)=>{
  const {id} = req.params;

  db("login_usuario")
  .where("id_usuario", id)
  .first()
  .then((user) => {
    if (!user) {
      return res.send(400);
    }

    res.render("password",{
      usuario: user
    });
  },next);

});

router.put('/password/:id', isAuth, (req,res,next)=>{
  const {id} = req.params;

  if (req.body.senha !== req.body.confirmaSenha){
    res.render('error', {
      error: 'Senhas não conferem!'
    });
    return;
  }

  req.body.senha = bcrypt.hashSync(req.body.senha, 10);
  delete req.body.confirmaSenha;

  console.log(req.body);

  db("login_usuario")
  .where('id_usuario', id)
  .update(req.body)
  .then((result) => {
    if (result === 0) {
      res.render(error, {
        error: result
      });
    }
    // res.redirect('/edit/' + id);
    res.redirect('/');
  },next)
});


module.exports = router;
