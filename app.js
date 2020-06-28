const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

const app = express();

const passportConfig = require('./config/passport');
const api = require('./routes/api');
const config = require('./config/config');

const port = process.env.PORT;
passportConfig(passport);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/static', express.static(__dirname + '/public'));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use('/',api);

mongoose.Promise = global.Promise;

mongoose.connect(config.mongodbUri,{ useNewUrlParser: true })
.then(()=> console.log('Successfully connected to mongodb'))
.catch(e => console.error(e));

app.listen(port, () => {
    console.log(`Express server is running at ${port}`);
});
