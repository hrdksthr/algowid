const express = require('express');
const bodyParser = require('body-parser');
const { PORT, JWT_KEY } = require('./config');
const path = require('path')
const expressJwt = require('express-jwt');
const fs = require('fs')
const insertProducts = require('./script/insert-product')

const app = express();
app.use(bodyParser.json({ limit: '250mb' }));
app.use(bodyParser.urlencoded({ limit: '250mb', extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});


const routeFilter = function (req, res, next) {
    const routes = ["/login", "/register"];
    if (routes.includes(req.url)) {
        return true
    }
}

app.use(expressJwt({ secret: JWT_KEY }).unless(routeFilter));

const exists = fs.existsSync('./../images');
if (!exists) {
    fs.mkdirSync('./../images');
}

// app.use("/", (req, res) => res.render(require('./../client/build/index.html')))
insertProducts()
app.use("/", require('./routes')())
app.use((req, res) => {
    //   var err = new Error('Not Found');
    res.sendStatus(404);
});
app.use(
    express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
)
app.listen(PORT, () => console.info(`Server listening on port ${PORT}`));

process.on('uncaughtException', (err) => {
    console.info('[uncaughtException] %s', err.stack);
});