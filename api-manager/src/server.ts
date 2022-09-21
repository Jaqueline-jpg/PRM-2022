import express from 'express';
import cors from 'cors';
import doteenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware'

doteenv.config();

//Instâncio uma aplicação express
const app = express();

//Determina a porta de execução
const PORT = process.env.PORT || 3300;

//Middleware
app.use(cors());

//Rotas do proxy
app.use('/backoffice', createProxyMiddleware({
    target: 'http://localhost:3301'
}))

app.use('/account', createProxyMiddleware({
    target: 'http://localhost:3302'
}))

//Se conectar no banco de dados, levanto a aplicação
//AppDataSource.initialize().then(() => {

//Levanto a aplicação
app.listen(PORT, () => {
    console.log(`API Manager running in port ${PORT}`);
})
