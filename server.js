const express = require('express');
const app = express();
const connectMongoDB = require('./config/db');
const logger = require('./logger');
const {errorRoute, errorHandler}= require('./errorHandler');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
connectMongoDB();

app.use(logger);

app.use('/api/user',require('./routes/user'))
app.use('/api/auth',require('./routes/authentication'))
app.use('/api/issues',require('./routes/issues'))

app.use(errorRoute);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`The server is sarted on port ${PORT}`)
})