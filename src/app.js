const express = require('express');
const app = express();
const mongoose= require('mongoose');
const morgan =require('morgan');
const indexRouter = require('./routes/index');
const cors = require('cors');
const path = require('path');


app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, ContentType, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
   });

//configuraciones
app.set('port', process.env.PORT || 3000);
mongoose.connect('mongodb+srv://root:toor@marketplacecluster.alyfo.mongodb.net/Marketplace?retryWrites=true&w=majority')
.then(db => console.log('conectado'))
.catch(err => console.log('err'));

app.use('/public/', express.static(path.join(__dirname, '../uploads/img/')))


//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


//rutas de este
//app.get('/', (req,res)=>{
//    res.send('hola nubaasssssaaaaadsssssi');
//})

//app.use('/', indexRouter);
/* app.get('/', (req, res) => {
    res.send('Hello World!');
    });
 */
app.use('/', require('./routes/index'));
// Middleware para Vue.js router modo history
 const history = require('connect-history-api-fallback');
 app.use(history());
 app.use(express.static(path.join(__dirname, 'public')))
//inicializacion del servidor
 app.listen(app.get('port'), ()=>{
     console.log('server started');     
 });

