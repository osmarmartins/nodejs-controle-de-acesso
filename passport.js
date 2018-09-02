var db = require('./db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username,password,done)=>{

  db("usuarios")
  .where("nome", username)
  .first()
  .then((user)=>{
    if(!user || user.senha !== password){
      console.log(user);
        return done(null, false);
    }

    done(null, user)

  }, done);
}));

passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser((id, done)=>{
  db("usuarios")
  .where("id", id)
  .first()
  .then((user)=>{
    done(null, user)
  },done);
})
