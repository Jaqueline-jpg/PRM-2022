import express from 'express';
import cors from 'cors';
import doteenv from 'dotenv';
import routes from './routes';

doteenv.config();

//Instâncio uma aplicação express
const app = express();

//Determina a porta de execução
const PORT = process.env.PORT || 3302;

//Middleware
app.use(cors());
app.use(express.json());

app.use('/account', routes);

//Se conectar no banco de dados, levanto a aplicação
//AppDataSource.initialize().then(() => {

//Levanto a aplicação
app.listen(PORT, () => {
    console.log(`Server Account in port ${PORT}`);
})
