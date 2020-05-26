import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

import router from './routes/index';

//Conexion a la base de datos
mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://localhost:27017/dbexamen';
mongoose.connect(dbUrl, { useCreateIndex: true, useNewUrlParser: true })
    .then(mongoose => console.log('Conectando a la BD en el puerto 27017'))
    .catch(err => console.log(err));







const app = express();
//Middlewares
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


//uso de rutas estaticas para iniciar en el index de public
app.use(express.static(path.join(__dirname, 'public')));

//uso de la variable router que es el index de las rutas despues de /api para indicar que ritas se usaran
app.use('/api', router);


//Uso del puerto asignado o en caso de no asignar el puerto 3000

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`servidor en puerto ${app.get('port')}`);
    console.log();
});