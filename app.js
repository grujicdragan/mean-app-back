const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected")
}).catch((err) => {
    console.error('Database error: ' + err);
    process.exit(-1);
});

const app = express();

const users = require('./routes/users');

const port = process.env.PORT || 3000;

app.use(cors({ "origin": "*" }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})