require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.yc2k6ke.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((err) => console.log(err));

app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Bem vindo a nossa API!" });
});
