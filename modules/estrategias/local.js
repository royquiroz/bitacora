var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    passport.use(new LocalStrategy(function(usuario, password, done) {
        Usuario.findOne({
            usuario: usuario
        }, function(err, usuario) {
            if (err) {
                return done(err);
            }

            if (!usuario) {
                return done(null, false, {
                    message: 'Usuario desconocido'
                });
            }

            if (!usuario.autentificar(password)) {
                return done(null, false, {
                    message: 'Password Incorrecto'
                });
            }

            return done(null, usuario);
        });
    }));
};
