const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://Usuario1:Usuario1db@cluster0-ipd9i.mongodb.net/dbmytrainer?retryWrites=true&w=majority', {
    useNewUrlParser: true, //usar novo analisador de URL
    useUnifiedTopology: true, //use topologia unificada
})

app.use(express.json());
app.use(routes);

app.listen(3333);

