const express = require("express");
const http = require("http");
const nunjucks = require("nunjucks");
const path = require("path");
const sassMiddleware = require("node-sass-middleware");
const app = express();
const routes = require("./routes.js");

const expressMongoDb = require('express-mongo-db');
const config = require('./config');
app.use(expressMongoDb(config.database.url));

app.set('view engine', 'njk');

nunjucks.configure(path.join(__dirname, '/views/'), {
  autoescape: true,
  express: app,
});
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies


app.use('/public', express.static(path.join(__dirname, '/public')))  // Middleware to serve static assets
app.use(express.static(path.join(__dirname, "views")));
app.use("/", routes);

app.use(
  sassMiddleware({
    src: path.join(__dirname, "bootstrap"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
  })
);

const server = http.createServer(app);

server.listen("3000", () => {
  console.log("Listening on port 3000");
});
