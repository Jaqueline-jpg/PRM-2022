import express from 'express';

//Instâncio uma aplicação express
const app = express();

//Determina a porta de execução
const PORT = 3300;

app.listen(PORT, () => {
    console.log(`Running in port ${PORT}`);
})