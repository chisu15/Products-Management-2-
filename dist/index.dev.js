"use strict";

var express = require("express");

var methodOverride = require("method-override");

var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");

var session = require("express-session");

var flash = require("express-flash");

var path = require("path");

require("dotenv").config();

var database = require("./config/database");

var systemConfig = require("./config/system");

var routeAdmin = require("./routes/admin/index.route");

var route = require("./routes/client/index.route");

database.connect();
var app = express();
var port = process.env.PORT;
app.use(methodOverride("_method")); // parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
  extended: false
}));
app.set("views", "".concat(__dirname, "/views"));
app.set("view engine", "pug"); // Flash

app.use(cookieParser("JHGJKLKLGFLJK"));
app.use(session({
  cookie: {
    maxAge: 60000
  }
}));
app.use(flash()); // End Flash
// TinyMCE

app.use("/tinymce", express["static"](path.join(__dirname, "node_modules", "tinymce"))); // End TinyMCE
// App Locals Variables

app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.use(express["static"]("".concat(__dirname, "/public"))); // Routes

routeAdmin(app);
route(app);
app.listen(port, function () {
  console.log("App listening on port ".concat(port));
});