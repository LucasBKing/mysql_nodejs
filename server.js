let express = require("express");
let cors = require('cors');
let bodyParser = require('body-parser');
let apiRoutes = require('./routes/index');

const app = express();
app.use(cors());

// Configure body-parser to handle post requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var port = process.env.PORT || 4200;

app.get('/', (req, res) => {
    res.send('Hello, from Express');
});

app.use('/api', apiRoutes);

app.listen(port, function() {
    console.log('API Server on port: ' + port);
});