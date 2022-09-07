import { AppDataSource } from './data-source';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from 'process';

//Carrego variaveis de ambiente
dotenv.config();

//Instâncio uma aplicação express
const app = express();

//Determina a porta de execução
const PORT = process.env.PORT || 3301;

//Middleware
app.use(cors());
app.use(express.json());

//Se conectar no banco de dados, levanto a aplicação
AppDataSource.initialize().then(() => {

    //Levanto a aplicação
    app.listen(PORT, () => {
        console.log(`Service backoffice running in port ${PORT}`);
    })

}).catch(error => {
    console.log('Ops, não conectei no banco de dados', error);
});
