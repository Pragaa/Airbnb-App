var express = require('express'),
    path = require('path'),
    passport = require('passport'),
    flash = require('connect-flash'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    
    //isto redireciona para as rotas
    homeRouter = require('./routes/home'),
    profileRouter = require('./routes/profile'),
    authRouter = require('./routes/authentication'),
    locationRouter = require('./routes/location');
    houseRouter = require('./routes/houses');

    //configuração da base de dados
    mongoose = require('mongoose'),
    configDB = require('./config/database'),

    app = express();



/*****************/
/* Configurações */
/*****************/
mongoose.connect(configDB.url); //configuração da base de dados
require('./config/passport')(passport); // pass passport for configuration



/*****************/
/* renderizador  */
/*****************/
app.set('view engine', 'ejs'); //isto define o tipo de ficheiro padrao a ser rederizado na app
app.set('views', path.join(__dirname, 'views'));//define que a pasta views fica sempre bem direcionada



/************/
/*  Set-Up  */
/************/
app.use(bodyParser.urlencoded({extended: true})); // parse requests of content-type
app.use(express.static('public')); //define a pasta public como principal para ficheiros estaticos
app.use(methodOverride('_method')) //premite especificar o tipo de pedidos de post forms


//requesitos do passport
app.use(session({
  secret: "Some Secret",
  // para a sessão ser unica por utilizador
  resave: false,
  // não é feita sessão para users não logged in
  saveUninitialized: false,
}));

app.use(passport.initialize()); // Camada entre os requests HTTP e o Express
app.use(passport.session()) // permite login com sessºao persistente
app.use(flash()); //usa o connect flash para enviar mensagens guardadas na sessão




/***********/
/*  Rotas  */ 
/***********/
app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', locationRouter);
app.use('/', houseRouter);






/***************/
/*  Servidor   */
/***************/
app.listen(process.env.PORT , process.env.IP , function(){
  console.log('server started');
});

