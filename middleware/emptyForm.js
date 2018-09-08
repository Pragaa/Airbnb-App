
/****************************************************/
/* Middleware que verifica se os forms estão vazios */
/****************************************************/
module.exports = function(req,res, next){
    // Caso o form esteja preenchido a função next é executada e ele continua 
    var email = req.body.email;
    var pass = req.body.password;


    if (email !== "" && pass !== "") {
      return next();
    }

    req.flash('signupMessage', 'please insert all fields');
    res.redirect('back');
    

}