
/************************/
/* Middleware de acesso */
/************************/
module.exports = function(req,res,next){
  // Caso esteja logged in a função next é executada e ele continua
  //para a função em cima e faz render de secret.ejs
  if(req.isAuthenticated()){
    return next();

  }
  res.redirect("/")
}