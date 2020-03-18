const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/api/index');

require('dotenv').config({ path: '.env' });

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1', routes);

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});
