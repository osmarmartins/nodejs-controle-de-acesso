var db = require('./db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

passport.use(new LocalStrategy((username,password,done)=>{

  db("login_usuario")
  .where({
    login: username,
    ativo: 1
  })
  .first()
  .then((user)=>{

    if(!user || !bcrypt.compareSync(password, user.senha)){
        return done('NÃO AUTORIZADO! Credenciais inválidas ou usuário inativo');
        // return done(null, false);
    }

    done(null, user)

  }, done);
}));

passport.serializeUser((user, done)=>{

  console.log('serializando....');

  done(null, user.id_usuario);
});

passport.deserializeUser((id, done)=>{
  
  console.log('deserializando.....');
  
  db("login_usuario")
  .where("id_usuario", id)
  .first()
  .then((user)=>{
    done(null, user)
  },done);
})
