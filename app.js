const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const api = require('./routes/api');
const config = require('./config');
const port = process.env.PORT;

app.use(cors());
app.use(express.json())
app.use(morgan('dev'));
app.use('/static', express.static(__dirname + '/public'));
app.set('jwt-secret', config.secret);

app.use('/',api);
mongoose.Promise = global.Promise;

mongoose.connect(config.mongodbUri,{ useNewUrlParser: true })
.then(()=> console.log('Successfully connected to mongodb'))
.catch(e => console.error(e));

app.listen(port, () => {
    console.log(`Express server is running at ${port}`);
});