const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/api/index');

require('dotenv').config({ path: '.env' });

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/welcome/', (req, res) => {
    res.send('welcome');
});

app.use('/api/v1', routes);

app.listen('8080', '0.0.0.0', () => {
    console.log(`server running on http://0.0.0.0:8080`);
});
